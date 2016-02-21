import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './styles/app.scss';
import App from './components/app';

export function init() {
  // Needed for onTouchTap
  // Can go away when react 1.0 release
  // Check this repo:
  // https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  ReactDOM.render(<App />, document.getElementById('app'));
}
