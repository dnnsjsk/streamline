let e,n,t=!1,l=null,s=!1;const o="http://www.w3.org/1999/xlink",i={},r=e=>"object"==(e=typeof e)||"function"===e;function c(e){var n,t,l;return null!==(l=null===(t=null===(n=e.head)||void 0===n?void 0:n.querySelector('meta[name="csp-nonce"]'))||void 0===t?void 0:t.getAttribute("content"))&&void 0!==l?l:void 0}const u=(e,n,...t)=>{let l=null,s=null,o=!1,i=!1;const c=[],u=n=>{for(let t=0;t<n.length;t++)l=n[t],Array.isArray(l)?u(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!r(l))&&(l+=""),o&&i?c[c.length-1].t+=l:c.push(o?a(null,l):l),i=o)};if(u(t),n){n.key&&(s=n.key);{const e=n.className||n.class;e&&(n.class="object"!=typeof e?e:Object.keys(e).filter((n=>e[n])).join(" "))}}if("function"==typeof e)return e(null===n?{}:n,c,d);const f=a(e,null);return f.l=n,c.length>0&&(f.o=c),f.i=s,f},a=(e,n)=>({u:0,h:e,t:n,p:null,o:null,l:null,i:null}),f={},d={forEach:(e,n)=>e.map(h).forEach(n),map:(e,n)=>e.map(h).map(n).map(p)},h=e=>({vattrs:e.l,vchildren:e.o,vkey:e.i,vname:e.m,vtag:e.h,vtext:e.t}),p=e=>{if("function"==typeof e.vtag){const n=Object.assign({},e.vattrs);return e.vkey&&(n.key=e.vkey),e.vname&&(n.name=e.vname),u(e.vtag,n,...e.vchildren||[])}const n=a(e.vtag,e.vtext);return n.l=e.vattrs,n.o=e.vchildren,n.i=e.vkey,n.m=e.vname,n},y=e=>G(e).$,m=new WeakMap,$=e=>"sc-"+e.v,w=(e,n,t,l,s,i)=>{if(t!==l){let c=K(e,n),u=n.toLowerCase();if("class"===n){const n=e.classList,s=b(t),o=b(l);n.remove(...s.filter((e=>e&&!o.includes(e)))),n.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===n){for(const n in t)l&&null!=l[n]||(n.includes("-")?e.style.removeProperty(n):e.style[n]="");for(const n in l)t&&l[n]===t[n]||(n.includes("-")?e.style.setProperty(n,l[n]):e.style[n]=l[n])}else if("key"===n);else if("ref"===n)l&&l(e);else if(c||"o"!==n[0]||"n"!==n[1]){const a=r(l);if((c||a&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[n]=l;else{const s=null==l?"":l;"list"===n?c=!1:null!=t&&e[n]==s||(e[n]=s)}}catch(e){}let f=!1;u!==(u=u.replace(/^xlink\:?/,""))&&(n=u,f=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(n)||(f?e.removeAttributeNS(o,n):e.removeAttribute(n)):(!c||4&i||s)&&!a&&(l=!0===l?"":l,f?e.setAttributeNS(o,n,l):e.setAttribute(n,l))}else n="-"===n[2]?n.slice(3):K(ee,u)?u.slice(2):u[2]+n.slice(3),t&&te.rel(e,n,t,!1),l&&te.ael(e,n,l,!1)}},v=/\s/,b=e=>e?e.split(v):[],g=(e,n,t,l)=>{const s=11===n.p.nodeType&&n.p.host?n.p.host:n.p,o=e&&e.l||i,r=n.l||i;for(l in o)l in r||w(s,l,o[l],void 0,t,n.u);for(l in r)w(s,l,o[l],r[l],t,n.u)},j=(n,l,s)=>{const o=l.o[s];let i,r,c=0;if(null!==o.t)i=o.p=ne.createTextNode(o.t);else{if(t||(t="svg"===o.h),i=o.p=ne.createElementNS(t?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",o.h),t&&"foreignObject"===o.h&&(t=!1),g(null,o,t),null!=e&&i["s-si"]!==e&&i.classList.add(i["s-si"]=e),o.o)for(c=0;c<o.o.length;++c)r=j(n,o,c),r&&i.appendChild(r);"svg"===o.h?t=!1:"foreignObject"===i.tagName&&(t=!0)}return i},k=(e,t,l,s,o,i)=>{let r,c=e;for(c.shadowRoot&&c.tagName===n&&(c=c.shadowRoot);o<=i;++o)s[o]&&(r=j(null,l,o),r&&(s[o].p=r,c.insertBefore(r,t)))},S=(e,n,t,l,s)=>{for(;n<=t;++n)(l=e[n])&&(s=l.p,x(l),s.remove())},O=(e,n)=>e.h===n.h&&e.i===n.i,M=(e,n)=>{const l=n.p=e.p,s=e.o,o=n.o,i=n.h,r=n.t;null===r?(t="svg"===i||"foreignObject"!==i&&t,g(e,n,t),null!==s&&null!==o?((e,n,t,l)=>{let s,o,i=0,r=0,c=0,u=0,a=n.length-1,f=n[0],d=n[a],h=l.length-1,p=l[0],y=l[h];for(;i<=a&&r<=h;)if(null==f)f=n[++i];else if(null==d)d=n[--a];else if(null==p)p=l[++r];else if(null==y)y=l[--h];else if(O(f,p))M(f,p),f=n[++i],p=l[++r];else if(O(d,y))M(d,y),d=n[--a],y=l[--h];else if(O(f,y))M(f,y),e.insertBefore(f.p,d.p.nextSibling),f=n[++i],y=l[--h];else if(O(d,p))M(d,p),e.insertBefore(d.p,f.p),d=n[--a],p=l[++r];else{for(c=-1,u=i;u<=a;++u)if(n[u]&&null!==n[u].i&&n[u].i===p.i){c=u;break}c>=0?(o=n[c],o.h!==p.h?s=j(n&&n[r],t,c):(M(o,p),n[c]=void 0,s=o.p),p=l[++r]):(s=j(n&&n[r],t,r),p=l[++r]),s&&f.p.parentNode.insertBefore(s,f.p)}i>a?k(e,null==l[h+1]?null:l[h+1].p,t,l,r,h):r>h&&S(n,i,a)})(l,s,n,o):null!==o?(null!==e.t&&(l.textContent=""),k(l,null,n,o,0,o.length-1)):null!==s&&S(s,0,s.length-1),t&&"svg"===i&&(t=!1)):e.t!==r&&(l.data=r)},x=e=>{e.l&&e.l.ref&&e.l.ref(null),e.o&&e.o.map(x)},C=(e,n)=>{n&&!e.g&&n["s-p"]&&n["s-p"].push(new Promise((n=>e.g=n)))},P=(e,n)=>{if(e.u|=16,!(4&e.u))return C(e,e.j),fe((()=>E(e,n)));e.u|=512},E=(e,n)=>{const t=e.k;let l;return n&&(l=A(t,"componentWillLoad")),D(l,(()=>L(e,t,n)))},L=async(e,n,t)=>{const l=e.$,s=l["s-rc"];t&&(e=>{const n=e.S,t=e.$,l=n.u,s=((e,n)=>{var t;let l=$(n);const s=Z.get(l);if(e=11===e.nodeType?e:ne,s)if("string"==typeof s){let n,o=m.get(e=e.head||e);if(o||m.set(e,o=new Set),!o.has(l)){{n=ne.createElement("style"),n.innerHTML=s;const l=null!==(t=te.O)&&void 0!==t?t:c(ne);null!=l&&n.setAttribute("nonce",l),e.insertBefore(n,e.querySelector("link"))}o&&o.add(l)}}else e.adoptedStyleSheets.includes(s)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,s]);return l})(t.shadowRoot?t.shadowRoot:t.getRootNode(),n);10&l&&(t["s-sc"]=s,t.classList.add(s+"-h"))})(e);N(e,n),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const n=l["s-p"],t=()=>T(e);0===n.length?t():(Promise.all(n).then(t),e.u|=4,n.length=0)}},N=(t,s)=>{try{l=s,s=s.render(),t.u&=-17,t.u|=2,((t,l)=>{const s=t.$,o=t.S,i=t.M||a(null,null),r=(e=>e&&e.h===f)(l)?l:u(null,null,l);n=s.tagName,o.C&&(r.l=r.l||{},o.C.map((([e,n])=>r.l[n]=s[e]))),r.h=null,r.u|=4,t.M=r,r.p=i.p=s.shadowRoot||s,e=s["s-sc"],M(i,r)})(t,s)}catch(e){Q(e,t.$)}return l=null,null},R=()=>l,T=e=>{const n=e.$,t=e.k,l=e.j;A(t,"componentDidRender"),64&e.u?A(t,"componentDidUpdate"):(e.u|=64,F(n),e.P(n),l||W()),e.L(n),e.g&&(e.g(),e.g=void 0),512&e.u&&ae((()=>P(e,!1))),e.u&=-517},U=e=>{{const n=G(e),t=n.$.isConnected;return t&&2==(18&n.u)&&P(n,!1),t}},W=()=>{F(ne.documentElement),ae((()=>(e=>{const n=te.ce("appload",{detail:{namespace:"streamline"}});return e.dispatchEvent(n),n})(ee)))},A=(e,n,t)=>{if(e&&e[n])try{return e[n](t)}catch(e){Q(e)}},D=(e,n)=>e&&e.then?e.then(n):n(),F=e=>e.classList.add("hydrated"),H=(e,n,t)=>{if(n.N){e.watchers&&(n.R=e.watchers);const l=Object.entries(n.N),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&t&&32&l?Object.defineProperty(s,e,{get(){return((e,n)=>G(this).T.get(n))(0,e)},set(t){((e,n,t,l)=>{const s=G(e),o=s.$,i=s.T.get(n),c=s.u,u=s.k;if(t=((e,n)=>null==e||r(e)?e:4&n?"false"!==e&&(""===e||!!e):1&n?e+"":e)(t,l.N[n][0]),(!(8&c)||void 0===i)&&t!==i&&(!Number.isNaN(i)||!Number.isNaN(t))&&(s.T.set(n,t),u)){if(l.R&&128&c){const e=l.R[n];e&&e.map((e=>{try{u[e](t,i,n)}catch(e){Q(e,o)}}))}2==(18&c)&&P(s,!1)}})(this,e,t,n)},configurable:!0,enumerable:!0}):1&t&&64&l&&Object.defineProperty(s,e,{value(...n){const t=G(this);return t.U.then((()=>t.k[e](...n)))}})})),1&t){const t=new Map;s.attributeChangedCallback=function(e,n,l){te.jmp((()=>{const n=t.get(e);if(this.hasOwnProperty(n))l=this[n],delete this[n];else if(s.hasOwnProperty(n)&&"number"==typeof this[n]&&this[n]==l)return;this[n]=(null!==l||"boolean"!=typeof this[n])&&l}))},e.observedAttributes=l.filter((([e,n])=>15&n[0])).map((([e,l])=>{const s=l[1]||e;return t.set(s,e),512&l[0]&&n.C.push([e,s]),s}))}}return e},q=e=>{A(e,"connectedCallback")},V=(e,n={})=>{var t;const l=[],s=n.exclude||[],o=ee.customElements,i=ne.head,r=i.querySelector("meta[charset]"),u=ne.createElement("style"),a=[];let f,d=!0;Object.assign(te,n),te.W=new URL(n.resourcesUrl||"./",ne.baseURI).href,e.map((e=>{e[1].map((n=>{const t={u:n[0],v:n[1],N:n[2],A:n[3]};t.N=n[2],t.C=[],t.R={};const i=t.v,r=class extends HTMLElement{constructor(e){super(e),J(e=this,t),1&t.u&&e.attachShadow({mode:"open"})}connectedCallback(){f&&(clearTimeout(f),f=null),d?a.push(this):te.jmp((()=>(e=>{if(0==(1&te.u)){const n=G(e),t=n.S,l=()=>{};if(1&n.u)q(n.k);else{n.u|=1;{let t=e;for(;t=t.parentNode||t.host;)if(t["s-p"]){C(n,n.j=t);break}}t.N&&Object.entries(t.N).map((([n,[t]])=>{if(31&t&&e.hasOwnProperty(n)){const t=e[n];delete e[n],e[n]=t}})),(async(e,n,t,l,s)=>{if(0==(32&n.u)){{if(n.u|=32,(s=Y(t)).then){const e=()=>{};s=await s,e()}s.isProxied||(t.R=s.watchers,H(s,t,2),s.isProxied=!0);const e=()=>{};n.u|=8;try{new s(n)}catch(e){Q(e)}n.u&=-9,n.u|=128,e(),q(n.k)}if(s.style){let e=s.style;const n=$(t);if(!Z.has(n)){const l=()=>{};((e,n,t)=>{let l=Z.get(e);se&&t?(l=l||new CSSStyleSheet,"string"==typeof l?l=n:l.replaceSync(n)):l=n,Z.set(e,l)})(n,e,!!(1&t.u)),l()}}}const o=n.j,i=()=>P(n,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,n,t)}l()}})(this)))}disconnectedCallback(){te.jmp((()=>{}))}componentOnReady(){return G(this).D}};t.F=e[0],s.includes(i)||o.get(i)||(l.push(i),o.define(i,H(r,t,1)))}))}));{u.innerHTML=l+"{visibility:hidden}.hydrated{visibility:inherit}",u.setAttribute("data-styles","");const e=null!==(t=te.O)&&void 0!==t?t:c(ne);null!=e&&u.setAttribute("nonce",e),i.insertBefore(u,r?r.nextSibling:i.firstChild)}d=!1,a.length?a.map((e=>e.connectedCallback())):te.jmp((()=>f=setTimeout(W,30)))},_=(e,n)=>n,z=e=>te.O=e,B=new WeakMap,G=e=>B.get(e),I=(e,n)=>B.set(n.k=e,n),J=(e,n)=>{const t={u:0,$:e,S:n,T:new Map};return t.U=new Promise((e=>t.L=e)),t.D=new Promise((e=>t.P=e)),e["s-p"]=[],e["s-rc"]=[],B.set(e,t)},K=(e,n)=>n in e,Q=(e,n)=>(0,console.error)(e,n),X=new Map,Y=e=>{const n=e.v.replace(/-/g,"_"),t=e.F,l=X.get(t);return l?l[n]:import(`./${t}.entry.js`).then((e=>(X.set(t,e),e[n])),Q)
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/},Z=new Map,ee="undefined"!=typeof window?window:{},ne=ee.document||{head:{}},te={u:0,W:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,n,t,l)=>e.addEventListener(n,t,l),rel:(e,n,t,l)=>e.removeEventListener(n,t,l),ce:(e,n)=>new CustomEvent(e,n)},le=e=>Promise.resolve(e),se=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replaceSync}catch(e){}return!1})(),oe=[],ie=[],re=(e,n)=>t=>{e.push(t),s||(s=!0,n&&4&te.u?ae(ue):te.raf(ue))},ce=e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(e){Q(e)}e.length=0},ue=()=>{ce(oe),ce(ie),(s=oe.length>0)&&te.raf(ue)},ae=e=>le().then(e),fe=re(ie,!0);export{_ as F,f as H,y as a,V as b,U as f,R as g,u as h,le as p,I as r,z as s}