(self.webpackChunkgatsby_website=self.webpackChunkgatsby_website||[]).push([[366],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o},e.exports.default=e.exports,e.exports.__esModule=!0},3646:function(e,t,r){var o=r(7228);e.exports=function(e){if(Array.isArray(e))return o(e)},e.exports.default=e.exports,e.exports.__esModule=!0},9100:function(e,t,r){var o=r(9489),a=r(7067);function n(t,r,l){return a()?(e.exports=n=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e,t,r){var a=[null];a.push.apply(a,t);var n=new(Function.bind.apply(e,a));return r&&o(n,r.prototype),n},e.exports.default=e.exports,e.exports.__esModule=!0),n.apply(null,arguments)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},182:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,r){var o=r(3646),a=r(6860),n=r(379),l=r(8206);e.exports=function(e){return o(e)||a(e)||n(e)||l()},e.exports.default=e.exports,e.exports.__esModule=!0},379:function(e,t,r){var o=r(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},1839:function(e,t,r){"use strict";r.d(t,{Z:function(){return x}});var o=r(5245),a=r(7294),n=r(5444),l=r(7462),c=r(5987),i=r(5505),p=(0,r(6018).Z)(a.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),s=r(4621),u=r(7595),d=r(1291),f=r(1664),m=r(7055);function y(e){return"Backspace"===e.key||"Delete"===e.key}var g=a.forwardRef((function(e,t){var r=e.avatar,o=e.classes,n=e.className,s=e.clickable,u=e.color,g=void 0===u?"default":u,b=e.component,v=e.deleteIcon,h=e.disabled,x=void 0!==h&&h,C=e.icon,k=e.label,S=e.onClick,w=e.onDelete,_=e.onKeyDown,O=e.onKeyUp,Z=e.size,R=void 0===Z?"medium":Z,P=e.variant,$=void 0===P?"default":P,I=(0,c.Z)(e,["avatar","classes","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"]),E=a.useRef(null),j=(0,d.Z)(E,t),M=function(e){e.stopPropagation(),w&&w(e)},T=!(!1===s||!S)||s,D="small"===R,F=b||(T?m.Z:"div"),L=F===m.Z?{component:"div"}:{},N=null;if(w){var z=(0,i.Z)("default"!==g&&("default"===$?o["deleteIconColor".concat((0,f.Z)(g))]:o["deleteIconOutlinedColor".concat((0,f.Z)(g))]),D&&o.deleteIconSmall);N=v&&a.isValidElement(v)?a.cloneElement(v,{className:(0,i.Z)(v.props.className,o.deleteIcon,z),onClick:M}):a.createElement(p,{className:(0,i.Z)(o.deleteIcon,z),onClick:M})}var q=null;r&&a.isValidElement(r)&&(q=a.cloneElement(r,{className:(0,i.Z)(o.avatar,r.props.className,D&&o.avatarSmall,"default"!==g&&o["avatarColor".concat((0,f.Z)(g))])}));var A=null;return C&&a.isValidElement(C)&&(A=a.cloneElement(C,{className:(0,i.Z)(o.icon,C.props.className,D&&o.iconSmall,"default"!==g&&o["iconColor".concat((0,f.Z)(g))])})),a.createElement(F,(0,l.Z)({role:T||w?"button":void 0,className:(0,i.Z)(o.root,n,"default"!==g&&[o["color".concat((0,f.Z)(g))],T&&o["clickableColor".concat((0,f.Z)(g))],w&&o["deletableColor".concat((0,f.Z)(g))]],"default"!==$&&[o.outlined,{primary:o.outlinedPrimary,secondary:o.outlinedSecondary}[g]],x&&o.disabled,D&&o.sizeSmall,T&&o.clickable,w&&o.deletable),"aria-disabled":!!x||void 0,tabIndex:T||w?0:void 0,onClick:S,onKeyDown:function(e){e.currentTarget===e.target&&y(e)&&e.preventDefault(),_&&_(e)},onKeyUp:function(e){e.currentTarget===e.target&&(w&&y(e)?w(e):"Escape"===e.key&&E.current&&E.current.blur()),O&&O(e)},ref:j},L,I),q||A,a.createElement("span",{className:(0,i.Z)(o.label,D&&o.labelSmall)},k),N)})),b=(0,s.Z)((function(e){var t="light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],r=(0,u.Fq)(e.palette.text.primary,.26);return{root:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:e.palette.getContrastText(t),backgroundColor:t,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:"none",padding:0,verticalAlign:"middle",boxSizing:"border-box","&$disabled":{opacity:.5,pointerEvents:"none"},"& $avatar":{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],fontSize:e.typography.pxToRem(12)},"& $avatarColorPrimary":{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark},"& $avatarColorSecondary":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.dark},"& $avatarSmall":{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)}},sizeSmall:{height:24},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},disabled:{},clickable:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover, &:focus":{backgroundColor:(0,u._4)(t,.08)},"&:active":{boxShadow:e.shadows[1]}},clickableColorPrimary:{"&:hover, &:focus":{backgroundColor:(0,u._4)(e.palette.primary.main,.08)}},clickableColorSecondary:{"&:hover, &:focus":{backgroundColor:(0,u._4)(e.palette.secondary.main,.08)}},deletable:{"&:focus":{backgroundColor:(0,u._4)(t,.08)}},deletableColorPrimary:{"&:focus":{backgroundColor:(0,u._4)(e.palette.primary.main,.2)}},deletableColorSecondary:{"&:focus":{backgroundColor:(0,u._4)(e.palette.secondary.main,.2)}},outlined:{backgroundColor:"transparent",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:(0,u.Fq)(e.palette.text.primary,e.palette.action.hoverOpacity)},"& $avatar":{marginLeft:4},"& $avatarSmall":{marginLeft:2},"& $icon":{marginLeft:4},"& $iconSmall":{marginLeft:2},"& $deleteIcon":{marginRight:5},"& $deleteIconSmall":{marginRight:3}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(e.palette.primary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:(0,u.Fq)(e.palette.primary.main,e.palette.action.hoverOpacity)}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(e.palette.secondary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:(0,u.Fq)(e.palette.secondary.main,e.palette.action.hoverOpacity)}},avatar:{},avatarSmall:{},avatarColorPrimary:{},avatarColorSecondary:{},icon:{color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],marginLeft:5,marginRight:-6},iconSmall:{width:18,height:18,marginLeft:4,marginRight:-4},iconColorPrimary:{color:"inherit"},iconColorSecondary:{color:"inherit"},label:{overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},labelSmall:{paddingLeft:8,paddingRight:8},deleteIcon:{WebkitTapHighlightColor:"transparent",color:r,height:22,width:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:(0,u.Fq)(r,.4)}},deleteIconSmall:{height:16,width:16,marginRight:4,marginLeft:-4},deleteIconColorPrimary:{color:(0,u.Fq)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconColorSecondary:{color:(0,u.Fq)(e.palette.secondary.contrastText,.7),"&:hover, &:active":{color:e.palette.secondary.contrastText}},deleteIconOutlinedColorPrimary:{color:(0,u.Fq)(e.palette.primary.main,.7),"&:hover, &:active":{color:e.palette.primary.main}},deleteIconOutlinedColorSecondary:{color:(0,u.Fq)(e.palette.secondary.main,.7),"&:hover, &:active":{color:e.palette.secondary.main}}}}),{name:"MuiChip"})(g),v=r(1035),h=["tags"];var x=function(e){var t=e.tags,r=(0,o.Z)(e,h);return t&&0!==t.length?a.createElement("ul",Object.assign({},r,{style:{margin:"1rem 0"}}),t.map((function(e){return"index"!==e&&a.createElement(b,{color:"primary",avatar:a.createElement(v.Z,null,e[0]),label:e,onClick:function(t){t.preventDefault(),(0,n.navigate)(function(e){return"/tags/"+e}(e))},key:e})}))):null}},1274:function(e,t,r){var o=r(1048);e.exports={MDXRenderer:o}},1048:function(e,t,r){var o=r(9100),a=r(319),n=r(182),l=r(7316),c=["scope","children"];function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=r(7294),u=r(4983).mdx,d=r(3191).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,n=l(e,c),i=d(t),f=s.useMemo((function(){if(!r)return null;var e=p({React:s,mdx:u},i),t=Object.keys(e),n=t.map((function(t){return e[t]}));return o(Function,["_fn"].concat(a(t),[""+r])).apply(void 0,[{}].concat(a(n)))}),[r,t]);return s.createElement(f,p({},n))}}}]);
//# sourceMappingURL=18d2a1d1bd11dfeb160d0f057d2a379edc7a722f-92e7be0f7118bf2ba859.js.map