import autobind from "autobind-decorator";
import classnames from "classnames";

const symbols = [
  '\uf19c',
  '\uf1b9',
  '\uf236',
  '\uf0a2',
  '\uf206',
  '\uf1e2',
  '\uf1ad',
  '\uf140',
  '\uf240',
  '\uf1ec',
  '\uf0f4',
  '\uf075',
  '\uf14e',
  '\uf1b2',
  '\uf219',
  '\uf0e0',
  '\uf182',
  '\uf11d',
  '\uf11e',
  '\uf0c3',
  '\uf1e3',
  '\uf000',
  '\uf275',
  '\uf0e3',
  '\uf1cd',
  '\uf252',
  '\uf186',
  '\uf1b0',
  '\uf12e'
];

const colors = [
  '#ff0066',
  '#aa0000',
  '#552200',
  '#ff6600',
  '#ffcc00',
  '#aad400',
  '#00aad4',
  '#441650'
];

export default autobind(class DeckCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.onClick}
          className={classnames("card", (this.props.flipped ? "flipped" : ""), (this.props.paired ? "paired" : ""))}>
        <div className="face" style={{color: colors[this.props.value % colors.length]}}>{symbols[this.props.value]}</div>
        <div className="backface">?</div>
      </div>
    )
  }
});
