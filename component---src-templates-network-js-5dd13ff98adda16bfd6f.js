(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{JhBU:function(e,t,n){e.exports={netPost:"style-module--netPost--2lUUb",cblockquote:"style-module--cblockquote--3N1Cj"}},hbLm:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var r=n("q1tI"),a=n.n(r),l=n("I/Ru"),o=n("vrFN"),i=n("wZjt"),u=n("+NrZ"),s=n("7ljp"),d=n("A2+M"),c=n("JhBU"),f=n.n(c),m={h3:function(e){return a.a.createElement("h3",Object.assign({style:{margin:"20px 0 10px"}},e))},blockquote:function(e){return a.a.createElement("blockquote",Object.assign({className:f.a.cblockquote},e))}};function v(e){var t=e.data,n=t.mdx,r=t.headerIamge,c=t.allMdx,v=n.frontmatter,g=n.body,p=n.fields,b=p.slug==="/"+p.templateTag?"Network-Top2Down":v.title;return a.a.createElement(l.a,{header:{style:{backgroundImage:"url("+r.childImageSharp.fluid.src+")",backgroundSize:"cover"}}},a.a.createElement(o.a,{title:b,config:{titleTemplate:p.slug==="/"+p.templateTag?"%s":"%s | Network-Top2Down"}}),a.a.createElement("div",{className:f.a.netPost,style:{maxWidth:"960px",fontFamily:"YaHei, Helvetica, arial, sans-serif",fontSize:"16px"}},a.a.createElement("h1",null,v.title),a.a.createElement(i.a,{slug:p.slug,data:null==c?void 0:c.edges}),a.a.createElement(u.a,{tags:v.tags}),a.a.createElement(s.MDXProvider,{components:m},a.a.createElement(d.MDXRenderer,null,g))))}},wZjt:function(e,t,n){"use strict";var r=n("zLVn"),a=n("Wbzz"),l=n("q1tI"),o=n.n(l),i=n("17x9"),u=n.n(i);function s(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function c(e){return void 0===e&&(e={fields:{slug:"/"},frontmatter:{title:"首页",index:-1}}),e}function f(e,t){void 0===t&&(t=10);var n=e.substr(0,t);return e.length>t&&(n+="...",n+=e.substr(Math.max(n.length+6,e.length-t))),n}var m=function(e){var t,n,l=e.slug,i=e.data,u=Object(r.a)(e,["slug","data"]),d=function(e,t){if(e)for(var n,r=s(e);!(n=r()).done;){var a,l,o=n.value.node;if(t===(null==o||null===(a=o.fields)||void 0===a?void 0:a.slug))return(null==o||null===(l=o.frontmatter)||void 0===l?void 0:l.index)-1}return-1}(i=function(e){return Array.from(e).filter((function(e){var t,n,r;return(null==e||null===(t=e.node)||void 0===t||null===(n=t.frontmatter)||void 0===n||null===(r=n.index)||void 0===r?void 0:r.toString().indexOf("."))<0}))}(i),l),m=c(function(e,t){var n;if(e)return null===(n=e[t-1])||void 0===n?void 0:n.node}(i,d)),v=c(function(e,t){var n;if(e)return null===(n=e[t+1])||void 0===n?void 0:n.node}(i,d));return d>-1&&o.a.createElement("div",Object.assign({style:{width:"100%",display:"flex",justifyContent:"space-between"}},u),o.a.createElement(a.Link,{to:m.fields.slug,name:"previous"},"<-",f(m.frontmatter.title),"-"),o.a.createElement(a.Link,{to:null==v||null===(t=v.fields)||void 0===t?void 0:t.slug,name:"previous"},"-",f(null==v||null===(n=v.frontmatter)||void 0===n?void 0:n.title)," ->"))};m.PropType={data:u.a.array,slug:u.a.string},t.a=m}}]);
//# sourceMappingURL=component---src-templates-network-js-5dd13ff98adda16bfd6f.js.map