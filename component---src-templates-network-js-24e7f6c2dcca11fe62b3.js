"use strict";(self.webpackChunkgatsby_website=self.webpackChunkgatsby_website||[]).push([[846],{9046:function(e,t,n){var r=n(5245),l=n(5444),a=n(7294),o=["slug","data"];function i(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function s(e){return void 0===e&&(e={fields:{slug:"/"},frontmatter:{title:"首页",index:-1}}),e}function d(e,t){void 0===t&&(t=10);var n=e.substr(0,t);return e.length>t&&(n+="...",n+=e.substr(Math.max(n.length+6,e.length-t))),n}t.Z=function(e){var t,n,u=e.slug,c=e.data,f=(0,r.Z)(e,o),m=function(e,t){if(e)for(var n,r=i(e);!(n=r()).done;){var l,a,o=n.value.node;if(t===(null==o||null===(l=o.fields)||void 0===l?void 0:l.slug))return(null==o||null===(a=o.frontmatter)||void 0===a?void 0:a.index)-1}return-1}(c=function(e){return Array.from(e).filter((function(e){var t,n,r;return(null==e||null===(t=e.node)||void 0===t||null===(n=t.frontmatter)||void 0===n||null===(r=n.index)||void 0===r?void 0:r.toString().indexOf("."))<0}))}(c),u),v=s(function(e,t){var n;if(e)return null===(n=e[t-1])||void 0===n?void 0:n.node}(c,m)),g=s(function(e,t){var n;if(e)return null===(n=e[t+1])||void 0===n?void 0:n.node}(c,m));return m>-1?a.createElement("div",Object.assign({style:{width:"100%",display:"flex",justifyContent:"space-between"}},f),a.createElement(l.Link,{to:v.fields.slug,name:"previous"},"<-",d(v.frontmatter.title),"-"),a.createElement(l.Link,{to:null==g||null===(t=g.fields)||void 0===t?void 0:t.slug,name:"previous"},"-",d(null==g||null===(n=g.frontmatter)||void 0===n?void 0:n.title)," ->")):a.createElement(a.Fragment,null)}},3663:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var r=n(4983),l=n(6802),a=n(1274),o=n(7294),i=n(9046),u=n(3372),s=n(9470),d=n(1839),c={h3:function(e){return o.createElement("h3",Object.assign({style:{margin:"20px 0 10px"}},e))},blockquote:function(e){return o.createElement("blockquote",Object.assign({className:"style-module--cblockquote--3dEHt"},e))}};function f(e){var t=e.data,n=t.mdx,f=t.headerIamge,m=t.allMdx,v=n.frontmatter,g=n.body,b=n.fields,p=b.slug==="/"+b.templateTag?"Network-Top2Down":v.title;return o.createElement(u.Z,{header:{style:{backgroundImage:"url("+(0,l.e)(f.childImageSharp)+")",backgroundSize:"cover"}}},o.createElement(s.Z,{title:p,config:{titleTemplate:b.slug==="/"+b.templateTag?"%s":"%s | Network-Top2Down"}}),o.createElement("div",{className:"style-module--netPost--3ipfI",style:{maxWidth:"960px",fontFamily:"YaHei, Helvetica, arial, sans-serif",fontSize:"16px"}},o.createElement("h1",null,v.title),o.createElement(i.Z,{slug:b.slug,data:null==m?void 0:m.edges}),o.createElement(d.Z,{tags:v.tags}),o.createElement(r.MDXProvider,{components:c},o.createElement(a.MDXRenderer,null,g))))}}}]);
//# sourceMappingURL=component---src-templates-network-js-24e7f6c2dcca11fe62b3.js.map