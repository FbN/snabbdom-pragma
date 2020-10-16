'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extend = require('extend');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extend__default = /*#__PURE__*/_interopDefaultLegacy(_extend);

const undefinedv = (v) => v === undefined;

const number = (v) => typeof v === 'number';

const string = (v) => typeof v === 'string';

const text = (v) => string(v) || number(v);

const array = (v) => Array.isArray(v);

const object = (v) => typeof v === 'object' && v !== null;

const fun = (v) => typeof v === 'function';

const vnode = (v) => object(v) && 'sel' in v && 'data' in v && 'children' in v && 'text' in v;

const svgPropsMap = { svg: 1, circle: 1, ellipse: 1, line: 1, polygon: 1,
  polyline: 1, rect: 1, g: 1, path: 1, text: 1 };

const svg = (v) => v.sel in svgPropsMap;

// TODO: stop using extend here

const extend = (...objs) => _extend__default['default'](true, ...objs);

const assign = (...objs) => _extend__default['default'](false, ...objs);

const reduceDeep = (arr, fn, initial) => {
  let result = initial;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (array(value)) {
      result = reduceDeep(value, fn, result);
    } else {
      result = fn(result, value);
    }
  }
  return result
};

const mapObject = (obj, fn) => Object.keys(obj).map(
  (key) => fn(key, obj[key])
).reduce(
  (acc, curr) => extend(acc, curr),
  {}
);

const deepifyKeys = (obj, modules) => mapObject(obj,
  (key, val) => {
    const dashIndex = key.indexOf('-');
    if (dashIndex > -1 && modules[key.slice(0, dashIndex)] !== undefined) {
      const moduleData = {
        [key.slice(dashIndex + 1)]: val
      };
      return {
        [key.slice(0, dashIndex)]: moduleData
      }
    }
    return { [key]: val }
  }
);

const omit = (key, obj) => mapObject(obj,
  (mod, data) => mod !== key ? ({ [mod]: data }) : {}
);

// Const fnName = (...params) => guard ? default : ...

const createTextElement = (text$1) => !text(text$1) ? undefined : {
  text: text$1,
  sel: undefined,
  data: undefined,
  children: undefined,
  elm: undefined,
  key: undefined
};

const considerSvg = (vnode) => !svg(vnode) ? vnode :
  assign(vnode,
    { data: omit('props', extend(vnode.data,
      { ns: 'http://www.w3.org/2000/svg', attrs: omit('className', extend(vnode.data.props,
        { class: vnode.data.props ? vnode.data.props.className : undefined }
      )) }
    )) },
    { children: undefinedv(vnode.children) ? undefined :
      vnode.children.map((child) => considerSvg(child))
    }
  );

const rewrites = {
  for: 'attrs',
  role: 'attrs',
  tabindex: 'attrs',
  'aria-*': 'attrs',
  key: null
};

const rewriteModules = (data, modules) => mapObject(data, (key, val) => {
  const inner = { [key]: val };
  if (rewrites[key] && modules[rewrites[key]] !== undefined) {
    return { [rewrites[key]]: inner }
  }
  if (rewrites[key] === null) {
    return {}
  }
  const keys = Object.keys(rewrites);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (k.charAt(k.length - 1) === '*' && key.indexOf(k.slice(0, -1)) === 0 && modules[rewrites[k]] !== undefined) {
      return { [rewrites[k]]: inner }
    }
  }
  if (modules[key] !== undefined) {
    return { [modules[key] ? modules[key] : key]: val }
  }
  if (modules.props !== undefined) {
    return { props: inner }
  }
  return inner
});

const sanitizeData = (data, modules) => considerSvg(rewriteModules(deepifyKeys(data, modules), modules));

const sanitizeText = (children) => children.length > 1 || !text(children[0]) ? undefined : children[0];

const sanitizeChildren = (children) => reduceDeep(children, (acc, child) => {
  const vnode$1 = vnode(child) ? child : createTextElement(child);
  acc.push(vnode$1);
  return acc
}
, []);

const defaultModules = {
  attrs: '',
  props: '',
  class: '',
  data: 'dataset',
  style: '',
  hook: '',
  on: ''
};

const createElementWithModules = (modules) => {
  return (sel, data, ...children) => {
    if (fun(sel)) {
      return sel(data || {}, children)
    }
    const text = sanitizeText(children);
    return considerSvg({
      sel,
      data: data ? sanitizeData(data, modules) : {},
      children: text ? undefined : sanitizeChildren(children),
      text,
      elm: undefined,
      key: data ? data.key : undefined
    })
  }
};

const createElement = createElementWithModules(defaultModules);

var index = {
  createElement,
  createElementWithModules
};

exports.createElement = createElement;
exports.createElementWithModules = createElementWithModules;
exports.default = index;
