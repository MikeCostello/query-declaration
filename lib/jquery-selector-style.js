jQuery.expr[':'].style = function(elem, index, meta, stack) {
  let queryDeclarationAll = require('./query-declaration.js');
  let css = meta[3];
  let matches = queryDeclarationAll(css, elem);

  return matches.length ? true : false;
};