(self.webpackChunkgatsby_blog=self.webpackChunkgatsby_blog||[]).push([[145],{1955:function(e,t,r){var n=r(7927);e.exports={MDXRenderer:n}},7927:function(e,t,r){var n=r(861),o=r(3515),u=r(8416),s=r(6556),l=["scope","children"];function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p=r(7294),i=r(4983).mdx,f=r(2174).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,u=s(e,l),c=f(t),x=p.useMemo((function(){if(!r)return null;var e=a({React:p,mdx:i},c),t=Object.keys(e),u=t.map((function(t){return e[t]}));return o(Function,["_fn"].concat(t,[""+r])).apply(void 0,[{}].concat(n(u)))}),[r,t]);return p.createElement(x,a({},u))}},1331:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return l}});var n=r(1955),o=r(7294),u=r(8501),s=r(7431);function l(e){var t=e.data.mdx,r=t.frontmatter,l=t.body,c=t.fields,a=c.slug==="/"+c.templateTag?"MathLearning":r.title;return o.createElement(u.Z,null,o.createElement(s.Z,{title:a,config:{titleTemplate:c.slug==="/"+c.templateTag?"%s":"%s | MathLearnning"}}),o.createElement("div",{className:"math-post"},o.createElement("h1",null,r.title),o.createElement(n.MDXRenderer,null,l)))}},3897:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},3405:function(e,t,r){var n=r(3897);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},3515:function(e,t,r){var n=r(6015),o=r(9617);function u(t,r,s){return o()?(e.exports=u=Reflect.construct.bind(),e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=u=function(e,t,r){var o=[null];o.push.apply(o,t);var u=new(Function.bind.apply(e,o));return r&&n(u,r.prototype),u},e.exports.__esModule=!0,e.exports.default=e.exports),u.apply(null,arguments)}e.exports=u,e.exports.__esModule=!0,e.exports.default=e.exports},8416:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},9617:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},9498:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},2281:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},6556:function(e){e.exports=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o},e.exports.__esModule=!0,e.exports.default=e.exports},861:function(e,t,r){var n=r(3405),o=r(9498),u=r(6116),s=r(2281);e.exports=function(e){return n(e)||o(e)||u(e)||s()},e.exports.__esModule=!0,e.exports.default=e.exports},6116:function(e,t,r){var n=r(3897);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=component---src-templates-math-js-aa4756844fd62bd02a3f.js.map