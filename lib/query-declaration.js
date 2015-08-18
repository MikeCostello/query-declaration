/**
 * Query Declaration
 * @module queryDeclaration
 * @type {Array}
 */

import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.array.from';
import 'core-js/modules/es6.object.assign';

const resolvableProperties = ['color', 'background-color'];
const reFloat = /-?\d*\.?\d+/g;

/**
 * Query for HTML Elements that match a CSS declaration
 * @example
 * queryDeclarationAll({"color": "red"}, "h1")
 * queryDeclarationAll("{color: blue}", "h2")
 * @param {(Object|String)} css - CSS declaration
 * @param {(String|HTMLElement|HTMLElement[])} [selectors] - Elements to match CSS declaration against
 * @returns {HTMLElement[]} Return an array of matched HTML Elements
 */
function queryDeclarationAll(css, selectors = '*') {
  let elems;

  // Require css argument
  if (!css) {
    return;
  }

  // Set context element(s)
  if (typeof selectors === 'string') {
    elems = Array.from(document.querySelectorAll(selectors));
  } else if (selectors.tagName) {
    elems = [selectors];
  } else if (Array.isArray(selectors)) {
    elems = selectors;
  } else {
    return;
  }

  if (typeof css === 'string') {
    css = parseCssBlock(css);
  }

  elems = elems.filter(function(elem) {
    // Cache the computed styles
    let elemComputedStyle = getComputedStyle(elem);

    // Match every property to its computed value
    let isMatch = Object.keys(css).every(function(property) {
      let [value, operator] = parseCssValue(css[property]);

      value = resolvableProperties.includes(property) ? normalizeCssValue(property, value) : value;

      return  compare(elemComputedStyle.getPropertyValue(property), value, operator);
    });

    return isMatch;
  });

  return elems;
}

/**
 * @private
 * @example
 * parseCssBlock("{ color: red; width: 100px }")
 * // Returns Object { color: "red", width: "100px" }
 * @param {String} css - CSS declaration
 * @returns {Object} Returns CSS declaration as an Object
 */
function parseCssBlock(css) {
  css = css.replace(/{|}/g, '').split(';').reduce(function(css, declaration) {
    let [key, val] = declaration.split(':').map(str => str.trim().replace(/^['"](.*)['"]$/g, '$1'));

    css[key] = val;

    return css;
  }, {});

  return css;
}

/**
 * Separates CSS value from comparison operator
 * @private
 * @param {String} value - String prefixed with comparison operator (>, <, !, =, ==, ===, !=, <=, >=)
 * @returns {Array} An array with value and operator
 */
function parseCssValue(value) {
  let operatorMatch = value.match(/^[><!=]={0,2}/);
  let operator = Array.isArray(operatorMatch) ? operatorMatch[0] : undefined;

  if (operator) {
    value = value.substr(operator.length);

    // Convert assignment to comparison
    if (operator === '=') {
      operator = '===';
    }
  }

  return [value, operator];
}

/**
 * @private
 * @param {String} a - First value
 * @param {String} b - Second value
 * @param {String} [operator] - Comparison operator
 * @returns {Boolean} True if both values pass the comparison test
 */
function compare(a, b, operator = '===') {
  // If operator isn't identity then convert to integers
  if (!/^={2,3}/.test(operator)) {
    [a, b] = [a, b].map(value => reFloat.test(value) && +value.match(reFloat)[0]);
  }

  // evaluate comparison
  return eval('a' + operator + 'b');
}

/**
 * Normalize CSS property values via a temporary HTML Element
 * @private
 * @example
 * normalizeCssValue("color", "red")
 * // Returns "rgb(255, 0, 0)"
 * @param {String} property - CSS property
 * @param {String} value - CSS value
 * @returns {String} Normalized CSS value
 */
function normalizeCssValue(property, value) {
  let nValue, proxy;

  // Create temporary element to assign CSS to
  proxy = document.createElement('div');

  Object.assign(proxy.style, {
    display: 'none',
    [property]: value
  });

  document.body.appendChild(proxy);
  nValue = getComputedStyle(proxy).getPropertyValue(property);
  proxy.remove();

  return nValue;
}

/** Query for HTML Elements that match a CSS declaration */
export default queryDeclarationAll;