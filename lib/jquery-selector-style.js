import queryDeclarationAll from './query-declaration';

jQuery.expr[':'].style = function(elem, index, meta, stack) {
  let css = meta[3];
  let matches = queryDeclarationAll(css, elem);

  return matches.length ? true : false;
};