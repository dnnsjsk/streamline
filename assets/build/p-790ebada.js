let e,t,n=!1,l=null,s=!1;const o="undefined"!=typeof window?window:{},i=o.document||{head:{}},r={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),a=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),u=new WeakMap,f=e=>"sc-"+e.o,d={},$=e=>"object"==(e=typeof e)||"function"===e,y=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1,r=[];const c=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?c(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!$(l))&&(l+=""),o&&i?r[r.length-1].i+=l:r.push(o?h(null,l):l),i=o)};if(c(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}const a=h(e,null);return a.u=t,r.length>0&&(a.$=r),a.h=s,a},h=(e,t)=>({t:0,p:e,i:t,m:null,$:null,u:null,h:null}),p={},m=(e,t,n,l,s,i)=>{if(n!==l){let c=G(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,s=b(n),o=b(l);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("key"===t);else if(c||"o"!==t[0]||"n"!==t[1]){const o=$(l);if((c||o&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?c=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}null==l||!1===l?!1===l&&""!==e.getAttribute(t)||e.removeAttribute(t):(!c||4&i||s)&&!o&&e.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):G(o,a)?a.slice(2):a[2]+t.slice(3),n&&r.rel(e,t,n,!1),l&&r.ael(e,t,l,!1)}},w=/\s/,b=e=>e?e.split(w):[],g=(e,t,n,l)=>{const s=11===t.m.nodeType&&t.m.host?t.m.host:t.m,o=e&&e.u||d,i=t.u||d;for(l in o)l in i||m(s,l,o[l],void 0,n,t.t);for(l in i)m(s,l,o[l],i[l],n,t.t)},v=(t,l,s)=>{let o,r,c=l.$[s],a=0;if(null!==c.i)o=c.m=i.createTextNode(c.i);else{if(n||(n="svg"===c.p),o=c.m=i.createElementNS(n?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",c.p),n&&"foreignObject"===c.p&&(n=!1),g(null,c,n),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),c.$)for(a=0;a<c.$.length;++a)r=v(t,c,a),r&&o.appendChild(r);"svg"===c.p?n=!1:"foreignObject"===o.tagName&&(n=!0)}return o},S=(e,n,l,s,o,i)=>{let r,c=e;for(c.shadowRoot&&c.tagName===t&&(c=c.shadowRoot);o<=i;++o)s[o]&&(r=v(null,l,o),r&&(s[o].m=r,c.insertBefore(r,n)))},j=(e,t,n,l)=>{for(;t<=n;++t)(l=e[t])&&l.m.remove()},k=(e,t)=>e.p===t.p&&e.h===t.h,O=(e,t)=>{const l=t.m=e.m,s=e.$,o=t.$,i=t.p,r=t.i;null===r?(n="svg"===i||"foreignObject"!==i&&n,g(e,t,n),null!==s&&null!==o?((e,t,n,l)=>{let s,o,i=0,r=0,c=0,a=0,u=t.length-1,f=t[0],d=t[u],$=l.length-1,y=l[0],h=l[$];for(;i<=u&&r<=$;)if(null==f)f=t[++i];else if(null==d)d=t[--u];else if(null==y)y=l[++r];else if(null==h)h=l[--$];else if(k(f,y))O(f,y),f=t[++i],y=l[++r];else if(k(d,h))O(d,h),d=t[--u],h=l[--$];else if(k(f,h))O(f,h),e.insertBefore(f.m,d.m.nextSibling),f=t[++i],h=l[--$];else if(k(d,y))O(d,y),e.insertBefore(d.m,f.m),d=t[--u],y=l[++r];else{for(c=-1,a=i;a<=u;++a)if(t[a]&&null!==t[a].h&&t[a].h===y.h){c=a;break}c>=0?(o=t[c],o.p!==y.p?s=v(t&&t[r],n,c):(O(o,y),t[c]=void 0,s=o.m),y=l[++r]):(s=v(t&&t[r],n,r),y=l[++r]),s&&f.m.parentNode.insertBefore(s,f.m)}i>u?S(e,null==l[$+1]?null:l[$+1].m,n,l,r,$):r>$&&j(t,i,u)})(l,s,t,o):null!==o?(null!==e.i&&(l.textContent=""),S(l,null,t,o,0,o.length-1)):null!==s&&j(s,0,s.length-1),n&&"svg"===i&&(n=!1)):e.i!==r&&(l.data=r)},C=e=>_(e).g,M=(e,t)=>{t&&!e.v&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.v=t)))},x=(e,t)=>{if(e.t|=16,!(4&e.t))return M(e,e.S),le((()=>P(e,t)));e.t|=512},P=(e,t)=>{const n=e.j;return U(void 0,(()=>E(e,n,t)))},E=async(e,t,n)=>{const l=e.g,s=l["s-rc"];n&&(e=>{const t=e.k,n=e.g,l=t.t,s=((e,t)=>{let n=f(t),l=Q.get(n);if(e=11===e.nodeType?e:i,l)if("string"==typeof l){let t,s=u.get(e=e.head||e);s||u.set(e,s=new Set),s.has(n)||(t=i.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);L(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>T(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},L=(n,s)=>{try{l=s,s=s.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.g,o=n.k,i=n.O||h(null,null),r=(e=>e&&e.p===p)(l)?l:y(null,null,l);t=s.tagName,o.C&&(r.u=r.u||{},o.C.map((([e,t])=>r.u[t]=s[e]))),r.p=null,r.t|=4,n.O=r,r.m=i.m=s.shadowRoot||s,e=s["s-sc"],O(i,r)})(n,s)}catch(e){I(e,n.g)}return l=null,null},R=()=>l,T=e=>{const t=e.g,n=e.j,l=e.S;H(n,"componentDidRender"),64&e.t||(e.t|=64,W(t),H(n,"componentDidLoad"),e.M(t),l||D()),e.v&&(e.v(),e.v=void 0),512&e.t&&ne((()=>x(e,!1))),e.t&=-517},A=e=>{{const t=_(e),n=t.g.isConnected;return n&&2==(18&t.t)&&x(t,!1),n}},D=()=>{W(i.documentElement),ne((()=>(e=>{const t=r.ce("appload",{detail:{namespace:"streamline"}});return e.dispatchEvent(t),t})(o)))},H=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){I(e)}},U=(e,t)=>e&&e.then?e.then(t):t(),W=e=>e.classList.add("hydrated"),q=(e,t,n)=>{if(t.P){const l=Object.entries(t.P),s=e.prototype;if(l.map((([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(s,e,{get(){return((e,t)=>_(this).L.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=_(e),o=s.L.get(t),i=s.t,r=s.j;n=((e,t)=>null==e||$(e)?e:1&t?e+"":e)(n,l.P[t][0]),8&i&&void 0!==o||n===o||(s.L.set(t,n),r&&2==(18&i)&&x(s,!1))})(this,e,n,t)},configurable:!0,enumerable:!0})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){r.jmp((()=>{const t=n.get(e);this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.C.push([e,s]),s}))}}return e},F=e=>{H(e,"connectedCallback")},N=(e,t={})=>{const n=[],l=t.exclude||[],s=o.customElements,c=i.head,u=c.querySelector("meta[charset]"),d=i.createElement("style"),$=[];let y,h=!0;Object.assign(r,t),r.l=new URL(t.resourcesUrl||"./",i.baseURI).href,e.map((e=>e[1].map((t=>{const o={t:t[0],o:t[1],P:t[2],R:t[3]};o.P=t[2],o.C=[];const i=o.o,c=class extends HTMLElement{constructor(e){super(e),B(e=this,o),1&o.t&&e.attachShadow({mode:"open"})}connectedCallback(){y&&(clearTimeout(y),y=null),h?$.push(this):r.jmp((()=>(e=>{if(0==(1&r.t)){const t=_(e),n=t.k,l=()=>{};if(1&t.t)F(t.j);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){M(t,t.S=n);break}}n.P&&Object.entries(n.P).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=K(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(q(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){I(e)}t.t&=-9,e(),F(t.j)}if(s.style){let e=s.style;const t=f(n);if(!Q.has(t)){const l=()=>{};((e,t,n)=>{let l=Q.get(e);a&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,Q.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.S,i=()=>x(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){r.jmp((()=>(()=>{0==(1&r.t)&&H(_(this).j,"disconnectedCallback")})()))}componentOnReady(){return _(this).T}};o.A=e[0],l.includes(i)||s.get(i)||(n.push(i),s.define(i,q(c,o,1)))})))),d.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",d.setAttribute("data-styles",""),c.insertBefore(d,u?u.nextSibling:c.firstChild),h=!1,$.length?$.map((e=>e.connectedCallback())):r.jmp((()=>y=setTimeout(D,30)))},V=new WeakMap,_=e=>V.get(e),z=(e,t)=>V.set(t.j=e,t),B=(e,t)=>{const n={t:0,g:e,k:t,L:new Map};return n.T=new Promise((e=>n.M=e)),e["s-p"]=[],e["s-rc"]=[],V.set(e,n)},G=(e,t)=>t in e,I=(e,t)=>(0,console.error)(e,t),J=new Map,K=e=>{const t=e.o.replace(/-/g,"_"),n=e.A,l=J.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(J.set(n,e),e[t])),I)},Q=new Map,X=[],Y=[],Z=(e,t)=>n=>{e.push(n),s||(s=!0,t&&4&r.t?ne(te):r.raf(te))},ee=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){I(e)}e.length=0},te=()=>{ee(X),ee(Y),(s=X.length>0)&&r.raf(te)},ne=e=>c().then(e),le=Z(Y,!0);export{p as H,C as a,N as b,A as f,R as g,y as h,c as p,z as r}