"use strict";(self.webpackChunkgatsby_blog=self.webpackChunkgatsby_blog||[]).push([[456],{9046:function(e,t,n){var r=n(5245),o=n(5444),a=n(7294),i=["slug","data"];function l(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function s(e){return void 0===e&&(e={fields:{slug:"/"},frontmatter:{title:"首页",index:-1}}),e}function d(e,t){void 0===t&&(t=10);var n=e.substr(0,t);return e.length>t&&(n+="...",n+=e.substr(Math.max(n.length+6,e.length-t))),n}t.Z=function(e){var t,n,c=e.slug,u=e.data,p=(0,r.Z)(e,i),m=function(e,t){if(e)for(var n,r=l(e);!(n=r()).done;){var o,a,i=n.value.node;if(t===(null==i||null===(o=i.fields)||void 0===o?void 0:o.slug))return(null==i||null===(a=i.frontmatter)||void 0===a?void 0:a.index)-1}return-1}(u=function(e){return Array.from(e).filter((function(e){var t,n,r;return(null==e||null===(t=e.node)||void 0===t||null===(n=t.frontmatter)||void 0===n||null===(r=n.index)||void 0===r?void 0:r.toString().indexOf("."))<0}))}(u),c),v=s(function(e,t){var n;if(e)return null===(n=e[t-1])||void 0===n?void 0:n.node}(u,m)),f=s(function(e,t){var n;if(e)return null===(n=e[t+1])||void 0===n?void 0:n.node}(u,m));return m>-1?a.createElement("div",Object.assign({style:{width:"100%",display:"flex",justifyContent:"space-between"}},p),a.createElement(o.Link,{to:v.fields.slug,name:"previous"},"<-",d(v.frontmatter.title),"-"),a.createElement(o.Link,{to:null==f||null===(t=f.fields)||void 0===t?void 0:t.slug,name:"previous"},"-",d(null==f||null===(n=f.frontmatter)||void 0===n?void 0:n.title)," ->")):a.createElement(a.Fragment,null)}},5721:function(e,t,n){n.d(t,{Z:function(){return N}});var r=n(7294),o=n(5444),a=n(9499),i=n(885),l=n(4942),c=n(5245),s=n(7462),d=n(5505),u=n(4434),p=n(2298),m=n(8495),v=n(2020),f=n(7249),h=n(3896),g=n(5243),y=n(3819),b=n(4872),x=n(4973);function Z(e){return(0,x.Z)("MuiLink",e)}var S=(0,n(5540).Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),k=n(5893),w=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"],E={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},C=(0,f.ZP)(b.Z,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["underline".concat((0,v.Z)(n.underline))],"button"===n.component&&t.button]}})((function(e){var t=e.theme,n=e.ownerState,r=(0,p.D)(t,"palette.".concat(function(e){return E[e]||e}(n.color)))||n.color;return(0,s.Z)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==r?(0,m.Fq)(r,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&(0,l.Z)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(S.focusVisible),{outline:"auto"}))})),T=r.forwardRef((function(e,t){var n=(0,h.Z)({props:e,name:"MuiLink"}),o=n.className,a=n.color,l=void 0===a?"primary":a,p=n.component,m=void 0===p?"a":p,f=n.onBlur,b=n.onFocus,x=n.TypographyClasses,S=n.underline,E=void 0===S?"always":S,T=n.variant,M=void 0===T?"inherit":T,N=(0,c.Z)(n,w),W=(0,g.Z)(),P=W.isFocusVisibleRef,R=W.onBlur,j=W.onFocus,D=W.ref,H=r.useState(!1),A=(0,i.Z)(H,2),B=A[0],O=A[1],z=(0,y.Z)(t,D),F=(0,s.Z)({},n,{color:l,component:m,focusVisible:B,underline:E,variant:M}),L=function(e){var t=e.classes,n=e.component,r=e.focusVisible,o=e.underline,a={root:["root","underline".concat((0,v.Z)(o)),"button"===n&&"button",r&&"focusVisible"]};return(0,u.Z)(a,Z,t)}(F);return(0,k.jsx)(C,(0,s.Z)({className:(0,d.Z)(L.root,o),classes:x,color:l,component:m,onBlur:function(e){R(e),!1===P.current&&O(!1),f&&f(e)},onFocus:function(e){j(e),!0===P.current&&O(!0),b&&b(e)},ref:z,ownerState:F,variant:M},N))})),M=function(){function e(e,t){this.path=e,this.wantTo=t}var t=e.prototype;return t.check=function(){return this.sameLevelIndex().sameLevelOthers()},t.sameLevelIndex=function(){var e=this.wantTo,t=this.path;return"./"===e&&(t.endsWith("/")&&(t=t.substr(0,t.length-1)),t=t.substr(0,t.lastIndexOf("/"))),this.setProperties({path:t})},t.sameLevelOthers=function(){var e=this.wantTo,t=this.path;return e.startsWith("./")&&(e=e.replace("./",""),t=t.concat("/"+e)),this.setProperties({path:t,wantTo:e})},t.setProperties=function(e){var t=this;return Object.keys(e).forEach((function(n){t[n]=e[n]})),this},e}(),N=function(e){var t=e.desc,n=void 0===t?"":t,i=e.to,l=void 0===i?"":i,c=e.external,s=function(e){var t=e.location,a=new M(t.pathname,l.toString().trim()).check().path;return r.createElement(T,{underline:"none",color:"textPrimary",component:o.Link,to:a},n)};return void 0!==c&&c?r.createElement(T,{underline:"none",color:"textPrimary",href:l},n):r.createElement(a.Location,null,(function(e){return r.createElement(s,e)}))}},5813:function(e,t,n){n.r(t),n.d(t,{default:function(){return De}});var r={};n.r(r),n.d(r,{Expansion:function(){return ve},Expansioned:function(){return he},Imgs:function(){return fe},Quote:function(){return pe},Tab:function(){return me},Title:function(){return ce},aphorism:function(){return ue},hidden:function(){return ge},hide:function(){return de},model:function(){return se}});var o=n(7462),a=n(5245),i=n(7294),l=n(5505),c=n(4434);var s=i.createContext(),d=n(3896),u=n(7249),p=n(4973),m=n(5540);function v(e){return(0,p.Z)("MuiTableBody",e)}(0,m.Z)("MuiTableBody",["root"]);var f=n(5893),h=["className","component"],g=(0,u.ZP)("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:function(e,t){return t.root}})({display:"table-row-group"}),y={variant:"body"},b="tbody",x=i.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiTableBody"}),r=n.className,i=n.component,u=void 0===i?b:i,p=(0,a.Z)(n,h),m=(0,o.Z)({},n,{component:u}),x=function(e){var t=e.classes;return(0,c.Z)({root:["root"]},v,t)}(m);return(0,f.jsx)(s.Provider,{value:y,children:(0,f.jsx)(g,(0,o.Z)({className:(0,l.Z)(x.root,r),as:u,ref:t,role:u===b?null:"rowgroup",ownerState:m},p))})}));function Z(e){return(0,p.Z)("MuiTableHead",e)}(0,m.Z)("MuiTableHead",["root"]);var S=["className","component"],k=(0,u.ZP)("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:function(e,t){return t.root}})({display:"table-header-group"}),w={variant:"head"},E="thead",C=i.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiTableHead"}),r=n.className,i=n.component,u=void 0===i?E:i,p=(0,a.Z)(n,S),m=(0,o.Z)({},n,{component:u}),v=function(e){var t=e.classes;return(0,c.Z)({root:["root"]},Z,t)}(m);return(0,f.jsx)(s.Provider,{value:w,children:(0,f.jsx)(k,(0,o.Z)({as:u,className:(0,l.Z)(v.root,r),ref:t,role:u===E?null:"rowgroup",ownerState:m},p))})})),T=n(4942),M=n(8495);function N(e){return(0,p.Z)("MuiTableRow",e)}var W=(0,m.Z)("MuiTableRow",["root","selected","hover","head","footer"]),P=["className","component","hover","selected"],R=(0,u.ZP)("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.head&&t.head,n.footer&&t.footer]}})((function(e){var t,n=e.theme;return t={color:"inherit",display:"table-row",verticalAlign:"middle",outline:0},(0,T.Z)(t,"&.".concat(W.hover,":hover"),{backgroundColor:n.palette.action.hover}),(0,T.Z)(t,"&.".concat(W.selected),{backgroundColor:(0,M.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity),"&:hover":{backgroundColor:(0,M.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.hoverOpacity)}}),t})),j=i.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiTableRow"}),r=n.className,u=n.component,p=void 0===u?"tr":u,m=n.hover,v=void 0!==m&&m,h=n.selected,g=void 0!==h&&h,y=(0,a.Z)(n,P),b=i.useContext(s),x=(0,o.Z)({},n,{component:p,hover:v,selected:g,head:b&&"head"===b.variant,footer:b&&"footer"===b.variant}),Z=function(e){var t=e.classes,n={root:["root",e.selected&&"selected",e.hover&&"hover",e.head&&"head",e.footer&&"footer"]};return(0,c.Z)(n,N,t)}(x);return(0,f.jsx)(R,(0,o.Z)({as:p,ref:t,className:(0,l.Z)(Z.root,r),role:"tr"===p?null:"row",ownerState:x},y))})),D=j,H=n(2020);var A=i.createContext();function B(e){return(0,p.Z)("MuiTableCell",e)}var O=(0,m.Z)("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),z=["align","className","component","padding","scope","size","sortDirection","variant"],F=(0,u.ZP)("td",{name:"MuiTableCell",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["size".concat((0,H.Z)(n.size))],"normal"!==n.padding&&t["padding".concat((0,H.Z)(n.padding))],"inherit"!==n.align&&t["align".concat((0,H.Z)(n.align))],n.stickyHeader&&t.stickyHeader]}})((function(e){var t=e.theme,n=e.ownerState;return(0,o.Z)({},t.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===t.palette.mode?(0,M.$n)((0,M.Fq)(t.palette.divider,1),.88):(0,M._j)((0,M.Fq)(t.palette.divider,1),.68)),textAlign:"left",padding:16},"head"===n.variant&&{color:t.palette.text.primary,lineHeight:t.typography.pxToRem(24),fontWeight:t.typography.fontWeightMedium},"body"===n.variant&&{color:t.palette.text.primary},"footer"===n.variant&&{color:t.palette.text.secondary,lineHeight:t.typography.pxToRem(21),fontSize:t.typography.pxToRem(12)},"small"===n.size&&(0,T.Z)({padding:"6px 16px"},"&.".concat(O.paddingCheckbox),{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}),"checkbox"===n.padding&&{width:48,padding:"0 0 0 4px"},"none"===n.padding&&{padding:0},"left"===n.align&&{textAlign:"left"},"center"===n.align&&{textAlign:"center"},"right"===n.align&&{textAlign:"right",flexDirection:"row-reverse"},"justify"===n.align&&{textAlign:"justify"},n.stickyHeader&&{position:"sticky",top:0,zIndex:2,backgroundColor:t.palette.background.default})})),L=i.forwardRef((function(e,t){var n,r=(0,d.Z)({props:e,name:"MuiTableCell"}),u=r.align,p=void 0===u?"inherit":u,m=r.className,v=r.component,h=r.padding,g=r.scope,y=r.size,b=r.sortDirection,x=r.variant,Z=(0,a.Z)(r,z),S=i.useContext(A),k=i.useContext(s),w=k&&"head"===k.variant;n=v||(w?"th":"td");var E=g;!E&&w&&(E="col");var C=x||k&&k.variant,T=(0,o.Z)({},r,{align:p,component:n,padding:h||(S&&S.padding?S.padding:"normal"),size:y||(S&&S.size?S.size:"medium"),sortDirection:b,stickyHeader:"head"===C&&S&&S.stickyHeader,variant:C}),M=function(e){var t=e.classes,n=e.variant,r=e.align,o=e.padding,a=e.size,i={root:["root",n,e.stickyHeader&&"stickyHeader","inherit"!==r&&"align".concat((0,H.Z)(r)),"normal"!==o&&"padding".concat((0,H.Z)(o)),"size".concat((0,H.Z)(a))]};return(0,c.Z)(i,B,t)}(T),N=null;return b&&(N="asc"===b?"ascending":"descending"),(0,f.jsx)(F,(0,o.Z)({as:n,ref:t,className:(0,l.Z)(M.root,m),"aria-sort":N,scope:E,ownerState:T},Z))})),I=L,q=n(4983),Q=n(1274),K=n(885);var V=n(3948),X=n(6291),G=n(5660),Y=n(4820);function J(e){return(0,p.Z)("MuiDialog",e)}var U=(0,m.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);var _=(0,i.createContext)({}),$=n(4374),ee=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],te=(0,u.ZP)($.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,t){return t.backdrop}})({zIndex:-1}),ne=(0,u.ZP)(V.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,t){return t.root}})({"@media print":{position:"absolute !important"}}),re=(0,u.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,t){var n=e.ownerState;return[t.container,t["scroll".concat((0,H.Z)(n.scroll))]]}})((function(e){var t=e.ownerState;return(0,o.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===t.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===t.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),oe=(0,u.ZP)(Y.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,t){var n=e.ownerState;return[t.paper,t["scrollPaper".concat((0,H.Z)(n.scroll))],t["paperWidth".concat((0,H.Z)(String(n.maxWidth)))],n.fullWidth&&t.paperFullWidth,n.fullScreen&&t.paperFullScreen]}})((function(e){var t=e.theme,n=e.ownerState;return(0,o.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===n.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===n.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!n.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===n.maxWidth&&(0,T.Z)({maxWidth:"px"===t.breakpoints.unit?Math.max(t.breakpoints.values.xs,444):"".concat(t.breakpoints.values.xs).concat(t.breakpoints.unit)},"&.".concat(U.paperScrollBody),(0,T.Z)({},t.breakpoints.down(Math.max(t.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),"xs"!==n.maxWidth&&(0,T.Z)({maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)},"&.".concat(U.paperScrollBody),(0,T.Z)({},t.breakpoints.down(t.breakpoints.values[n.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),n.fullWidth&&{width:"calc(100% - 64px)"},n.fullScreen&&(0,T.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(U.paperScrollBody),{margin:0,maxWidth:"100%"}))})),ae={enter:G.x9.enteringScreen,exit:G.x9.leavingScreen},ie=i.forwardRef((function(e,t){var n,r,s,u,p,m,v=(0,d.Z)({props:e,name:"MuiDialog"}),h=v["aria-describedby"],g=v["aria-labelledby"],y=v.BackdropComponent,b=v.BackdropProps,x=v.children,Z=v.className,S=v.disableEscapeKeyDown,k=void 0!==S&&S,w=v.fullScreen,E=void 0!==w&&w,C=v.fullWidth,T=void 0!==C&&C,M=v.maxWidth,N=void 0===M?"sm":M,W=v.onBackdropClick,P=v.onClose,R=v.open,j=v.PaperComponent,D=void 0===j?Y.Z:j,A=v.PaperProps,B=void 0===A?{}:A,O=v.scroll,z=void 0===O?"paper":O,F=v.TransitionComponent,L=void 0===F?X.Z:F,I=v.transitionDuration,q=void 0===I?ae:I,Q=v.TransitionProps,V=(0,a.Z)(v,ee),G=(0,o.Z)({},v,{disableEscapeKeyDown:k,fullScreen:E,fullWidth:T,maxWidth:N,scroll:z}),U=function(e){var t=e.classes,n=e.scroll,r=e.maxWidth,o=e.fullWidth,a=e.fullScreen,i={root:["root"],container:["container","scroll".concat((0,H.Z)(n))],paper:["paper","paperScroll".concat((0,H.Z)(n)),"paperWidth".concat((0,H.Z)(String(r))),o&&"paperFullWidth",a&&"paperFullScreen"]};return(0,c.Z)(i,J,t)}(G),$=i.useRef(),ie=(n=g,r=i.useState(n),s=(0,K.Z)(r,2),u=s[0],p=s[1],m=n||u,i.useEffect((function(){null==u&&p("mui-".concat(Math.round(1e9*Math.random())))}),[u]),m),le=i.useMemo((function(){return{titleId:ie}}),[ie]);return(0,f.jsx)(ne,(0,o.Z)({className:(0,l.Z)(U.root,Z),BackdropProps:(0,o.Z)({transitionDuration:q,as:y},b),closeAfterTransition:!0,BackdropComponent:te,disableEscapeKeyDown:k,onClose:P,open:R,ref:t,onClick:function(e){$.current&&($.current=null,W&&W(e),P&&P(e,"backdropClick"))},ownerState:G},V,{children:(0,f.jsx)(L,(0,o.Z)({appear:!0,in:R,timeout:q,role:"presentation"},Q,{children:(0,f.jsx)(re,{className:(0,l.Z)(U.container),onMouseDown:function(e){$.current=e.target===e.currentTarget},ownerState:G,children:(0,f.jsx)(oe,(0,o.Z)({as:D,elevation:24,role:"dialog","aria-describedby":h,"aria-labelledby":ie},B,{className:(0,l.Z)(U.paper,B.className),ownerState:G,children:(0,f.jsx)(_.Provider,{value:le,children:x})}))})}))}))})),le=n(3010),ce="style-module--Title--dD0s7",se="style-module--model--q4aEi",de="style-module--hide--FjDKe",ue="style-module--aphorism--JQfdx",pe="style-module--Quote--Tj7Ea",me="style-module--Tab--RGodh",ve="style-module--Expansion--Oj3Rb",fe="style-module--Imgs--Nild3",he="style-module--Expansioned--I9nU6",ge="style-module--hidden--jjO78";function ye(e){return(0,p.Z)("MuiTable",e)}(0,m.Z)("MuiTable",["root","stickyHeader"]);var be=["className","component","padding","size","stickyHeader"],xe=(0,u.ZP)("table",{name:"MuiTable",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.stickyHeader&&t.stickyHeader]}})((function(e){var t=e.theme,n=e.ownerState;return(0,o.Z)({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":(0,o.Z)({},t.typography.body2,{padding:t.spacing(2),color:t.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},n.stickyHeader&&{borderCollapse:"separate"})})),Ze="table",Se=i.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiTable"}),r=n.className,s=n.component,u=void 0===s?Ze:s,p=n.padding,m=void 0===p?"normal":p,v=n.size,h=void 0===v?"medium":v,g=n.stickyHeader,y=void 0!==g&&g,b=(0,a.Z)(n,be),x=(0,o.Z)({},n,{component:u,padding:m,size:h,stickyHeader:y}),Z=function(e){var t=e.classes,n={root:["root",e.stickyHeader&&"stickyHeader"]};return(0,c.Z)(n,ye,t)}(x),S=i.useMemo((function(){return{padding:m,size:h,stickyHeader:y}}),[m,h,y]);return(0,f.jsx)(A.Provider,{value:S,children:(0,f.jsx)(xe,(0,o.Z)({as:u,role:u===Ze?null:"table",ref:t,className:(0,l.Z)(Z.root,r),ownerState:x},b))})})),ke=(0,n(2112).Z)(Se)({width:"auto",minWidth:600}),we={Comment:function(){return document.getElementById("Comment")},onOver:function(e){var t=this.Comment();if(!t)throw"";t.style.display="block",t.innerHTML=e},onOut:function(){var e=this.Comment();if(!e)throw"";e.style.display="none"}},Ee=["children","title"],Ce=[],Te=[],Me=n(9046),Ne=n(2560),We=n(5721),Pe=n(9470),Re=n(4672),je={Tab:function(e){var t=e.children,n=e.expan,r=e.vicinage,o=[me];return n&&o.push(ge),r?i.createElement("div",{className:me,vicinage:"true"}):t?i.createElement(i.Fragment,null,i.createElement("div",{className:(0,l.Z)(o)},t),n&&i.createElement("br",null)):i.createElement("div",{className:(0,l.Z)(o)})},Navigation:We.Z,Anchor:function(e){var t=e.name,n=e.children;return t||(t=(null==n?void 0:n.toString())||""),i.createElement("h3",null,i.createElement("span",{name:t},n))},Quote:function(e){var t=e.id,n=e.children,r=function(){Ce[parseInt(t.replace("#",""))-1]?we.onOver(Ce[parseInt(t.replace("#",""))-1]):we.onOver("Warn: no such Quote be found in "+Ce+" at "+t)},o=function(){return we.onOut()};return i.createElement("span",{className:pe,id:t,onMouseOver:r,onFocus:r,onMouseOut:o,onBlur:o},n)},Model:function(e){var t=e.about,n=e.children,r=(0,i.useState)(!1),o=r[0],a=r[1],l=Te[parseInt(t.replace("@",""))-1];return i.createElement("div",{className:se,onClick:function(){a(!0)}},n,i.createElement(ie,{open:o,id:"model"+t,onClose:function(e){e.stopPropagation(),a(!1)},scroll:"body",PaperProps:{style:{maxWidth:"unset"}}},i.createElement(le.Z,{title:"缩小",path:"graphics/"+l,ext:"png",imgStyle:{objectFit:"none"}})))},Expansion:function(e){var t=e.children;return i.createElement("div",{role:"expansion",className:ve,onClick:function(e){!function(e,t){var n=e.nextElementSibling;if(null!=n){for(var r,o;n&&!n.classList.contains(t.Tab);)n=n.nextElementSibling;null===(r=n)||void 0===r||null===(o=r.classList)||void 0===o||o.toggle(t.hidden)}e.classList.toggle(t.Expansioned)}(e.currentTarget,r)}},t)},Aphorism:function(e){var t=e.children;return i.createElement("div",{style:{width:"100%",textAlign:"center",margin:"0.5rem auto"}},i.createElement("span",{className:ue},t))},Table:function(e){var t,n,r,o=e.children,l=e.title,c=(0,a.Z)(e,Ee),s=null!==(t=null===(n=Array.from(null===(r=o[0])||void 0===r?void 0:r.cells))||void 0===n?void 0:n.length)&&void 0!==t?t:2;return i.createElement(ke,Object.assign({size:"small"},c),l&&i.createElement(C,null,i.createElement(D,null,i.createElement(I,{align:"center",colSpan:s,style:{fontSize:20}},l))),i.createElement(x,null,null==o?void 0:o.map((function(e,t){return i.createElement(D,{key:t,style:e.style},Array.from(e.cells).map((function(t,n){var r=e.props?e.props[n]:{};return i.createElement(I,Object.assign({},r,{component:e.component?e.component[n]:void 0,key:n,style:e.cellStyle}),t)})))}))))},TableBody:x,TableHead:C,TableRow:D,TableCell:I,hr:function(e){return i.createElement("hr",Object.assign({className:"main-module--hrStyle--6h9uP"},e))},a:function(e){return i.createElement("a",Object.assign({className:"main-module--aStyle--7lmWD"},e))},th:function(e){return i.createElement("th",Object.assign({className:"main-module--thStyle--n3oNf"},e))},td:function(e){return i.createElement("th",Object.assign({className:"main-module--tdStyle--MyQ9F"},e))}};function De(e){var t,n=e.data,r=n.mdx,o=n.allMdx,a=r.frontmatter,l=r.body,c=r.fields,s=r.exports;t=s.QuoteList,Ce=t,function(e){Te=e}(s.ImgList);var d=c.slug==="/"+c.templateTag?"GraphicsLearning":a.title;return i.createElement(Ne.Z,{content:{className:"main-module--mainStyle--SHGlU"},footer:{className:"default-footer",style:{filter:"invert(1) drop-shadow(2px 4px 6px black)"}}},i.createElement(Pe.Z,{title:d,config:{titleTemplate:c.slug==="/"+c.templateTag?"%s":"%s | GraphicsLearning"}}),i.createElement("div",{className:"main-module--graphicsPost--SJYPS"},i.createElement("h1",null,i.createElement("a",{href:"#",title:""+a.date,className:"main-module--titleStyle--7vSCS"},a.title)),i.createElement(Me.Z,{slug:c.slug,data:null==o?void 0:o.edges,className:"main-module--indexingStyle--ud3ab"}),i.createElement(Re.Z,{tags:a.tags,className:"main-module--taglistsStyle--BipBT"}),i.createElement(q.MDXProvider,{components:je},i.createElement(Q.MDXRenderer,null,l)),i.createElement("div",{id:"Comment",className:"main-module--Comment--qyK5x"})))}}}]);
//# sourceMappingURL=component---src-templates-graphics-js-14e393ed5e8a77810fb5.js.map