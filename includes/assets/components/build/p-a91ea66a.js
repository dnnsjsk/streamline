let e,n,t=!1,l=null,o=!1;const s="http://www.w3.org/1999/xlink",i={},r=e=>"object"==(e=typeof e)||"function"===e;function c(e){var n,t,l;return null!==(l=null===(t=null===(n=e.head)||void 0===n?void 0:n.querySelector('meta[name="csp-nonce"]'))||void 0===t?void 0:t.getAttribute("content"))&&void 0!==l?l:void 0}const u=(e,n,...t)=>{let l=null,o=null,s=!1,i=!1;const c=[],u=n=>{for(let t=0;t<n.length;t++)l=n[t],Array.isArray(l)?u(l):null!=l&&"boolean"!=typeof l&&((s="function"!=typeof e&&!r(l))&&(l+=""),s&&i?c[c.length-1].t+=l:c.push(s?a(null,l):l),i=s)};if(u(t),n){n.key&&(o=n.key);{const e=n.className||n.class;e&&(n.class="object"!=typeof e?e:Object.keys(e).filter((n=>e[n])).join(" "))}}if("function"==typeof e)return e(null===n?{}:n,c,d);const f=a(e,null);return f.l=n,c.length>0&&(f.o=c),f.i=o,f},a=(e,n)=>({u:0,h:e,t:n,p:null,o:null,l:null,i:null}),f={},d={forEach:(e,n)=>e.map(h).forEach(n),map:(e,n)=>e.map(h).map(n).map(p)},h=e=>({vattrs:e.l,vchildren:e.o,vkey:e.i,vname:e.m,vtag:e.h,vtext:e.t}),p=e=>{if("function"==typeof e.vtag){const n=Object.assign({},e.vattrs);return e.vkey&&(n.key=e.vkey),e.vname&&(n.name=e.vname),u(e.vtag,n,...e.vchildren||[])}const n=a(e.vtag,e.vtext);return n.l=e.vattrs,n.o=e.vchildren,n.i=e.vkey,n.m=e.vname,n},y=e=>B(e).$,m=new WeakMap,$=e=>"sc-"+e.v,w=(e,n,t,l,o,i)=>{if(t!==l){let c=J(e,n),u=n.toLowerCase();if("class"===n){const n=e.classList,o=b(t),s=b(l);n.remove(...o.filter((e=>e&&!s.includes(e)))),n.add(...s.filter((e=>e&&!o.includes(e))))}else if("style"===n){for(const n in t)l&&null!=l[n]||(n.includes("-")?e.style.removeProperty(n):e.style[n]="");for(const n in l)t&&l[n]===t[n]||(n.includes("-")?e.style.setProperty(n,l[n]):e.style[n]=l[n])}else if("key"===n);else if("ref"===n)l&&l(e);else if(c||"o"!==n[0]||"n"!==n[1]){const a=r(l);if((c||a&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[n]=l;else{const o=null==l?"":l;"list"===n?c=!1:null!=t&&e[n]==o||(e[n]=o)}}catch(e){}let f=!1;u!==(u=u.replace(/^xlink\:?/,""))&&(n=u,f=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(n)||(f?e.removeAttributeNS(s,n):e.removeAttribute(n)):(!c||4&i||o)&&!a&&(l=!0===l?"":l,f?e.setAttributeNS(s,n,l):e.setAttribute(n,l))}else n="-"===n[2]?n.slice(3):J(Z,u)?u.slice(2):u[2]+n.slice(3),t&&ne.rel(e,n,t,!1),l&&ne.ael(e,n,l,!1)}},v=/\s/,b=e=>e?e.split(v):[],g=(e,n,t,l)=>{const o=11===n.p.nodeType&&n.p.host?n.p.host:n.p,s=e&&e.l||i,r=n.l||i;for(l in s)l in r||w(o,l,s[l],void 0,t,n.u);for(l in r)w(o,l,s[l],r[l],t,n.u)},j=(n,l,o)=>{const s=l.o[o];let i,r,c=0;if(null!==s.t)i=s.p=ee.createTextNode(s.t);else{if(t||(t="svg"===s.h),i=s.p=ee.createElementNS(t?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",s.h),t&&"foreignObject"===s.h&&(t=!1),g(null,s,t),null!=e&&i["s-si"]!==e&&i.classList.add(i["s-si"]=e),s.o)for(c=0;c<s.o.length;++c)r=j(n,s,c),r&&i.appendChild(r);"svg"===s.h?t=!1:"foreignObject"===i.tagName&&(t=!0)}return i},k=(e,t,l,o,s,i)=>{let r,c=e;for(c.shadowRoot&&c.tagName===n&&(c=c.shadowRoot);s<=i;++s)o[s]&&(r=j(null,l,s),r&&(o[s].p=r,c.insertBefore(r,t)))},S=(e,n,t,l,o)=>{for(;n<=t;++n)(l=e[n])&&(o=l.p,x(l),o.remove())},O=(e,n)=>e.h===n.h&&e.i===n.i,M=(e,n)=>{const l=n.p=e.p,o=e.o,s=n.o,i=n.h,r=n.t;null===r?(t="svg"===i||"foreignObject"!==i&&t,g(e,n,t),null!==o&&null!==s?((e,n,t,l)=>{let o,s,i=0,r=0,c=0,u=0,a=n.length-1,f=n[0],d=n[a],h=l.length-1,p=l[0],y=l[h];for(;i<=a&&r<=h;)if(null==f)f=n[++i];else if(null==d)d=n[--a];else if(null==p)p=l[++r];else if(null==y)y=l[--h];else if(O(f,p))M(f,p),f=n[++i],p=l[++r];else if(O(d,y))M(d,y),d=n[--a],y=l[--h];else if(O(f,y))M(f,y),e.insertBefore(f.p,d.p.nextSibling),f=n[++i],y=l[--h];else if(O(d,p))M(d,p),e.insertBefore(d.p,f.p),d=n[--a],p=l[++r];else{for(c=-1,u=i;u<=a;++u)if(n[u]&&null!==n[u].i&&n[u].i===p.i){c=u;break}c>=0?(s=n[c],s.h!==p.h?o=j(n&&n[r],t,c):(M(s,p),n[c]=void 0,o=s.p),p=l[++r]):(o=j(n&&n[r],t,r),p=l[++r]),o&&f.p.parentNode.insertBefore(o,f.p)}i>a?k(e,null==l[h+1]?null:l[h+1].p,t,l,r,h):r>h&&S(n,i,a)})(l,o,n,s):null!==s?(null!==e.t&&(l.textContent=""),k(l,null,n,s,0,s.length-1)):null!==o&&S(o,0,o.length-1),t&&"svg"===i&&(t=!1)):e.t!==r&&(l.data=r)},x=e=>{e.l&&e.l.ref&&e.l.ref(null),e.o&&e.o.map(x)},C=(e,n)=>{n&&!e.g&&n["s-p"]&&n["s-p"].push(new Promise((n=>e.g=n)))},P=(e,n)=>{if(e.u|=16,!(4&e.u))return C(e,e.j),ae((()=>E(e,n)));e.u|=512},E=(e,n)=>{const t=e.k;let l;return n&&(l=A(t,"componentWillLoad")),D(l,(()=>L(e,t,n)))},L=async(e,n,t)=>{const l=e.$,o=l["s-rc"];t&&(e=>{const n=e.S,t=e.$,l=n.u,o=((e,n)=>{var t;let l=$(n);const o=Y.get(l);if(e=11===e.nodeType?e:ee,o)if("string"==typeof o){let n,s=m.get(e=e.head||e);if(s||m.set(e,s=new Set),!s.has(l)){{n=ee.createElement("style"),n.innerHTML=o;const l=null!==(t=ne.O)&&void 0!==t?t:c(ee);null!=l&&n.setAttribute("nonce",l),e.insertBefore(n,e.querySelector("link"))}s&&s.add(l)}}else e.adoptedStyleSheets.includes(o)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,o]);return l})(t.shadowRoot?t.shadowRoot:t.getRootNode(),n);10&l&&(t["s-sc"]=o,t.classList.add(o+"-h"))})(e);N(e,n),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const n=l["s-p"],t=()=>T(e);0===n.length?t():(Promise.all(n).then(t),e.u|=4,n.length=0)}},N=(t,o)=>{try{l=o,o=o.render(),t.u&=-17,t.u|=2,((t,l)=>{const o=t.$,s=t.S,i=t.M||a(null,null),r=(e=>e&&e.h===f)(l)?l:u(null,null,l);n=o.tagName,s.C&&(r.l=r.l||{},s.C.map((([e,n])=>r.l[n]=o[e]))),r.h=null,r.u|=4,t.M=r,r.p=i.p=o.shadowRoot||o,e=o["s-sc"],M(i,r)})(t,o)}catch(e){K(e,t.$)}return l=null,null},R=()=>l,T=e=>{const n=e.$,t=e.k,l=e.j;A(t,"componentDidRender"),64&e.u?A(t,"componentDidUpdate"):(e.u|=64,H(n),e.P(n),l||W()),e.L(n),e.g&&(e.g(),e.g=void 0),512&e.u&&ue((()=>P(e,!1))),e.u&=-517},U=e=>{{const n=B(e),t=n.$.isConnected;return t&&2==(18&n.u)&&P(n,!1),t}},W=()=>{H(ee.documentElement),ue((()=>(e=>{const n=ne.ce("appload",{detail:{namespace:"streamline"}});return e.dispatchEvent(n),n})(Z)))},A=(e,n,t)=>{if(e&&e[n])try{return e[n](t)}catch(e){K(e)}},D=(e,n)=>e&&e.then?e.then(n):n(),H=e=>e.classList.add("hydrated"),q=(e,n,t)=>{if(n.N){e.watchers&&(n.R=e.watchers);const l=Object.entries(n.N),o=e.prototype;if(l.map((([e,[l]])=>{31&l||2&t&&32&l?Object.defineProperty(o,e,{get(){return((e,n)=>B(this).T.get(n))(0,e)},set(t){((e,n,t,l)=>{const o=B(e),s=o.$,i=o.T.get(n),c=o.u,u=o.k;if(t=((e,n)=>null==e||r(e)?e:4&n?"false"!==e&&(""===e||!!e):1&n?e+"":e)(t,l.N[n][0]),(!(8&c)||void 0===i)&&t!==i&&(!Number.isNaN(i)||!Number.isNaN(t))&&(o.T.set(n,t),u)){if(l.R&&128&c){const e=l.R[n];e&&e.map((e=>{try{u[e](t,i,n)}catch(e){K(e,s)}}))}2==(18&c)&&P(o,!1)}})(this,e,t,n)},configurable:!0,enumerable:!0}):1&t&&64&l&&Object.defineProperty(o,e,{value(...n){const t=B(this);return t.U.then((()=>t.k[e](...n)))}})})),1&t){const t=new Map;o.attributeChangedCallback=function(e,n,l){ne.jmp((()=>{const n=t.get(e);if(this.hasOwnProperty(n))l=this[n],delete this[n];else if(o.hasOwnProperty(n)&&"number"==typeof this[n]&&this[n]==l)return;this[n]=(null!==l||"boolean"!=typeof this[n])&&l}))},e.observedAttributes=l.filter((([e,n])=>15&n[0])).map((([e,l])=>{const o=l[1]||e;return t.set(o,e),512&l[0]&&n.C.push([e,o]),o}))}}return e},F=e=>{A(e,"connectedCallback")},V=(e,n={})=>{var t;const l=[],o=n.exclude||[],s=Z.customElements,i=ee.head,r=i.querySelector("meta[charset]"),u=ee.createElement("style"),a=[];let f,d=!0;Object.assign(ne,n),ne.W=new URL(n.resourcesUrl||"./",ee.baseURI).href,e.map((e=>{e[1].map((n=>{const t={u:n[0],v:n[1],N:n[2],A:n[3]};t.N=n[2],t.C=[],t.R={};const i=t.v,r=class extends HTMLElement{constructor(e){super(e),I(e=this,t),1&t.u&&e.attachShadow({mode:"open"})}connectedCallback(){f&&(clearTimeout(f),f=null),d?a.push(this):ne.jmp((()=>(e=>{if(0==(1&ne.u)){const n=B(e),t=n.S,l=()=>{};if(1&n.u)F(n.k);else{n.u|=1;{let t=e;for(;t=t.parentNode||t.host;)if(t["s-p"]){C(n,n.j=t);break}}t.N&&Object.entries(t.N).map((([n,[t]])=>{if(31&t&&e.hasOwnProperty(n)){const t=e[n];delete e[n],e[n]=t}})),(async(e,n,t,l,o)=>{if(0==(32&n.u)){{if(n.u|=32,(o=X(t)).then){const e=()=>{};o=await o,e()}o.isProxied||(t.R=o.watchers,q(o,t,2),o.isProxied=!0);const e=()=>{};n.u|=8;try{new o(n)}catch(e){K(e)}n.u&=-9,n.u|=128,e(),F(n.k)}if(o.style){let e=o.style;const n=$(t);if(!Y.has(n)){const l=()=>{};((e,n,t)=>{let l=Y.get(e);le&&t?(l=l||new CSSStyleSheet,"string"==typeof l?l=n:l.replaceSync(n)):l=n,Y.set(e,l)})(n,e,!!(1&t.u)),l()}}}const s=n.j,i=()=>P(n,!0);s&&s["s-rc"]?s["s-rc"].push(i):i()})(0,n,t)}l()}})(this)))}disconnectedCallback(){ne.jmp((()=>{}))}componentOnReady(){return B(this).D}};t.H=e[0],o.includes(i)||s.get(i)||(l.push(i),s.define(i,q(r,t,1)))}))}));{u.innerHTML=l+"{visibility:hidden}.hydrated{visibility:inherit}",u.setAttribute("data-styles","");const e=null!==(t=ne.O)&&void 0!==t?t:c(ee);null!=e&&u.setAttribute("nonce",e),i.insertBefore(u,r?r.nextSibling:i.firstChild)}d=!1,a.length?a.map((e=>e.connectedCallback())):ne.jmp((()=>f=setTimeout(W,30)))},_=e=>ne.O=e,z=new WeakMap,B=e=>z.get(e),G=(e,n)=>z.set(n.k=e,n),I=(e,n)=>{const t={u:0,$:e,S:n,T:new Map};return t.U=new Promise((e=>t.L=e)),t.D=new Promise((e=>t.P=e)),e["s-p"]=[],e["s-rc"]=[],z.set(e,t)},J=(e,n)=>n in e,K=(e,n)=>(0,console.error)(e,n),Q=new Map,X=e=>{const n=e.v.replace(/-/g,"_"),t=e.H,l=Q.get(t);return l?l[n]:import(`./${t}.entry.js`).then((e=>(Q.set(t,e),e[n])),K)
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/},Y=new Map,Z="undefined"!=typeof window?window:{},ee=Z.document||{head:{}},ne={u:0,W:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,n,t,l)=>e.addEventListener(n,t,l),rel:(e,n,t,l)=>e.removeEventListener(n,t,l),ce:(e,n)=>new CustomEvent(e,n)},te=e=>Promise.resolve(e),le=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replaceSync}catch(e){}return!1})(),oe=[],se=[],ie=(e,n)=>t=>{e.push(t),o||(o=!0,n&&4&ne.u?ue(ce):ne.raf(ce))},re=e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(e){K(e)}e.length=0},ce=()=>{re(oe),re(se),(o=oe.length>0)&&ne.raf(ce)},ue=e=>te().then(e),ae=ie(se,!0);export{f as H,y as a,V as b,U as f,R as g,u as h,te as p,G as r,_ as s}