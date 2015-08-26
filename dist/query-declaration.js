(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["queryDeclarationAll"] = factory();
	else
		root["queryDeclarationAll"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Query Declaration
	 * @module queryDeclaration
	 * @type {Array}
	 */

	'use strict';

	exports.__esModule = true;

	__webpack_require__(1);

	__webpack_require__(23);

	__webpack_require__(35);

	var resolvableProperties = ['color', 'background-color'];
	var reFloat = /-?\d*\.?\d+/g;

	/**
	 * Query for HTML Elements that match a CSS declaration
	 * @example
	 * queryDeclarationAll({"color": "red"}, "h1")
	 * queryDeclarationAll("{color: blue}", "h2")
	 * @param {(Object|String)} css - CSS declaration
	 * @param {(String|HTMLElement|HTMLElement[])} [selectors] - Elements to match CSS declaration against
	 * @returns {HTMLElement[]} Return an array of matched HTML Elements
	 */
	function queryDeclarationAll(css) {
	  var selectors = arguments.length <= 1 || arguments[1] === undefined ? '*' : arguments[1];

	  var elems = undefined;

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

	  elems = elems.filter(function (elem) {
	    // Cache the computed styles
	    var elemComputedStyle = getComputedStyle(elem);

	    // Match every property to its computed value
	    var isMatch = Object.keys(css).every(function (property) {
	      var _parseCssValue = parseCssValue(css[property]);

	      var value = _parseCssValue[0];
	      var operator = _parseCssValue[1];

	      value = resolvableProperties.includes(property) ? normalizeCssValue(property, value) : value;

	      return compare(elemComputedStyle.getPropertyValue(property), value, operator);
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
	  css = css.replace(/{|}/g, '').split(';').reduce(function (css, declaration) {
	    var _declaration$split$map = declaration.split(':').map(function (str) {
	      return str.trim().replace(/^['"](.*)['"]$/g, '$1');
	    });

	    var key = _declaration$split$map[0];
	    var val = _declaration$split$map[1];

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
	  var operatorMatch = value.match(/^[><!=]={0,2}/);
	  var operator = Array.isArray(operatorMatch) ? operatorMatch[0] : undefined;

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
	function compare(a, b) {
	  var operator = arguments.length <= 2 || arguments[2] === undefined ? '===' : arguments[2];

	  // If operator isn't identity then convert to integers
	  if (!/^={2,3}/.test(operator)) {
	    var _map = [a, b].map(function (value) {
	      return reFloat.test(value) && +value.match(reFloat)[0];
	    });

	    a = _map[0];
	    b = _map[1];
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
	  var _Object$assign;

	  var nValue = undefined,
	      proxy = undefined;

	  // Create temporary element to assign CSS to
	  proxy = document.createElement('div');

	  Object.assign(proxy.style, (_Object$assign = {
	    display: 'none'
	  }, _Object$assign[property] = value, _Object$assign));

	  document.body.appendChild(proxy);
	  nValue = getComputedStyle(proxy).getPropertyValue(property);
	  proxy.remove();

	  return nValue;
	}

	/** Query for HTML Elements that match a CSS declaration */
	exports['default'] = queryDeclarationAll;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def      = __webpack_require__(2)
	  , $includes = __webpack_require__(12)(true);
	$def($def.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments[1]);
	  }
	});
	__webpack_require__(20)('includes');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var global     = __webpack_require__(3)
	  , core       = __webpack_require__(4)
	  , hide       = __webpack_require__(5)
	  , $redef     = __webpack_require__(10)
	  , PROTOTYPE  = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & $def.B && own)exp = ctx(out, global);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)$redef(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	module.exports = global;
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , createDesc = __webpack_require__(7);
	module.exports = __webpack_require__(8) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(9)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(3)
	  , hide      = __webpack_require__(5)
	  , SRC       = __webpack_require__(11)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(4).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if(!('name' in val))val.name = key;
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(13)
	  , toLength  = __webpack_require__(17)
	  , toIndex   = __webpack_require__(19);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(14)
	  , defined = __webpack_require__(16);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(15);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(18)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(18)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(21)('unscopables');
	if(!(UNSCOPABLES in []))__webpack_require__(5)(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  [][UNSCOPABLES][key] = true;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(22)('wks')
	  , Symbol = __webpack_require__(3).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(11))('Symbol.' + name));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(24)
	  , $def        = __webpack_require__(2)
	  , toObject    = __webpack_require__(26)
	  , call        = __webpack_require__(27)
	  , isArrayIter = __webpack_require__(30)
	  , toLength    = __webpack_require__(17)
	  , getIterFn   = __webpack_require__(32);
	$def($def.S + $def.F * !__webpack_require__(34)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      for(result = new C(length = toLength(O.length)); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(16);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(28);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(31)
	  , ITERATOR  = __webpack_require__(21)('iterator');
	module.exports = function(it){
	  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(33)
	  , ITERATOR  = __webpack_require__(21)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(4).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(15)
	  , TAG = __webpack_require__(21)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(2);
	$def($def.S, 'Object', {assign: __webpack_require__(36)});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(26)
	  , IObject  = __webpack_require__(14)
	  , enumKeys = __webpack_require__(37);
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(6);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ }
/******/ ])
});
;