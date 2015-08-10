require('core-js/modules/es6.array.from');

const resolvableProperties = ['color', 'background-color'];
const reFloat = /-?\d*\.?\d+/g;

function queryDeclarationAll(css, selectors = '*') {

  // Select all child elements
  let elems = document.querySelectorAll(selectors);

  elems = [...elems].filter(function(elem) {
    // Cache the computed styles
    let elemComputedStyle = getComputedStyle(elem);

    // Match every property to its computed value
    let isMatch = Object.keys(css).every(function(property) {
      let [value, operator] = parseCssValue(css[property]);

      value = resolvableProperties.indexOf(property) === -1 ? value : getResolvedValue(property, value);

      return  compare(elemComputedStyle.getPropertyValue(property), value, operator);;
    })

    return isMatch;
  });

  return elems;
}

function parseCssValue(value) {
  let operatorMatch = value.match(/^[><!=]={0,2}/);
  let operator = Array.isArray(operatorMatch) ? operatorMatch[0] : undefined;

  if (operator) {
    value = value.substr(operator.length);
  }

  return [value, operator];
}

function compare(val1, val2, operator = '===') {
  // If operator isn't identity then convert to integers
  if (!/^={2,3}/.test(operator)) {
    [val1, val2] = [val1, val2].map(val => reFloat.test(val) && +val.match(reFloat)[0]);
  }

  // return Boolean
  return eval('val1' + operator + 'val2');
}

function getResolvedValue(property, value) {
  let resolvedValue;
  let elemProxy = document.createElement('div');

  elemProxy.style.display = 'none';
  elemProxy.style[property] = value;

  document.body.appendChild(elemProxy);
  resolvedValue = getComputedStyle(elemProxy).getPropertyValue(property);
  elemProxy.remove();

  return resolvedValue;
}

module.exports = queryDeclarationAll;