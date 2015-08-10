#queryDeclarationAll()

A pure-javascript CSS selector engine using CSS declarations for querying. Allowing the selection of elements by how they're styled.

## [Demo](http://mikecostello.github.io/query-declaration)

## Install Options
* Download [query-declaration.js](https://raw.githubusercontent.com/MikeCostello/query-declaration/master/dist/query-declaration.min.js) for use in `<script>` tag.
* Download [jquery-selector-style.js](https://raw.githubusercontent.com/MikeCostello/query-declaration/master/dist/jquery-selector-style.min.js) for with jQuery.
* `npm install query-declaration` for use with AMD or CommonJS.

## Build
```
git clone git@github.com:MikeCostello/query-declaration.git
npm install
npm install -g webpack
npm run build
```

## Documentation

`queryDeclarationAll(css [,context])`

**css**
Type: String or PlainObject
A CSS declaration block to match DOM Elements' computed styles against.

**context**
Type: CSS Selector String, DOM Element or Array of DOM Elements.
Default: '*'
The DOM Elements used when validating the CSS rules.

*jQuery Selector*
`$(":style(css)")`

**css**
Type: String or PlainObject
A CSS declaration block to match jQuery Elements' styles against.

###Examples

`queryDeclarationAll({ color: "red" }, "p")`
`queryDeclarationAll("{ color: blue }", "a span")`
`queryDeclarationAll("{ width: >200px }", "img")`

`$("img:style({ width: >100px })")`