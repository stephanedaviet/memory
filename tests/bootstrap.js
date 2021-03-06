/* eslint no-console:0 */

import jsdom from 'jsdom';

export function setupEnv() {
  const doc = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>');
  const win = doc.defaultView;
  function propagateToGlobal(window) {
    for (const key in window) {
      if (!window.hasOwnProperty(key)) continue;
      if (key in global) continue;
      global[key] = window[key];
    }
  }
  global.document = doc;
  global.window = win;
  propagateToGlobal(win);
  console.log('\nENV setup is done !!!');
}
