let e,t,n=!1,l=null,s=!1;const o="undefined"!=typeof window?window:{},r=o.document||{head:{}},i={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),a=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),u=new WeakMap,f=e=>"sc-"+e.o,h={},d=e=>"object"==(e=typeof e)||"function"===e,y=(e,t,...n)=>{let l=null,s=null,o=!1,r=!1,i=[];const c=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?c(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!d(l))&&(l+=""),o&&r?i[i.length-1].i+=l:i.push(o?$(null,l):l),r=o)};if(c(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,i,m);const a=$(e,null);return a.u=t,i.length>0&&(a.h=i),a.$=s,a},$=(e,t)=>({t:0,p:e,i:t,m:null,h:null,u:null,$:null}),p={},m={forEach:(e,t)=>e.map(w).forEach(t),map:(e,t)=>e.map(w).map(t).map(b)},w=e=>({vattrs:e.u,vchildren:e.h,vkey:e.$,vname:e.g,vtag:e.p,vtext:e.i}),b=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),y(e.vtag,t,...e.vchildren||[])}const t=$(e.vtag,e.vtext);return t.u=e.vattrs,t.h=e.vchildren,t.$=e.vkey,t.g=e.vname,t},g=(e,t,n,l,s,r)=>{if(n!==l){let c=Q(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,s=j(n),o=j(l);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(c||"o"!==t[0]||"n"!==t[1]){const o=d(l);if((c||o&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?c=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}null==l||!1===l?!1===l&&""!==e.getAttribute(t)||e.removeAttribute(t):(!c||4&r||s)&&!o&&e.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):Q(o,a)?a.slice(2):a[2]+t.slice(3),n&&i.rel(e,t,n,!1),l&&i.ael(e,t,l,!1)}},v=/\s/,j=e=>e?e.split(v):[],S=(e,t,n,l)=>{const s=11===t.m.nodeType&&t.m.host?t.m.host:t.m,o=e&&e.u||h,r=t.u||h;for(l in o)l in r||g(s,l,o[l],void 0,n,t.t);for(l in r)g(s,l,o[l],r[l],n,t.t)},k=(t,l,s)=>{let o,i,c=l.h[s],a=0;if(null!==c.i)o=c.m=r.createTextNode(c.i);else{if(n||(n="svg"===c.p),o=c.m=r.createElementNS(n?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",c.p),n&&"foreignObject"===c.p&&(n=!1),S(null,c,n),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),c.h)for(a=0;a<c.h.length;++a)i=k(t,c,a),i&&o.appendChild(i);"svg"===c.p?n=!1:"foreignObject"===o.tagName&&(n=!0)}return o},O=(e,n,l,s,o,r)=>{let i,c=e;for(c.shadowRoot&&c.tagName===t&&(c=c.shadowRoot);o<=r;++o)s[o]&&(i=k(null,l,o),i&&(s[o].m=i,c.insertBefore(i,n)))},C=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.m,P(l),s.remove())},M=(e,t)=>e.p===t.p&&e.$===t.$,x=(e,t)=>{const l=t.m=e.m,s=e.h,o=t.h,r=t.p,i=t.i;null===i?(n="svg"===r||"foreignObject"!==r&&n,S(e,t,n),null!==s&&null!==o?((e,t,n,l)=>{let s,o,r=0,i=0,c=0,a=0,u=t.length-1,f=t[0],h=t[u],d=l.length-1,y=l[0],$=l[d];for(;r<=u&&i<=d;)if(null==f)f=t[++r];else if(null==h)h=t[--u];else if(null==y)y=l[++i];else if(null==$)$=l[--d];else if(M(f,y))x(f,y),f=t[++r],y=l[++i];else if(M(h,$))x(h,$),h=t[--u],$=l[--d];else if(M(f,$))x(f,$),e.insertBefore(f.m,h.m.nextSibling),f=t[++r],$=l[--d];else if(M(h,y))x(h,y),e.insertBefore(h.m,f.m),h=t[--u],y=l[++i];else{for(c=-1,a=r;a<=u;++a)if(t[a]&&null!==t[a].$&&t[a].$===y.$){c=a;break}c>=0?(o=t[c],o.p!==y.p?s=k(t&&t[i],n,c):(x(o,y),t[c]=void 0,s=o.m),y=l[++i]):(s=k(t&&t[i],n,i),y=l[++i]),s&&f.m.parentNode.insertBefore(s,f.m)}r>u?O(e,null==l[d+1]?null:l[d+1].m,n,l,i,d):i>d&&C(t,r,u)})(l,s,t,o):null!==o?(null!==e.i&&(l.textContent=""),O(l,null,t,o,0,o.length-1)):null!==s&&C(s,0,s.length-1),n&&"svg"===r&&(n=!1)):e.i!==i&&(l.data=i)},P=e=>{e.u&&e.u.ref&&e.u.ref(null),e.h&&e.h.map(P)},E=e=>I(e).v,L=(e,t)=>{t&&!e.j&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.j=t)))},R=(e,t)=>{if(e.t|=16,!(4&e.t))return L(e,e.S),ie((()=>T(e,t)));e.t|=512},T=(e,t)=>{const n=e.k;let l;return l=N(l,(()=>D(n,"componentWillRender"))),N(l,(()=>W(e,n,t)))},W=async(e,t,n)=>{const l=e.v,s=l["s-rc"];n&&(e=>{const t=e.O,n=e.v,l=t.t,s=((e,t)=>{let n=f(t),l=ee.get(n);if(e=11===e.nodeType?e:r,l)if("string"==typeof l){let t,s=u.get(e=e.head||e);s||u.set(e,s=new Set),s.has(n)||(t=r.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);A(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>H(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},A=(n,s)=>{try{l=s,s=s.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.v,o=n.O,r=n.C||$(null,null),i=(e=>e&&e.p===p)(l)?l:y(null,null,l);t=s.tagName,o.M&&(i.u=i.u||{},o.M.map((([e,t])=>i.u[t]=s[e]))),i.p=null,i.t|=4,n.C=i,i.m=r.m=s.shadowRoot||s,e=s["s-sc"],x(r,i)})(n,s)}catch(e){X(e,n.v)}return l=null,null},F=()=>l,H=e=>{const t=e.v,n=e.k,l=e.S;64&e.t||(e.t|=64,V(t),D(n,"componentDidLoad"),e.P(t),l||q()),e.L(t),e.j&&(e.j(),e.j=void 0),512&e.t&&re((()=>R(e,!1))),e.t&=-517},U=e=>{{const t=I(e),n=t.v.isConnected;return n&&2==(18&t.t)&&R(t,!1),n}},q=()=>{V(r.documentElement),re((()=>(e=>{const t=i.ce("appload",{detail:{namespace:"streamline"}});return e.dispatchEvent(t),t})(o)))},D=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){X(e)}},N=(e,t)=>e&&e.then?e.then(t):t(),V=e=>e.classList.add("hydrated"),_=(e,t,n)=>{if(t.R){const l=Object.entries(t.R),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(s,e,{get(){return((e,t)=>I(this).T.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=I(e),o=s.T.get(t),r=s.t,i=s.k;n=((e,t)=>null==e||d(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.R[t][0]),8&r&&void 0!==o||n===o||(s.T.set(t,n),i&&2==(18&r)&&R(s,!1))})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(s,e,{value(...t){const n=I(this);return n.W.then((()=>n.k[e](...t)))}})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){i.jmp((()=>{const t=n.get(e);this.hasOwnProperty(t)&&(l=this[t],delete this[t]),this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.M.push([e,s]),s}))}}return e},z=e=>{D(e,"connectedCallback")},B=(e,t={})=>{const n=[],l=t.exclude||[],s=o.customElements,c=r.head,u=c.querySelector("meta[charset]"),h=r.createElement("style"),d=[];let y,$=!0;Object.assign(i,t),i.l=new URL(t.resourcesUrl||"./",r.baseURI).href,e.map((e=>e[1].map((t=>{const o={t:t[0],o:t[1],R:t[2],A:t[3]};o.R=t[2],o.M=[];const r=o.o,c=class extends HTMLElement{constructor(e){super(e),K(e=this,o),1&o.t&&e.attachShadow({mode:"open"})}connectedCallback(){y&&(clearTimeout(y),y=null),$?d.push(this):i.jmp((()=>(e=>{if(0==(1&i.t)){const t=I(e),n=t.O,l=()=>{};if(1&t.t)z(t.k);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){L(t,t.S=n);break}}n.R&&Object.entries(n.R).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=Z(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(_(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){X(e)}t.t&=-9,e(),z(t.k)}if(s.style){let e=s.style;const t=f(n);if(!ee.has(t)){const l=()=>{};((e,t,n)=>{let l=ee.get(e);a&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,ee.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.S,r=()=>R(t,!0);o&&o["s-rc"]?o["s-rc"].push(r):r()})(0,t,n)}l()}})(this)))}disconnectedCallback(){i.jmp((()=>(()=>{0==(1&i.t)&&D(I(this).k,"disconnectedCallback")})()))}componentOnReady(){return I(this).F}};o.H=e[0],l.includes(r)||s.get(r)||(n.push(r),s.define(r,_(c,o,1)))})))),h.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",h.setAttribute("data-styles",""),c.insertBefore(h,u?u.nextSibling:c.firstChild),$=!1,d.length?d.map((e=>e.connectedCallback())):i.jmp((()=>y=setTimeout(q,30)))},G=new WeakMap,I=e=>G.get(e),J=(e,t)=>G.set(t.k=e,t),K=(e,t)=>{const n={t:0,v:e,O:t,T:new Map};return n.W=new Promise((e=>n.L=e)),n.F=new Promise((e=>n.P=e)),e["s-p"]=[],e["s-rc"]=[],G.set(e,n)},Q=(e,t)=>t in e,X=(e,t)=>(0,console.error)(e,t),Y=new Map,Z=e=>{const t=e.o.replace(/-/g,"_"),n=e.H,l=Y.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(Y.set(n,e),e[t])),X)},ee=new Map,te=[],ne=[],le=(e,t)=>n=>{e.push(n),s||(s=!0,t&&4&i.t?re(oe):i.raf(oe))},se=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){X(e)}e.length=0},oe=()=>{se(te),se(ne),(s=te.length>0)&&i.raf(oe)},re=e=>c().then(e),ie=le(ne,!0);export{p as H,E as a,B as b,U as f,F as g,y as h,c as p,J as r}