(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{3199:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[collection]/[...slug]",function(){return n(7003)}])},7675:function(e,t,n){"use strict";var l=n(5893),r=n(4745),s=n(5675),a=n.n(s),i=n(7294);let o=e=>{let{src:t,ext:n,style:s,width:o=3e3,height:c=3e3,...d}=e,u=i.useMemo(()=>t.startsWith("http")?t:"".concat(r.Z.site.baseUrl+t).concat(n?"."+n:""),[t,n]);return(0,l.jsx)(a(),{style:s,src:u,width:o,height:c,crossOrigin:"anonymous",alt:d.alt||u,...d})};o.Static=a(),t.Z=o},577:function(e,t,n){"use strict";n.d(t,{Z:function(){return Z},_:function(){return C}});var l=n(5893),r=n(7294);let s=r.createContext({overview:[]}),a=e=>{let{overview:t,children:n}=e;return(0,l.jsx)(s.Provider,{value:{overview:t},children:n})},i=()=>r.useContext(s);var o=n(5788),c=n(6010),d=n(3723),u=n.n(d);let h=r.forwardRef((e,t)=>{let{children:n,appearance:r,className:s,...a}=e;return(0,l.jsx)("button",{className:(0,c.Z)(u().btn,"subtle"===r&&u().subtle,"transparent"===r&&u().transparent,s),...a,ref:t,children:n})});var m=n(6486),x=n.n(m),_=n(505),p=n(6413),v=n.n(p),f=n(4316),j=n(2756),y=n(1664),g=n.n(y);let b=r.forwardRef((e,t)=>{let{children:n,title:r,...s}=e;return(0,l.jsx)("li",{className:v().item,children:(0,l.jsxs)(g(),{...s,ref:t,children:[(0,l.jsx)(j.Z,{as:"title",children:r}),(0,l.jsx)(j.Z,{as:"p",maxLines:2,children:n})]})})}),w=e=>{let{imgSrc:t,fileList:n=[]}=e;return(0,l.jsxs)("div",{className:v().preview,children:[(0,l.jsx)("div",{"data-layer":"bg",style:{backgroundImage:"url(".concat(t,")")}}),(0,l.jsx)("ul",{"data-layer":"list",children:n.map(e=>{var t,n;return(0,l.jsx)(b,{href:e.url,title:e.frontmatter.title,children:(null===(t=e.rawContent)||void 0===t?void 0:t.substring(0,64))||(null===(n=e.frontmatter)||void 0===n?void 0:n.date)},e.file)})})]})},N=e=>{let{imgSrc:t,topic:n="",fileList:r=[],style:s}=e,a=(0,_.X)(),{overview:d}=i();return(0,l.jsx)("header",{"data-theme":"dark",className:v()["nav-root"],style:s,children:(0,l.jsxs)("section",{className:v()["nav-section"],children:[(0,l.jsx)(g(),{className:v()["nav-logo"],href:"/",children:(0,l.jsx)("h3",{children:"Allen Lee@Blog"})}),(0,l.jsxs)(f.fC,{className:v()["nav-menus"],children:[(0,l.jsxs)(f.aV,{children:[n&&(0,l.jsxs)(f.ck,{children:[(0,l.jsx)(f.xz,{className:v()["nav-trigger"],asChild:!0,children:(0,l.jsxs)(h,{appearance:"subtle",children:[x().capitalize(n),(0,l.jsx)(o.jX5,{"aria-hidden":!0})]})}),(0,l.jsx)(f.VY,{className:v()["nav-surface"],children:(0,l.jsx)(w,{imgSrc:t,fileList:r})})]}),(0,l.jsxs)(f.ck,{children:[(0,l.jsx)(f.xz,{className:v()["nav-trigger"],asChild:!0,children:(0,l.jsxs)(h,{appearance:"subtle",children:["Overview ",(0,l.jsx)(o.jX5,{"aria-hidden":!0})]})}),(0,l.jsx)(f.VY,{className:v()["nav-surface"],children:(0,l.jsx)("ul",{className:v().overviews,children:d.map(e=>(0,l.jsx)("li",{children:(0,l.jsxs)(g(),{href:"/tags/"+e.name,children:[(0,l.jsx)("span",{children:e.name}),(0,l.jsx)("span",{"data-layer":"count",children:e.length||0})]})},e.name))})})]}),(0,l.jsx)(f.z$,{className:v()["nav-indicator"],children:(0,l.jsx)("i",{})})]}),(0,l.jsx)(f.l_,{className:(0,c.Z)(v()["nav-viewport"],a)})]})]})})},S=e=>{let{children:t,theme:n}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(N,{imgSrc:"",style:{height:80}}),(0,l.jsx)("main",{"data-theme":n,style:{backgroundColor:"var(--colorNeutralBackground1)",overflowX:"hidden",overflowY:"auto",width:"100vw",height:"calc(100vh - ".concat(80,"px)")},id:"main",children:t})]})};function C(e){let t=t=>{let{overview:n,...r}=t;return(0,l.jsx)(a,{overview:n,children:(0,l.jsx)(e,{...r})})};return t.displayName="InjectedComponent",t}var Z=S},7957:function(e,t,n){"use strict";var l=n(5893),r=n(9008),s=n.n(r),a=n(4745);n(7294);let i=e=>{let{title:t="",titleTemplate:n="%s",meta:r=[]}=e,i=n.replace("%s",t||a.Z.site.title);return(0,l.jsxs)(s(),{children:[(0,l.jsx)("meta",{charSet:"UTF-8"}),(0,l.jsx)("title",{children:i}),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,l.jsx)("meta",{property:"og:title",content:i},"og:title"),(0,l.jsx)("meta",{name:"description",content:a.Z.site.description},"meta:description"),(0,l.jsx)("meta",{property:"og:description",content:a.Z.site.description},"og:description"),(0,l.jsx)("meta",{property:"og:type",content:"website"}),(0,l.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),(0,l.jsx)("link",{rel:"icon",type:"image/x-icon",href:"/favicon.ico"}),r.map(e=>(0,l.jsx)("meta",{name:e.name,content:e.content,property:e.property},e.name))]})};t.Z=i},505:function(e,t,n){"use strict";n.d(t,{X:function(){return o}});var l=n(5893),r=n(7294),s=n(6010),a=n(287),i=n.n(a);function o(){return(null===i()||void 0===i()?void 0:i().surface)||""}let c=r.forwardRef((e,t)=>{let{children:n,appearance:r="primary",className:a,...o}=e;return(0,l.jsx)("section",{className:(0,s.Z)(i().surface,"soft"===r&&i()["soft-surface"],"minimum"===r&&i()["minimum-surface"],a),...o,ref:t,children:n})});c.displayName="surface",t.Z=c},2756:function(e,t,n){"use strict";var l=n(5893),r=n(7294),s=n(8554),a=n(9759),i=n(505),o=n(6010),c=n(9484),d=n.n(c);let u=e=>{let{children:t,maxLines:n=100,as:c="span",tooltipProps:u={},portalContainInBody:h=!1,...m}=e,[x,_]=r.useState(!1),[p,v]=r.useState(!1),f=r.useRef(null);return(0,l.jsx)(a.zt,{delayDuration:200,skipDelayDuration:100,children:(0,l.jsxs)(a.fC,{open:x,onOpenChange:e=>_(e),children:[(0,l.jsx)(a.xz,{asChild:!0,children:(0,l.jsx)(c,{...m||{},ref:e=>{e&&(f.current=e.parentNode)},children:(0,l.jsx)(s.Z,{lines:n,maxLines:n,withTooltip:!1,children:t})})}),(0,l.jsx)(a.h_,{container:h?document.body:f.current,children:(0,l.jsx)(a.VY,{children:(0,l.jsx)(i.Z,{appearance:"soft",style:{padding:"2px 4px"},...u,children:r.Children.map(t||[],e=>{var t,n;return r.isValidElement(e)?r.cloneElement(e,{className:(0,o.Z)(null==e?void 0:null===(t=e.props)||void 0===t?void 0:t.className,d()["in-tooltip"]),"in-tooltip":"true"}):e?(0,l.jsx)("span",{className:(0,o.Z)(null==e?void 0:null===(n=e.props)||void 0===n?void 0:n.className,d()["in-tooltip"]),"in-tooltip":"true",children:e}):void 0})})})})]})})};t.Z=u},4745:function(e,t){"use strict";t.Z={site:{title:"Allen Blog",description:"Personal Blog",baseUrl:"/blog"}}},7003:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return eO},default:function(){return eG}});var l=n(5893),r=n.t(l,2),s=n(7294),a=n(4428);let i=e=>{let{code:t}=e,{default:n,...l}=s.useMemo(()=>(0,a.W)(t,r),[t]);return[n,l]};var o=n(7675),c=n(6010),d=n(577),u=n(7957),h=n(6486),m=n.n(h),x=n(952),_=n(3917),p=n.n(_);let v=e=>{let{src:t="",children:n=t,className:r,appearance:s}=e;return(0,l.jsxs)(x.fC,{className:(0,c.Z)(p()["avatar-root"],r,"circular"===s&&p().circular),role:"img",children:[(0,l.jsx)(x.Ee,{className:p()["avatar-image"],src:t,alt:n}),(0,l.jsx)(x.NY,{className:p()["avatar-fallback"],delayMs:400,children:n})]})};var f=n(505),j=n(1664),y=n.n(j),g=n(5432),b=n.n(g);let w=(0,s.createContext)({selected:[]}),N=(0,s.createContext)({expandedIcon:null,collapseIcon:null});var S=n(9013),C=n.n(S);let Z=e=>{let{collapseIcon:t,expandIcon:n,expanded:r,width:s=15}=e;return(0,l.jsx)("span",{className:C()["icon-container"],style:{width:s},children:r?n:t})};var k=n(2756);let T=e=>{let{children:t}=e;return(0,l.jsx)(k.Z,{as:"span",maxLines:1,className:C().label,children:t})},I=(0,s.memo)(e=>{let{expandable:t,expandWidth:n,expanded:r}=e,a=(0,s.useContext)(N);return t?(0,l.jsx)(Z,{collapseIcon:a.collapseIcon,expandIcon:a.expandedIcon,expanded:!r,width:n}):(0,l.jsx)(l.Fragment,{})});I.displayName="IcoNode";let L=e=>{let{expandable:t=!1,defaultExpanded:n=!1,classesNames:r,nodeId:a="",expandWidth:i=10,label:o="",children:d=null,onToggle:u=()=>{}}=e,h=(0,s.useContext)(w),[m,x]=(0,s.useState)(!1);(0,s.useEffect)(()=>{m!=n&&x(n)},[n]);let _=(0,l.jsxs)("div",{className:(0,c.Z)(C().item,null==r?void 0:r.label,h.selected.indexOf(a)>-1&&[C().selected,null==r?void 0:r.selected]),role:"menuitem",children:[(0,l.jsx)(I,{expandWidth:i,expandable:t,expanded:m}),(0,l.jsx)(T,{children:o})]}),p=(0,l.jsxs)("details",{open:m,onToggle:e=>{let t=e.currentTarget;t&&(x(t.open),u())},className:C()["item-details"],role:"menu",children:[(0,l.jsx)("summary",{children:_}),m&&(0,l.jsx)("div",{"aria-hidden":!m,className:(0,c.Z)(t&&(null==r?void 0:r.group)),children:d})]});return(0,l.jsx)(l.Fragment,{children:t?p:_})},E=e=>{let{className:t,collapseIcon:n,expandIcon:r,selected:a,style:i,children:o,...d}=e,[u,h]=(0,s.useState)([]);return(0,s.useEffect)(()=>{h(a)},[a]),(0,l.jsx)("ul",{role:"tree",className:(0,c.Z)(C().tree,t),style:i,...d,children:(0,l.jsx)(N.Provider,{value:{collapseIcon:n,expandedIcon:r},children:(0,l.jsx)(w.Provider,{value:{selected:u},children:o})})})},M=e=>{let t=(0,s.useRef)({}),[n,l]=(0,s.useState)(""),r=(0,s.useCallback)(()=>{let t=[];for(let l of e){var n;let e=null==globalThis?void 0:null===(n=globalThis.document)||void 0===n?void 0:n.getElementById(l.hash);e&&t.push(e)}return t},[e]);return(0,s.useLayoutEffect)(()=>{let e=r(),n=n=>{t.current=n.reduce((e,t)=>(e[t.target.id]=t,e),t.current);let r=[];if(Object.keys(t.current).forEach(e=>{let n=t.current[e];n.isIntersecting&&r.push(n)}),1===r.length)l(r[0].target.id);else if(r.length>1){let t=t=>e.findIndex(e=>e.id===t),n=r.sort((e,n)=>t(e.target.id)-t(n.target.id));l(n[0].target.id)}},s=new IntersectionObserver(n,{rootMargin:"0px 0px -40% 0px"});return e.forEach(e=>s.observe(e)),()=>s.disconnect()},[r]),n};function B(e){return e.startsWith("#")?e.substring(1):e}function O(e){return e.startsWith("#")?e:"#"+e}let G=e=>{let{toc:t,ignoredDepth:n=[],indexingTitle:r="目录"}=e,a=(0,s.useMemo)(()=>(function(e){let t=[...e],n=[],l=t.shift();for(;l;)n.push(m().omit(l,["children"])),l.children&&t.push(...l.children),l=t.shift();return n})(t).map(e=>({hash:B(e.id)})),[t]),[i,o]=(0,s.useState)([]),c=M(a);(0,s.useEffect)(()=>{var e;c?o([B(c)]):o([B(null===(e=t[0])||void 0===e?void 0:e.id)])},[c,t]);let d=(0,s.useCallback)(e=>Array.isArray(e.children)?e.children.map(e=>u(e)):null,[]),u=(0,s.useCallback)(e=>n.includes(e.depth)?(0,l.jsx)(s.Fragment,{children:d(e)},e.id):(0,l.jsx)(L,{nodeId:e.id,classesNames:{label:b().label,group:b().group,selected:b().selected},label:(0,l.jsx)("a",{className:b().labelItem,href:O(e.id),onClick:t=>{t.preventDefault();try{var n;null===(n=document.querySelector(O(e.id)))||void 0===n||n.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}catch(e){}},children:e.value}),expandable:!!e.children,defaultExpanded:"#"==e.id,children:d(e)},e.id),[b()]);return t.length>0?(0,l.jsx)(E,{style:{flexGrow:1,maxWidth:200},className:b().tree,selected:i,collapseIcon:(0,l.jsx)("svg",{viewBox:"0 0 24 24",children:(0,l.jsx)("path",{fill:"currentColor",d:"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"})}),expandIcon:(0,l.jsx)("svg",{viewBox:"0 0 24 24",children:(0,l.jsx)("path",{fill:"currentColor",d:"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"})}),children:u({value:r,id:"#",children:t,depth:0})}):(0,l.jsx)(l.Fragment,{})},R=e=>{var t,n,r;let{avatar:s="",reference:a="",toc:i,ignoredDepth:o=[]}=e,[c,d]=a.split("|");return a?(0,l.jsxs)(f.Z,{appearance:"minimum",className:b().references,children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(v,{appearance:"circular",className:b().avatar,src:s,children:c}),(0,l.jsxs)("nav",{children:[(0,l.jsxs)("span",{style:{color:"#8590a6",fontSize:12},children:["首发于"," ",null===(t=null===(n=null===(r=null==d?void 0:d.split("https://"))||void 0===r?void 0:r.pop())||void 0===n?void 0:n.split(/\.(com|org|cn|io).*/iu))||void 0===t?void 0:t.shift()]}),(0,l.jsx)(y(),{href:d,children:c})]})]}),(0,l.jsx)(G,{toc:null!=i?i:[],ignoredDepth:o})]}):(0,l.jsx)(l.Fragment,{})};var F=n(4134),P=n.n(F),A=n(6023),z=n(4798),W=n(6309),D=n(3138),H=n(4768),Q=n(2736),q=n(2672),U=n(8143),X=n(6709);let V={ZhiHu_Zhuanlan:"zhuanlan.zhihu.com",JianShu:"www.jianshu.com",Bilibili:"www.bilibili.com",DouBan:"movie.douban.com",TieBa:"tieba.baidu.com",Weibo:"weibo.com",Godot:"docs.godotengine.org",Guancha:"user.guancha.cn",Github:"www.github.com"};function Y(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let l=[P().archivePost];return(0,c.Z)(...l,...t)}let J=e=>{switch(e){case V.ZhiHu_Zhuanlan:return Y(A.ZhiHu_Zhuanlan);case V.JianShu:return Y(z.JianShu);case V.Bilibili:return Y(W.Bilibili);case V.DouBan:return Y(D.Douban);case V.TieBa:return Y(H.TieBa);case V.Weibo:return Y(Q.Weibo);case V.Godot:return Y(q.Godot);case V.Guancha:return Y(U.Guancha);case V.Github:return Y(X.Github);default:return console.warn('unknown type "%s" for useType',e),Y()}},K=e=>{let{frontmatter:t,children:n,compiled:r}=e,{type:s,ignoredDepth:a=[],title:i}=t,{toc:o}=r,c=J(s);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:c,children:(0,l.jsxs)("div",{role:"article",children:[(0,l.jsx)("h1",{children:i}),(0,l.jsx)(R,{avatar:null==t?void 0:t.avatar,reference:(null==t?void 0:t.reference)||void 0,toc:o,ignoredDepth:a}),(0,l.jsx)("article",{children:n({Paper:e=>{let{children:t}=e;return(0,l.jsx)(l.Fragment,{children:t})}})})]})}),(0,l.jsx)("div",{className:"empty"})]})};var $=n(796),ee=n.n($),et=n(9132),en=n(4745);let el=function(e,t){let n=e.nextElementSibling;if(null!=n){for(var l;n&&!n.classList.contains(t.Tab);)n=n.nextElementSibling;null==n||null===(l=n.classList)||void 0===l||l.toggle(t.hidden)}e.classList.toggle(t.Expansioned)},er={Comment:()=>document.getElementById("Comment"),onOver:function(e){let t=this.Comment();if(!t)throw"";t.style.display="block",t.innerHTML=e},onOut:function(){let e=this.Comment();if(!e)throw"";e.style.display="none"}},es=e=>(0,l.jsx)("tbody",{...e}),ea=e=>{let{component:t="td",...n}=e;return(0,l.jsx)(t,{...n})},ei=e=>(0,l.jsx)("thead",{...e}),eo=e=>(0,l.jsx)("tr",{...e}),ec=e=>(0,l.jsx)("table",{...e}),ed=[],eu=function(e){ed=e},eh=s.createContext({load:async e=>void 0}),em=e=>{let[t,n]=s.useState(),{load:l}=s.useContext(eh);return s.useEffect(()=>{l(e).then(n)},[e,l]),t},ex=e=>{let{children:t,images:n}=e,r=s.useMemo(()=>n,[n]);return(0,l.jsx)(eh.Provider,{value:{load:async e=>{let t=r[parseInt(e.replace("@",""))-1],n="/images/graphics/".concat(t,".png"),l=new window.Image;return l.src=en.Z.site.baseUrl+n,new Promise((e,t)=>{l.onload=function(t){let l=t.target;e({src:n,width:l.naturalWidth,height:l.naturalHeight})},l.onerror=t})}},children:t})},e_=e=>{var t,n,r;let{children:a,title:i,...o}=e,c=null!==(r=null===(t=Array.from(null===(n=a[0])||void 0===n?void 0:n.cells))||void 0===t?void 0:t.length)&&void 0!==r?r:2;return(0,l.jsxs)(ec,{size:"small",...o,children:[i&&(0,l.jsx)(ei,{children:(0,l.jsx)(eo,{children:(0,l.jsx)(ea,{align:"center",colSpan:c,style:{fontSize:20},children:i})})}),(0,l.jsx)(es,{children:null==a?void 0:a.map((e,t)=>(0,l.jsx)(eo,{style:e.style,children:Array.from(e.cells).map((t,n)=>{let l=e.props?e.props[n]:{};return(0,s.createElement)(ea,{...l,component:e.component?e.component[n]:void 0,key:n,style:e.cellStyle},t)})},t))})]})},ep=e=>{let{children:t,expan:n,vicinage:r}=e,a=[ee().Tab];return n&&a.push(ee().hidden),r?(0,l.jsx)("div",{className:ee().Tab,vicinage:"true"}):t?(0,l.jsxs)(s.Fragment,{children:[(0,l.jsx)("div",{className:(0,c.Z)(a),children:t}),n&&(0,l.jsx)("br",{})]}):(0,l.jsx)("div",{className:(0,c.Z)(a)})},ev=e=>{let{children:t}=e;return(0,l.jsx)("div",{role:"expansion",className:ee().Expansion,onClick:e=>{el(e.currentTarget,ee())},children:t})},ef=e=>{let{children:t}=e;return(0,l.jsx)("div",{style:{width:"100%",textAlign:"center",margin:"0.5rem auto"},children:(0,l.jsx)("span",{className:ee().aphorism,children:t})})},ej=e=>{let{about:t,children:n}=e,[r,a]=(0,s.useState)(!1),i=em(t);return(0,l.jsxs)(et.fC,{open:r,onOpenChange:e=>{a(e)},children:[(0,l.jsx)(et.xz,{asChild:!0,children:(0,l.jsx)("span",{className:ee().ModelTrigger,children:n})}),(0,l.jsxs)(et.h_,{id:"model".concat(t),children:[(0,l.jsx)(et.aV,{className:ee().ModalOverlay,"data-theme":"dark"}),(0,l.jsx)(et.VY,{className:ee().ModalContent,"data-theme":"dark",children:i?(0,l.jsx)(o.Z,{alt:i.src,src:i.src,height:i.height,width:i.width,style:{maxWidth:"unset"}}):(0,l.jsx)(l.Fragment,{})})]})]})},ey=e=>{let{id:t,children:n}=e,r=()=>{ed[parseInt(t.replace("#",""))-1]?er.onOver(ed[parseInt(t.replace("#",""))-1]):er.onOver("Warn: no such Quote be found in ".concat(ed," at ").concat(t))},s=()=>er.onOut();return(0,l.jsx)("span",{className:ee().Quote,id:t,onMouseOver:r,onFocus:r,onMouseOut:s,onBlur:s,children:n})},eg=e=>{let{name:t,children:n}=e;return t||(t=(null==n?void 0:n.toString())||""),(0,l.jsx)("h3",{children:(0,l.jsx)("span",{name:t,children:n})})},eb={Tab:ep,Navigation:e=>(0,l.jsx)("nav",{...e}),Anchor:eg,Quote:ey,Model:ej,Expansion:ev,Aphorism:ef,Table:e_,TableBody:es,TableHead:ei,TableRow:eo,TableCell:ea,hr:e=>(0,l.jsx)("hr",{className:ee().hrStyle,...e}),a:e=>(0,l.jsx)("a",{className:ee().aStyle,...e})},ew=e=>{let{frontmatter:t,children:n,compiled:r}=e,{title:s,ImgList:a,QuoteList:i}=t;return eu(i),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:ee().graphicsPost,children:[(0,l.jsx)("h1",{children:(0,l.jsx)("a",{href:"#",title:"".concat(t.date),className:ee().titleStyle,children:s})}),(0,l.jsx)(ex,{images:a,children:n(eb)}),(0,l.jsx)("div",{id:"Comment",className:ee().Comment})]})})};ew.rootStyle=ee().mainStyle;let eN=e=>{let{frontmatter:t,children:n,compiled:r}=e,{title:s}=t;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"haskell-post",children:[(0,l.jsx)("h1",{children:s}),(0,l.jsx)("article",{children:n({})})]})})},eS=e=>{let{frontmatter:t,children:n,compiled:r}=e,{title:s}=t;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"math-post",children:[(0,l.jsx)("h1",{children:s}),(0,l.jsx)("article",{children:n({})})]})})};var eC=n(7603),eZ=n.n(eC);let ek={h3:e=>(0,l.jsx)("h3",{style:{margin:"20px 0 10px"},...e}),blockquote:e=>(0,l.jsx)("blockquote",{className:eZ().cblockquote,...e})},eT=e=>{let{frontmatter:t,children:n,compiled:r}=e,{title:s}=t;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:eZ().netPost,style:{maxWidth:"960px",fontFamily:"YaHei, Helvetica, arial, sans-serif",fontSize:"16px"},children:[(0,l.jsx)("h1",{children:s}),n(ek)]})})},eI=e=>{switch(e){case"archive":return[K];case"math":return[eS];case"network":return[eT];case"haskell":return[eN];case"graphics":return[ew,ew.rootStyle];default:return console.warn('unknown collection "%s" for render',e),[e=>{let{children:t}=e;return t({})}]}};var eL=n(5310),eE=n.n(eL);let eM=e=>(0,l.jsxs)("figure",{role:"figure",children:[(0,l.jsx)("span",{className:"resp-image-wrapper",style:{display:"flex",alignItems:"center",justifyContent:"center",position:"relative"},children:(0,l.jsx)(y(),{href:e.src||"/",target:"_blank",rel:"noopener",style:{display:"block"},children:(0,l.jsx)(o.Z,{...e,src:e.src||"",ext:""})})}),(0,l.jsx)("figcaption",{role:"figcaption",children:e.title||e.alt})]}),eB=e=>{let{href:t="/",...n}=e;return t.startsWith("/")?(0,l.jsx)(y(),{href:t,scroll:!1,legacyBehavior:!0,children:(0,l.jsx)("a",{...n})}):(0,l.jsx)("a",{rel:"noopener noreferrer external nofollow",target:"_blank",href:t,...n})};var eO=!0,eG=(0,d._)(function(e){let{post:t,compiled:{content:n,...r}}=e,[s,a]=i({code:n}),[o,h]=eI(t.collection);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(u.Z,{title:a.title,titleTemplate:"%s | ".concat(m().capitalize(t.collection))}),(0,l.jsx)(d.Z,{theme:"light",children:(0,l.jsx)("div",{className:(0,c.Z)(eE().Root,h),children:(0,l.jsx)(o,{frontmatter:a,compiled:r,children:e=>(0,l.jsx)(s,{components:{img:eM,a:eB,...e}})})})})]})})},3917:function(e){e.exports={"avatar-root":"style_avatar-root__IOcfb","avatar-image":"style_avatar-image__tkfqe","avatar-fallback":"style_avatar-fallback__9yCSp",circular:"style_circular__EsXbP"}},3723:function(e){e.exports={btn:"style_btn__g6gfm",subtle:"style_subtle__UH7MW",transparent:"style_transparent__Ws83c"}},6413:function(e){e.exports={"nav-root":"style_nav-root__yUsZa","nav-section":"style_nav-section__SjkNQ","nav-menus":"style_nav-menus__wdzNT","nav-trigger":"style_nav-trigger__QiQTA","nav-logo":"style_nav-logo__UiRaj","nav-surface":"style_nav-surface__siCSR",enterFromLeft:"style_enterFromLeft__DdlD8",enterFromRight:"style_enterFromRight__EgMqc",exitToLeft:"style_exitToLeft__nPx9y",exitToRight:"style_exitToRight__3hZoz","nav-indicator":"style_nav-indicator__4TCie",fadeIn:"style_fadeIn__EZrUw",fadeOut:"style_fadeOut__hvbdb","nav-viewport":"style_nav-viewport__kzckU",overviews:"style_overviews__mecdm",preview:"style_preview__ktXSm",item:"style_item__psGDu"}},287:function(e){e.exports={surface:"styles_surface__QwoSf","soft-surface":"styles_soft-surface__rQd7B","minimum-surface":"styles_minimum-surface__AW8qK"}},4134:function(e){e.exports={archivePost:"main_archivePost__7qW3k"}},5432:function(e){e.exports={tree:"style_tree__M2pbg",label:"style_label__bflHN",group:"style_group__IOAML",selected:"style_selected__tGovl",labelItem:"style_labelItem__zjqsf",references:"style_references___rUmU",avatar:"style_avatar__qL_0r"}},6309:function(e){e.exports={Bilibili:"bilibili_Bilibili__nEvQG"}},3138:function(e){e.exports={Douban:"douban_Douban__NnK8v"}},6709:function(e){e.exports={Github:"github_Github__X6Dnq"}},2672:function(e){e.exports={Godot:"godot_Godot__SQdR_"}},8143:function(e){e.exports={Guancha:"guancha_Guancha__BGMSJ"}},4798:function(e){e.exports={JianShu:"jianshu_JianShu__GBhc1"}},4768:function(e){e.exports={TieBa:"tieba_TieBa__A9O_x"}},2736:function(){},6023:function(e){e.exports={ZhiHu_Zhuanlan:"zhihu_ZhiHu_Zhuanlan__nsyM9"}},796:function(e){e.exports={mainStyle:"style_mainStyle__g_Xa0",graphicsPost:"style_graphicsPost__Uo92j",indexingStyle:"style_indexingStyle__aLRaJ",taglistsStyle:"style_taglistsStyle__Hr2F_",titleStyle:"style_titleStyle__6_03V",hrStyle:"style_hrStyle__tLveb",aStyle:"style_aStyle__bkSLo",Comment:"style_Comment__KAWRm",CommentAnima:"style_CommentAnima__RPhe3",ModelTrigger:"style_ModelTrigger__KRefm",ModalOverlay:"style_ModalOverlay__HDR_h",overlayShow:"style_overlayShow__ZOQKQ",ModalContent:"style_ModalContent__cHjig",contentShow:"style_contentShow__YlhpA",hide:"style_hide__0UfyK",aphorism:"style_aphorism__Sh_K5",Quote:"style_Quote__idZr_",Tab:"style_Tab__7rvXf",Expansion:"style_Expansion__rXLQa",Imgs:"style_Imgs__dxmOC",Expansioned:"style_Expansioned__exRDA",hidden:"style_hidden__GokL6"}},7603:function(e){e.exports={netPost:"styles_netPost__2AMMk",cblockquote:"styles_cblockquote__2f3wH"}},9013:function(e){e.exports={"item-details":"style_item-details__YnHxR",item:"style_item__n7JCB",selected:"style_selected__udQIR","icon-container":"style_icon-container__fd_n5"}},9484:function(e){e.exports={"in-tooltip":"style_in-tooltip__yl36M"}},5310:function(e){e.exports={Root:"collection_slug_Root__qGxja"}}},function(e){e.O(0,[662,57,664,121,675,460,774,888,179],function(){return e(e.s=3199)}),_N_E=e.O()}]);