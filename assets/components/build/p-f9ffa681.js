let e,t,n=!1,l=null,s=!1;const o="undefined"!=typeof window?window:{},i=o.document||{head:{}},r={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),a=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),u=(e,t,n)=>{n&&n.map((([n,l,s])=>{const o=e,i=f(t,s),c=h(n);r.ael(o,l,i,c),(t.o=t.o||[]).push((()=>r.rel(o,l,i,c)))}))},f=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){ee(e)}},h=e=>0!=(2&e),d=new WeakMap,y=e=>"sc-"+e.h,$={},p=e=>"object"==(e=typeof e)||"function"===e,m=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1,r=[];const c=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?c(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!p(l))&&(l+=""),o&&i?r[r.length-1].$+=l:r.push(o?w(null,l):l),i=o)};if(c(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,r,g);const a=w(e,null);return a.p=t,r.length>0&&(a.m=r),a.g=s,a},w=(e,t)=>({t:0,v:e,$:t,j:null,m:null,p:null,g:null}),b={},g={forEach:(e,t)=>e.map(v).forEach(t),map:(e,t)=>e.map(v).map(t).map(j)},v=e=>({vattrs:e.p,vchildren:e.m,vkey:e.g,vname:e.S,vtag:e.v,vtext:e.$}),j=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),m(e.vtag,t,...e.vchildren||[])}const t=w(e.vtag,e.vtext);return t.p=e.vattrs,t.m=e.vchildren,t.g=e.vkey,t.S=e.vname,t},S=(e,t,n,l,s,i)=>{if(n!==l){let c=Z(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,s=O(n),o=O(l);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(c||"o"!==t[0]||"n"!==t[1]){const o=p(l);if((c||o&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?c=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}null==l||!1===l?!1===l&&""!==e.getAttribute(t)||e.removeAttribute(t):(!c||4&i||s)&&!o&&e.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):Z(o,a)?a.slice(2):a[2]+t.slice(3),n&&r.rel(e,t,n,!1),l&&r.ael(e,t,l,!1)}},k=/\s/,O=e=>e?e.split(k):[],C=(e,t,n,l)=>{const s=11===t.j.nodeType&&t.j.host?t.j.host:t.j,o=e&&e.p||$,i=t.p||$;for(l in o)l in i||S(s,l,o[l],void 0,n,t.t);for(l in i)S(s,l,o[l],i[l],n,t.t)},M=(t,l,s)=>{let o,r,c=l.m[s],a=0;if(null!==c.$)o=c.j=i.createTextNode(c.$);else{if(n||(n="svg"===c.v),o=c.j=i.createElementNS(n?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",c.v),n&&"foreignObject"===c.v&&(n=!1),C(null,c,n),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),c.m)for(a=0;a<c.m.length;++a)r=M(t,c,a),r&&o.appendChild(r);"svg"===c.v?n=!1:"foreignObject"===o.tagName&&(n=!0)}return o},x=(e,n,l,s,o,i)=>{let r,c=e;for(c.shadowRoot&&c.tagName===t&&(c=c.shadowRoot);o<=i;++o)s[o]&&(r=M(null,l,o),r&&(s[o].j=r,c.insertBefore(r,n)))},P=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.j,R(l),s.remove())},E=(e,t)=>e.v===t.v&&e.g===t.g,L=(e,t)=>{const l=t.j=e.j,s=e.m,o=t.m,i=t.v,r=t.$;null===r?(n="svg"===i||"foreignObject"!==i&&n,C(e,t,n),null!==s&&null!==o?((e,t,n,l)=>{let s,o,i=0,r=0,c=0,a=0,u=t.length-1,f=t[0],h=t[u],d=l.length-1,y=l[0],$=l[d];for(;i<=u&&r<=d;)if(null==f)f=t[++i];else if(null==h)h=t[--u];else if(null==y)y=l[++r];else if(null==$)$=l[--d];else if(E(f,y))L(f,y),f=t[++i],y=l[++r];else if(E(h,$))L(h,$),h=t[--u],$=l[--d];else if(E(f,$))L(f,$),e.insertBefore(f.j,h.j.nextSibling),f=t[++i],$=l[--d];else if(E(h,y))L(h,y),e.insertBefore(h.j,f.j),h=t[--u],y=l[++r];else{for(c=-1,a=i;a<=u;++a)if(t[a]&&null!==t[a].g&&t[a].g===y.g){c=a;break}c>=0?(o=t[c],o.v!==y.v?s=M(t&&t[r],n,c):(L(o,y),t[c]=void 0,s=o.j),y=l[++r]):(s=M(t&&t[r],n,r),y=l[++r]),s&&f.j.parentNode.insertBefore(s,f.j)}i>u?x(e,null==l[d+1]?null:l[d+1].j,n,l,r,d):r>d&&P(t,i,u)})(l,s,t,o):null!==o?(null!==e.$&&(l.textContent=""),x(l,null,t,o,0,o.length-1)):null!==s&&P(s,0,s.length-1),n&&"svg"===i&&(n=!1)):e.$!==r&&(l.data=r)},R=e=>{e.p&&e.p.ref&&e.p.ref(null),e.m&&e.m.map(R)},T=e=>Q(e).k,W=(e,t)=>{t&&!e.O&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.O=t)))},A=(e,t)=>{if(e.t|=16,!(4&e.t))return W(e,e.C),ue((()=>F(e,t)));e.t|=512},F=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>_(n,e,t))),e.u=null)),l=z(l,(()=>_(n,"componentWillRender"))),z(l,(()=>H(e,n,t)))},H=async(e,t,n)=>{const l=e.k,s=l["s-rc"];n&&(e=>{const t=e.M,n=e.k,l=t.t,s=((e,t)=>{let n=y(t),l=le.get(n);if(e=11===e.nodeType?e:i,l)if("string"==typeof l){let t,s=d.get(e=e.head||e);s||d.set(e,s=new Set),s.has(n)||(t=i.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);U(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>D(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},U=(n,s)=>{try{l=s,s=s.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.k,o=n.M,i=n.P||w(null,null),r=(e=>e&&e.v===b)(l)?l:m(null,null,l);t=s.tagName,o.L&&(r.p=r.p||{},o.L.map((([e,t])=>r.p[t]=s[e]))),r.v=null,r.t|=4,n.P=r,r.j=i.j=s.shadowRoot||s,e=s["s-sc"],L(i,r)})(n,s)}catch(e){ee(e,n.k)}return l=null,null},q=()=>l,D=e=>{const t=e.k,n=e.i,l=e.C;64&e.t||(e.t|=64,B(t),_(n,"componentDidLoad"),e.R(t),l||V()),e.T(t),e.O&&(e.O(),e.O=void 0),512&e.t&&ae((()=>A(e,!1))),e.t&=-517},N=e=>{{const t=Q(e),n=t.k.isConnected;return n&&2==(18&t.t)&&A(t,!1),n}},V=()=>{B(i.documentElement),ae((()=>(e=>{const t=r.ce("appload",{detail:{namespace:"streamline"}});return e.dispatchEvent(t),t})(o)))},_=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){ee(e)}},z=(e,t)=>e&&e.then?e.then(t):t(),B=e=>e.classList.add("hydrated"),G=(e,t,n)=>{if(t.W){const l=Object.entries(t.W),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(s,e,{get(){return((e,t)=>Q(this).A.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=Q(e),o=s.A.get(t),i=s.t,r=s.i;n=((e,t)=>null==e||p(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.W[t][0]),8&i&&void 0!==o||n===o||(s.A.set(t,n),r&&2==(18&i)&&A(s,!1))})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(s,e,{value(...t){const n=Q(this);return n.F.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){r.jmp((()=>{const t=n.get(e);this.hasOwnProperty(t)&&(l=this[t],delete this[t]),this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.L.push([e,s]),s}))}}return e},I=e=>{_(e,"connectedCallback")},J=(e,t={})=>{const n=[],l=t.exclude||[],s=o.customElements,c=i.head,f=c.querySelector("meta[charset]"),h=i.createElement("style"),d=[];let $,p=!0;Object.assign(r,t),r.l=new URL(t.resourcesUrl||"./",i.baseURI).href,e.map((e=>e[1].map((t=>{const o={t:t[0],h:t[1],W:t[2],H:t[3]};o.W=t[2],o.H=t[3],o.L=[];const i=o.h,c=class extends HTMLElement{constructor(e){super(e),Y(e=this,o),1&o.t&&e.attachShadow({mode:"open"})}connectedCallback(){$&&(clearTimeout($),$=null),p?d.push(this):r.jmp((()=>(e=>{if(0==(1&r.t)){const t=Q(e),n=t.M,l=()=>{};if(1&t.t)u(e,t,n.H),I(t.i);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){W(t,t.C=n);break}}n.W&&Object.entries(n.W).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=ne(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(G(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){ee(e)}t.t&=-9,e(),I(t.i)}if(s.style){let e=s.style;const t=y(n);if(!le.has(t)){const l=()=>{};((e,t,n)=>{let l=le.get(e);a&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,le.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.C,i=()=>A(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){r.jmp((()=>(()=>{if(0==(1&r.t)){const e=Q(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),_(t,"disconnectedCallback")}})()))}componentOnReady(){return Q(this).U}};o.q=e[0],l.includes(i)||s.get(i)||(n.push(i),s.define(i,G(c,o,1)))})))),h.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",h.setAttribute("data-styles",""),c.insertBefore(h,f?f.nextSibling:c.firstChild),p=!1,d.length?d.map((e=>e.connectedCallback())):r.jmp((()=>$=setTimeout(V,30)))},K=new WeakMap,Q=e=>K.get(e),X=(e,t)=>K.set(t.i=e,t),Y=(e,t)=>{const n={t:0,k:e,M:t,A:new Map};return n.F=new Promise((e=>n.T=e)),n.U=new Promise((e=>n.R=e)),e["s-p"]=[],e["s-rc"]=[],u(e,n,t.H),K.set(e,n)},Z=(e,t)=>t in e,ee=(e,t)=>(0,console.error)(e,t),te=new Map,ne=e=>{const t=e.h.replace(/-/g,"_"),n=e.q,l=te.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(te.set(n,e),e[t])),ee)},le=new Map,se=[],oe=[],ie=(e,t)=>n=>{e.push(n),s||(s=!0,t&&4&r.t?ae(ce):r.raf(ce))},re=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){ee(e)}e.length=0},ce=()=>{re(se),re(oe),(s=se.length>0)&&r.raf(ce)},ae=e=>c().then(e),ue=ie(oe,!0);export{b as H,q as a,J as b,N as f,T as g,m as h,c as p,X as r}