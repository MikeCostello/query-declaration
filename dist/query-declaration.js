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

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	__webpack_require__(1);

	var resolvableProperties = ['color', 'background-color'];
	var reFloat = /-?\d*\.?\d+/g;

	function queryDeclarationAll(css) {
	  var selectors = arguments.length <= 1 || arguments[1] === undefined ? '*' : arguments[1];

	  var elems = undefined;

	  if (typeof selectors === 'string') {
	    // Select all child elements
	    elems = document.querySelectorAll(selectors);
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

	  elems = [].concat(_toConsumableArray(elems)).filter(function (elem) {
	    // Cache the computed styles
	    var elemComputedStyle = getComputedStyle(elem);

	    // Match every property to its computed value
	    var isMatch = Object.keys(css).every(function (property) {
	      var _parseCssValue = parseCssValue(css[property]);

	      var _parseCssValue2 = _slicedToArray(_parseCssValue, 2);

	      var value = _parseCssValue2[0];
	      var operator = _parseCssValue2[1];

	      value = resolvableProperties.indexOf(property) === -1 ? value : getResolvedValue(property, value);

	      return compare(elemComputedStyle.getPropertyValue(property), value, operator);;
	    });

	    return isMatch;
	  });

	  return elems;
	}

	function parseCssBlock(css) {
	  var cssObj = {};
	  css.replace(/{|}/g, '').split(';').forEach(function (declaration) {
	    var _declaration$split$map = declaration.split(':').map(function (str) {
	      return str.trim().replace(/^['"](.*)['"]$/g, '$1');
	    });

	    var _declaration$split$map2 = _slicedToArray(_declaration$split$map, 2);

	    var key = _declaration$split$map2[0];
	    var val = _declaration$split$map2[1];

	    cssObj[key] = val;
	  });

	  return cssObj;
	}

	function parseCssValue(value) {
	  var operatorMatch = value.match(/^[><!=]={0,2}/);
	  var operator = Array.isArray(operatorMatch) ? operatorMatch[0] : undefined;

	  if (operator) {
	    value = value.substr(operator.length);
	  }

	  return [value, operator];
	}

	function compare(val1, val2) {
	  var operator = arguments.length <= 2 || arguments[2] === undefined ? '===' : arguments[2];

	  // If operator isn't identity then convert to integers
	  if (!/^={2,3}/.test(operator)) {
	    var _map = [val1, val2].map(function (val) {
	      return reFloat.test(val) && +val.match(reFloat)[0];
	    });

	    var _map2 = _slicedToArray(_map, 2);

	    val1 = _map2[0];
	    val2 = _map2[1];
	  }

	  // return Boolean
	  return eval('val1' + operator + 'val2');
	}

	function getResolvedValue(property, value) {
	  var resolvedValue = undefined;
	  var elemProxy = document.createElement('div');

	  elemProxy.style.display = 'none';
	  elemProxy.style[property] = value;

	  document.body.appendChild(elemProxy);
	  resolvedValue = getComputedStyle(elemProxy).getPropertyValue(property);
	  elemProxy.remove();

	  return resolvedValue;
	}

	module.exports = queryDeclarationAll;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(2)
	  , $def        = __webpack_require__(4)
	  , toObject    = __webpack_require__(14)
	  , call        = __webpack_require__(18)
	  , isArrayIter = __webpack_require__(21)
	  , toLength    = __webpack_require__(25)
	  , getIterFn   = __webpack_require__(27);
	$def($def.S + $def.F * !__webpack_require__(29)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike, true)
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var aFunction = __webpack_require__(3);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(~length && that === undefined)return fn;
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
/* 3 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global     = __webpack_require__(5)
	  , core       = __webpack_require__(6)
	  , hide       = __webpack_require__(7)
	  , $redef     = __webpack_require__(11)
	  , PROTOTYPE  = 'prototype';
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	global.core = core;
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
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
	}
	module.exports = $def;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	module.exports = global;
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(8)
	  , createDesc = __webpack_require__(9);
	module.exports = __webpack_require__(10) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !!function(){
	  try {
	    return Object.defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global     = __webpack_require__(5)
	  , has        = __webpack_require__(12)
	  , hide       = __webpack_require__(7)
	  , tpl        = String({}.hasOwnProperty)
	  , SRC        = __webpack_require__(13)('src')
	  , _toString  = Function.toString;

	function $redef(O, key, val, safe){
	  if(typeof val == 'function'){
	    var base = O[key];
	    hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
	    if(!('name' in val))val.name = key;
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	}

	// add fake Function#toString for correct work wrapped methods / constructors
	// with methods similar to LoDash isNative
	$redef(Function.prototype, 'toString', function toString(){
	  return has(this, SRC) ? this[SRC] : _toString.call(this);
	});

	__webpack_require__(6).inspectSource = function(it){
	  return _toString.call(it);
	};

	module.exports = $redef;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var ES5Object = __webpack_require__(15)
	  , defined   = __webpack_require__(17);
	module.exports = function(it, realString){
	  return (realString ? Object : ES5Object)(defined(it));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for not array-like ES3 strings
	var cof     = __webpack_require__(16)
	  , $Object = Object;
	module.exports = 0 in $Object('z') ? $Object : function(it){
	  return cof(it) == 'String' ? it.split('') : $Object(it);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(19);
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)anObject(ret.call(iterator));
	}
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Iterators = __webpack_require__(22)
	  , ITERATOR  = __webpack_require__(23)('iterator');
	module.exports = function(it){
	  return ('Array' in Iterators ? Iterators.Array : Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(24)('wks')
	  , Symbol = __webpack_require__(5).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(13))('Symbol.' + name));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(26)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , classof   = __webpack_require__(28)
	  , ITERATOR  = __webpack_require__(23)('iterator')
	  , Iterators = __webpack_require__(22);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  var Symbol = global.Symbol;
	  if(it != undefined){
	    return it[Symbol && Symbol.iterator || '@@iterator']
	      || it[ITERATOR]
	      || Iterators[classof(it)];
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(16)
	  , TAG = __webpack_require__(23)('toStringTag')
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(23)('iterator')
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

/***/ }
/******/ ])
});
;