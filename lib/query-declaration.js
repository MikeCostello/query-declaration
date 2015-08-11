require('core-js/modules/es6.array.from');
require('core-js/modules/es6.object.assign');

const resolvableProperties = ['color', 'background-color'];
const reFloat = /-?\d*\.?\d+/g;

function queryDeclarationAll(css, selectors = '*') {
  let elems;

  if (typeof selectors === 'string') {
    // Select all child elements
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

      value = resolvableProperties.indexOf(property) === -1 ? value : normalizeCssValue(property, value);

      return  compare(elemComputedStyle.getPropertyValue(property), value, operator);;
    })

    return isMatch;
  });

  return elems;
}

function parseCssBlock(css) {
  css = css.replace(/{|}/g, '').split(';').reduce(function(css, declaration) {
    let [key, val] = declaration.split(':').map(str => str.trim().replace(/^['"](.*)['"]$/g, '$1'));

    css[key] = val;

    return css;
  }, {});

  return css;
}

function parseCssValue(value) {
  let operatorMatch = value.match(/^[><!=]={0,2}/);
  let operator = Array.isArray(operatorMatch) ? operatorMatch[0] : undefined;

  if (operator) {
    value = value.substr(operator.length);
  }

  return [value, operator];
}

function compare(a, b, operator = '===') {
  // If operator isn't identity then convert to integers
  if (!/^={2,3}/.test(operator)) {
    [a, b] = [a, b].map(value => reFloat.test(value) && +value.match(reFloat)[0]);
  }

  // return Boolean
  return eval('a' + operator + 'b');
}

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

module.exports = queryDeclarationAll;