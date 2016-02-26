// Inspired by:
// - https://github.com/airbnb/javascript/blob/master/linters/.eslintrc,
// - https://github.com/facebook/fbjs/blob/master/scripts/eslint/.eslintrc.js,
// - documentation of ESLint and complete rule list provided on the site.

// ESLint rules documentation: http://eslint.org/docs/user-guide/configuring.html#configuring-rules

// Convenient understandable constants
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

// This pattern will match these texts:
//   var Foo = require('Foo');
//   var Bar = require('Foo').Bar;
//   var BarFoo = require(Bar + 'Foo');
// Also supports 'let' and 'const'.
const maxLenIgnorePattern = '^(?:var|let|const)\\s+[a-zA-Z_\\$][a-zA-Z_\\$\\d]*' +
  '\\s*=\\s*require\\(["\'a-zA-Z_\\+\\.\\s\\d_\\-\\/]+\\)[^;\\n]*[;\\n]';

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    "eslint-plugin-html",
    // https://github.com/yannickcr/eslint-plugin-react
    "react"
  ],
  // http://eslint.org/docs/user-guide/configuring.html#specifying-environments
  env: {
    // browser global variables
    browser: true,
    // Node.js global variables and Node.js-specific rules
    node: true,
    es6: true
  },
  extends: [
    // Set of based ESLint recommended rules
    // See http://eslint.org/docs/rules/ for details
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "no-console": WARNING,
    "react/prop-types": WARNING
  },
  // Values of true mean the global may be modified. Values of false represent
  // constants.
  globals: {
    "React": true,
    "Immutable": true,
    "_": true
  }
};
