import autobind from "autobind-decorator";
import classnames from "classnames";

import DeckCard from "./deckCard";

const cardsCount = 24;
const Card = Immutable.Record({
  order: undefined,
  value: undefined,
  flipped: false,
  paired: false
});

export default autobind(class Deck extends React.Component {
  constructor(props) {
    super(props)

    var orderedSingletons = _.range(0, cardsCount);
    var orderedPairs = orderedSingletons.concat(orderedSingletons);
    var shuffledPairs = _.shuffle(orderedPairs);
    var cards = shuffledPairs.map(function(cardValue, index) {
      return new Card({
        order: index,
        value: cardValue,
        flipped: false,
        paired: false
      });
    });

    this.state = {
      cards: Immutable.List(cards),
      flippedCards: Immutable.List(),
      pairedCards: Immutable.List(),
      waiting: false,
      moves: 0
    };
  }

  handleClick(card) {
    if (card.paired || this.state.waiting) {
      return;
    }

    if (this.state.flippedCards.size == 0) {
      this.flipFirstCard(card);
    } else if (this.state.flippedCards.size > 0) {
      this.flipSecondCard(card);
    }
  }

  flipFirstCard(card) {
    var flippedCard = card.set('flipped', true);

    this.setState({
      cards: this.state.cards.set(flippedCard.order, flippedCard),
      flippedCards: this.state.flippedCards.push(flippedCard),
      moves: this.state.moves + 1
    });
  }

  flipSecondCard(card) {
    var alreadyFlippedCard = this.state.flippedCards.get(0);
    if (alreadyFlippedCard.order == card.order) {
      return;
    }

    var flippedCard = card.set('flipped', true);
    var newPairedCards = [];
    if (alreadyFlippedCard.value == flippedCard.value) {
      alreadyFlippedCard = alreadyFlippedCard.set('paired', true);
      flippedCard = flippedCard.set('paired', true);
      newPairedCards = [alreadyFlippedCard, flippedCard];
    }

    console.log('Paired cards before update: ' + this.state.pairedCards);

    this.setState({
      cards: this.state.cards.set(alreadyFlippedCard.order, alreadyFlippedCard).set(flippedCard.order, flippedCard),
      flippedCards: this.state.flippedCards.push(flippedCard),
      pairedCards: this.state.pairedCards.concat(Immutable.fromJS(newPairedCards)),
      waiting: true,
      moves: this.state.moves + 1
    });

    console.log('Updated paired cards: ' + this.state.pairedCards);

    var that = this;
    window.setTimeout(function() {
      var unflippedCards = that.state.cards.map(function(card) {
        return card.set('flipped', false);
      });

      that.setState({
        cards: unflippedCards,
        flippedCards: Immutable.List(),
        waiting: false
      })
    }, 2000);
  }

  render() {
    var victory = (this.state.pairedCards.size >= this.state.cards.size);

    var cards = this.state.cards.map(function(card) {
      return (
        <DeckCard onClick={this.handleClick.bind(this, card)}
            key={card.order}
            value={card.value}
            flipped={card.flipped}
            paired={card.paired} />
      );
    }, this);

    return (
      <div className={classnames('deck', (victory ? 'victory' : ''))}>
        <div className="moves-count">
          {victory ? 'Victoire en ' + this.state.moves + ' coups.' : this.state.moves || 0}
        </div>
        <div className="cards">
          {cards}
        </div>
      </div>
    );
  }
});
