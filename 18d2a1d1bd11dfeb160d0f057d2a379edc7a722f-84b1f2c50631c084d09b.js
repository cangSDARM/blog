(self.webpackChunkgatsby_blog=self.webpackChunkgatsby_blog||[]).push([[366],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,a=new Array(t);o<t;o++)a[o]=e[o];return a},e.exports.__esModule=!0,e.exports.default=e.exports},3646:function(e,t,o){var a=o(7228);e.exports=function(e){if(Array.isArray(e))return a(e)},e.exports.__esModule=!0,e.exports.default=e.exports},9100:function(e,t,o){var a=o(9489),r=o(7067);function n(t,o,c){return r()?(e.exports=n=Reflect.construct,e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=n=function(e,t,o){var r=[null];r.push.apply(r,t);var n=new(Function.bind.apply(e,r));return o&&a(n,o.prototype),n},e.exports.__esModule=!0,e.exports.default=e.exports),n.apply(null,arguments)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},182:function(e){e.exports=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},e.exports.__esModule=!0,e.exports.default=e.exports},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},319:function(e,t,o){var a=o(3646),r=o(6860),n=o(379),c=o(8206);e.exports=function(e){return a(e)||r(e)||n(e)||c()},e.exports.__esModule=!0,e.exports.default=e.exports},379:function(e,t,o){var a=o(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return a(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?a(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},3703:function(e,t,o){"use strict";o.d(t,{Z:function(){return R}});var a=o(3366),r=o(4942),n=o(7462),c=o(7294),l=o(5505),i=o(9408),s=o(7663),u=o(5833),d=o(5893),p=(0,u.Z)((0,d.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),f=o(5973),m=o(9240),b=o(7288),v=o(2058),y=o(1797),g=o(240);function Z(e){return(0,g.Z)("MuiChip",e)}var h=(0,o(2194).Z)("MuiChip",["root","sizeSmall","sizeMedium","colorPrimary","colorSecondary","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","focusVisible"]),x=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"],C=(0,y.ZP)("div",{name:"MuiChip",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState,a=o.color,n=o.clickable,c=o.onDelete,l=o.size,i=o.variant;return[(0,r.Z)({},"& .".concat(h.avatar),t.avatar),(0,r.Z)({},"& .".concat(h.avatar),t["avatar".concat((0,m.Z)(l))]),(0,r.Z)({},"& .".concat(h.avatar),t["avatarColor".concat((0,m.Z)(a))]),(0,r.Z)({},"& .".concat(h.icon),t.icon),(0,r.Z)({},"& .".concat(h.icon),t["icon".concat((0,m.Z)(l))]),(0,r.Z)({},"& .".concat(h.icon),t["iconColor".concat((0,m.Z)(a))]),(0,r.Z)({},"& .".concat(h.deleteIcon),t.deleteIcon),(0,r.Z)({},"& .".concat(h.deleteIcon),t["deleteIcon".concat((0,m.Z)(l))]),(0,r.Z)({},"& .".concat(h.deleteIcon),t["deleteIconColor".concat((0,m.Z)(a))]),(0,r.Z)({},"& .".concat(h.deleteIcon),t["deleteIconOutlinedColor".concat((0,m.Z)(a))]),t.root,t["size".concat((0,m.Z)(l))],t["color".concat((0,m.Z)(a))],n&&t.clickable,n&&"default"!==a&&t["clickableColor".concat((0,m.Z)(a),")")],c&&t.deletable,c&&"default"!==a&&t["deletableColor".concat((0,m.Z)(a))],t[i],"outlined"===i&&t["outlined".concat((0,m.Z)(a))]]}})((function(e){var t,o=e.theme,a=e.ownerState,c=(0,s.Fq)(o.palette.text.primary,.26);return(0,n.Z)((t={fontFamily:o.typography.fontFamily,fontSize:o.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:o.palette.text.primary,backgroundColor:o.palette.action.selected,borderRadius:16,whiteSpace:"nowrap",transition:o.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box"},(0,r.Z)(t,"&.".concat(h.disabled),{opacity:o.palette.action.disabledOpacity,pointerEvents:"none"}),(0,r.Z)(t,"& .".concat(h.avatar),{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===o.palette.mode?o.palette.grey[700]:o.palette.grey[300],fontSize:o.typography.pxToRem(12)}),(0,r.Z)(t,"& .".concat(h.avatarColorPrimary),{color:o.palette.primary.contrastText,backgroundColor:o.palette.primary.dark}),(0,r.Z)(t,"& .".concat(h.avatarColorSecondary),{color:o.palette.secondary.contrastText,backgroundColor:o.palette.secondary.dark}),(0,r.Z)(t,"& .".concat(h.avatarSmall),{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:o.typography.pxToRem(10)}),(0,r.Z)(t,"& .".concat(h.icon),(0,n.Z)({color:"light"===o.palette.mode?o.palette.grey[700]:o.palette.grey[300],marginLeft:5,marginRight:-6},"small"===a.size&&{fontSize:18,marginLeft:4,marginRight:-4},"default"!==a.color&&{color:"inherit"})),(0,r.Z)(t,"& .".concat(h.deleteIcon),(0,n.Z)({WebkitTapHighlightColor:"transparent",color:c,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:(0,s.Fq)(c,.4)}},"small"===a.size&&{fontSize:16,marginRight:4,marginLeft:-4},"default"!==a.color&&{color:(0,s.Fq)(o.palette[a.color].contrastText,.7),"&:hover, &:active":{color:o.palette[a.color].contrastText}})),t),"small"===a.size&&{height:24},"default"!==a.color&&{backgroundColor:o.palette[a.color].main,color:o.palette[a.color].contrastText},a.onDelete&&(0,r.Z)({},"&.".concat(h.focusVisible),{backgroundColor:(0,s.Fq)(o.palette.action.selected,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}),a.onDelete&&"default"!==a.color&&(0,r.Z)({},"&.".concat(h.focusVisible),{backgroundColor:o.palette[a.color].dark}))}),(function(e){var t,o=e.theme,a=e.ownerState;return(0,n.Z)({},a.clickable&&(t={userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:(0,s.Fq)(o.palette.action.selected,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity)}},(0,r.Z)(t,"&.".concat(h.focusVisible),{backgroundColor:(0,s.Fq)(o.palette.action.selected,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}),(0,r.Z)(t,"&:active",{boxShadow:o.shadows[1]}),t),a.clickable&&"default"!==a.color&&(0,r.Z)({},"&:hover, &.".concat(h.focusVisible),{backgroundColor:o.palette[a.color].dark}))}),(function(e){var t,o,a=e.theme,c=e.ownerState;return(0,n.Z)({},"outlined"===c.variant&&(t={backgroundColor:"transparent",border:"1px solid ".concat("light"===a.palette.mode?a.palette.grey[400]:a.palette.grey[700])},(0,r.Z)(t,"&.".concat(h.clickable,":hover"),{backgroundColor:a.palette.action.hover}),(0,r.Z)(t,"&.".concat(h.focusVisible),{backgroundColor:a.palette.action.focus}),(0,r.Z)(t,"& .".concat(h.avatar),{marginLeft:4}),(0,r.Z)(t,"& .".concat(h.avatarSmall),{marginLeft:2}),(0,r.Z)(t,"& .".concat(h.icon),{marginLeft:4}),(0,r.Z)(t,"& .".concat(h.iconSmall),{marginLeft:2}),(0,r.Z)(t,"& .".concat(h.deleteIcon),{marginRight:5}),(0,r.Z)(t,"& .".concat(h.deleteIconSmall),{marginRight:3}),t),"outlined"===c.variant&&"default"!==c.color&&(o={color:a.palette[c.color].main,border:"1px solid ".concat((0,s.Fq)(a.palette[c.color].main,.7))},(0,r.Z)(o,"&.".concat(h.clickable,":hover"),{backgroundColor:(0,s.Fq)(a.palette[c.color].main,a.palette.action.hoverOpacity)}),(0,r.Z)(o,"&.".concat(h.focusVisible),{backgroundColor:(0,s.Fq)(a.palette[c.color].main,a.palette.action.focusOpacity)}),(0,r.Z)(o,"& .".concat(h.deleteIcon),{color:(0,s.Fq)(a.palette[c.color].main,.7),"&:hover, &:active":{color:a.palette[c.color].main}}),o))})),k=(0,y.ZP)("span",{name:"MuiChip",slot:"Label",overridesResolver:function(e,t){var o=e.ownerState.size;return[t.label,t["label".concat((0,m.Z)(o))]]}})((function(e){var t=e.ownerState;return(0,n.Z)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},"small"===t.size&&{paddingLeft:8,paddingRight:8})}));function S(e){return"Backspace"===e.key||"Delete"===e.key}var O=c.forwardRef((function(e,t){var o=(0,v.Z)({props:e,name:"MuiChip"}),r=o.avatar,s=o.className,u=o.clickable,y=o.color,g=void 0===y?"default":y,h=o.component,O=o.deleteIcon,w=o.disabled,I=void 0!==w&&w,M=o.icon,R=o.label,_=o.onClick,z=o.onDelete,j=o.onKeyDown,P=o.onKeyUp,D=o.size,E=void 0===D?"medium":D,F=o.variant,L=void 0===F?"filled":F,T=(0,a.Z)(o,x),N=c.useRef(null),V=(0,f.Z)(N,t),q=function(e){e.stopPropagation(),z&&z(e)},A=!(!1===u||!_)||u,K="small"===E,U=A||z?b.Z:h||"div",B=(0,n.Z)({},o,{component:U,disabled:I,size:E,color:g,onDelete:!!z,clickable:A,variant:L}),H=function(e){var t=e.classes,o=e.disabled,a=e.size,r=e.color,n=e.onDelete,c=e.clickable,l=e.variant,s={root:["root",l,o&&"disabled","size".concat((0,m.Z)(a)),"color".concat((0,m.Z)(r)),c&&"clickable",c&&"clickableColor".concat((0,m.Z)(r)),n&&"deletable",n&&"deletableColor".concat((0,m.Z)(r)),"".concat(l).concat((0,m.Z)(r))],label:["label","label".concat((0,m.Z)(a))],avatar:["avatar","avatar".concat((0,m.Z)(a)),"avatarColor".concat((0,m.Z)(r))],icon:["icon","icon".concat((0,m.Z)(a)),"iconColor".concat((0,m.Z)(r))],deleteIcon:["deleteIcon","deleteIcon".concat((0,m.Z)(a)),"deleteIconColor".concat((0,m.Z)(r)),"deleteIconOutlinedColor".concat((0,m.Z)(r))]};return(0,i.Z)(s,Z,t)}(B),W=U===b.Z?(0,n.Z)({component:h||"div",focusVisibleClassName:H.focusVisible},z&&{disableRipple:!0}):{},X=null;if(z){var $=(0,l.Z)("default"!==g&&("outlined"===L?H["deleteIconOutlinedColor".concat((0,m.Z)(g))]:H["deleteIconColor".concat((0,m.Z)(g))]),K&&H.deleteIconSmall);X=O&&c.isValidElement(O)?c.cloneElement(O,{className:(0,l.Z)(O.props.className,H.deleteIcon,$),onClick:q}):(0,d.jsx)(p,{className:(0,l.Z)(H.deleteIcon,$),onClick:q})}var G=null;r&&c.isValidElement(r)&&(G=c.cloneElement(r,{className:(0,l.Z)(H.avatar,r.props.className)}));var J=null;return M&&c.isValidElement(M)&&(J=c.cloneElement(M,{className:(0,l.Z)(H.icon,M.props.className)})),(0,d.jsxs)(C,(0,n.Z)({as:U,className:(0,l.Z)(H.root,s),disabled:!(!A||!I)||void 0,onClick:_,onKeyDown:function(e){e.currentTarget===e.target&&S(e)&&e.preventDefault(),j&&j(e)},onKeyUp:function(e){e.currentTarget===e.target&&(z&&S(e)?z(e):"Escape"===e.key&&N.current&&N.current.blur()),P&&P(e)},ref:V,ownerState:B},W,T,{children:[G||J,(0,d.jsx)(k,{className:(0,l.Z)(H.label),ownerState:B,children:R}),X]}))})),w=o(2483),I=o(5444),M=["tags"];var R=function(e){var t=e.tags,o=(0,a.Z)(e,M);return t&&0!==t.length?c.createElement("ul",Object.assign({},o,{style:{margin:"1rem 0"}}),t.map((function(e){return"index"!==e&&c.createElement(O,{color:"primary",avatar:c.createElement(w.Z,null,e[0]),label:e,onClick:function(t){t.preventDefault(),(0,I.navigate)(function(e){return"/tags/"+e}(e))},key:e})}))):null}},1274:function(e,t,o){var a=o(1048);e.exports={MDXRenderer:a}},1048:function(e,t,o){var a=o(9100),r=o(319),n=o(182),c=o(7316),l=["scope","children"];function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var u=o(7294),d=o(4983).mdx,p=o(3191).useMDXScope;e.exports=function(e){var t=e.scope,o=e.children,n=c(e,l),i=p(t),f=u.useMemo((function(){if(!o)return null;var e=s({React:u,mdx:d},i),t=Object.keys(e),n=t.map((function(t){return e[t]}));return a(Function,["_fn"].concat(r(t),[""+o])).apply(void 0,[{}].concat(r(n)))}),[o,t]);return u.createElement(f,s({},n))}}}]);
//# sourceMappingURL=18d2a1d1bd11dfeb160d0f057d2a379edc7a722f-84b1f2c50631c084d09b.js.map