let e,t,n=!1,s=null,i=!1;const o="undefined"!=typeof window?window:{},r=o.document||{head:{}},l={t:0,i:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,s)=>e.addEventListener(t,n,s),rel:(e,t,n,s)=>e.removeEventListener(t,n,s),ce:(e,t)=>new CustomEvent(e,t)},a=e=>Promise.resolve(e),c=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),u="http://www.w3.org/1999/xlink",d=new WeakMap,f=e=>"sc-"+e.o,m={},h=e=>"object"==(e=typeof e)||"function"===e,p=(e,t,...n)=>{let s=null,i=null,o=!1,r=!1,l=[];const a=t=>{for(let n=0;n<t.length;n++)s=t[n],Array.isArray(s)?a(s):null!=s&&"boolean"!=typeof s&&((o="function"!=typeof e&&!h(s))&&(s+=""),o&&r?l[l.length-1].l+=s:l.push(o?w(null,s):s),r=o)};if(a(n),t){t.key&&(i=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,l,v);const c=w(e,null);return c.u=t,l.length>0&&(c.m=l),c.h=i,c},w=(e,t)=>({t:0,p:e,l:t,v:null,m:null,u:null,h:null}),y={},v={forEach:(e,t)=>e.map(g).forEach(t),map:(e,t)=>e.map(g).map(t).map(b)},g=e=>({vattrs:e.u,vchildren:e.m,vkey:e.h,vname:e.g,vtag:e.p,vtext:e.l}),b=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),p(e.vtag,t,...e.vchildren||[])}const t=w(e.vtag,e.vtext);return t.u=e.vattrs,t.m=e.vchildren,t.h=e.vkey,t.g=e.vname,t},S=(e,t,n,s,i,r)=>{if(n!==s){let a=G(e,t),c=t.toLowerCase();if("class"===t){const t=e.classList,i=P(n),o=P(s);t.remove(...i.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!i.includes(e))))}else if("style"===t){for(const t in n)s&&null!=s[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in s)n&&s[t]===n[t]||(t.includes("-")?e.style.setProperty(t,s[t]):e.style[t]=s[t])}else if("key"===t);else if("ref"===t)s&&s(e);else if(a||"o"!==t[0]||"n"!==t[1]){const o=h(s);if((a||o&&null!==s)&&!i)try{if(e.tagName.includes("-"))e[t]=s;else{let i=null==s?"":s;"list"===t?a=!1:null!=n&&e[t]==i||(e[t]=i)}}catch(e){}let l=!1;c!==(c=c.replace(/^xlink\:?/,""))&&(t=c,l=!0),null==s||!1===s?!1===s&&""!==e.getAttribute(t)||(l?e.removeAttributeNS(u,t):e.removeAttribute(t)):(!a||4&r||i)&&!o&&(s=!0===s?"":s,l?e.setAttributeNS(u,t,s):e.setAttribute(t,s))}else t="-"===t[2]?t.slice(3):G(o,c)?c.slice(2):c[2]+t.slice(3),n&&l.rel(e,t,n,!1),s&&l.ael(e,t,s,!1)}},$=/\s/,P=e=>e?e.split($):[],k=(e,t,n,s)=>{const i=11===t.v.nodeType&&t.v.host?t.v.host:t.v,o=e&&e.u||m,r=t.u||m;for(s in o)s in r||S(i,s,o[s],void 0,n,t.t);for(s in r)S(i,s,o[s],r[s],n,t.t)},O=(t,s,i)=>{let o,l,a=s.m[i],c=0;if(null!==a.l)o=a.v=r.createTextNode(a.l);else{if(n||(n="svg"===a.p),o=a.v=r.createElementNS(n?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",a.p),n&&"foreignObject"===a.p&&(n=!1),k(null,a,n),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),a.m)for(c=0;c<a.m.length;++c)l=O(t,a,c),l&&o.appendChild(l);"svg"===a.p?n=!1:"foreignObject"===o.tagName&&(n=!0)}return o},j=(e,n,s,i,o,r)=>{let l,a=e;for(a.shadowRoot&&a.tagName===t&&(a=a.shadowRoot);o<=r;++o)i[o]&&(l=O(null,s,o),l&&(i[o].v=l,a.insertBefore(l,n)))},M=(e,t,n,s,i)=>{for(;t<=n;++t)(s=e[t])&&(i=s.v,A(s),i.remove())},C=(e,t)=>e.p===t.p&&e.h===t.h,x=(e,t)=>{const s=t.v=e.v,i=e.m,o=t.m,r=t.p,l=t.l;null===l?(n="svg"===r||"foreignObject"!==r&&n,k(e,t,n),null!==i&&null!==o?((e,t,n,s)=>{let i,o,r=0,l=0,a=0,c=0,u=t.length-1,d=t[0],f=t[u],m=s.length-1,h=s[0],p=s[m];for(;r<=u&&l<=m;)if(null==d)d=t[++r];else if(null==f)f=t[--u];else if(null==h)h=s[++l];else if(null==p)p=s[--m];else if(C(d,h))x(d,h),d=t[++r],h=s[++l];else if(C(f,p))x(f,p),f=t[--u],p=s[--m];else if(C(d,p))x(d,p),e.insertBefore(d.v,f.v.nextSibling),d=t[++r],p=s[--m];else if(C(f,h))x(f,h),e.insertBefore(f.v,d.v),f=t[--u],h=s[++l];else{for(a=-1,c=r;c<=u;++c)if(t[c]&&null!==t[c].h&&t[c].h===h.h){a=c;break}a>=0?(o=t[a],o.p!==h.p?i=O(t&&t[l],n,a):(x(o,h),t[a]=void 0,i=o.v),h=s[++l]):(i=O(t&&t[l],n,l),h=s[++l]),i&&d.v.parentNode.insertBefore(i,d.v)}r>u?j(e,null==s[m+1]?null:s[m+1].v,n,s,l,m):l>m&&M(t,r,u)})(s,i,t,o):null!==o?(null!==e.l&&(s.textContent=""),j(s,null,t,o,0,o.length-1)):null!==i&&M(i,0,i.length-1),n&&"svg"===r&&(n=!1)):e.l!==l&&(s.data=l)},A=e=>{e.u&&e.u.ref&&e.u.ref(null),e.m&&e.m.map(A)},E=e=>X(e).S,K=(e,t)=>{t&&!e.$&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.$=t)))},N=(e,t)=>{if(e.t|=16,!(4&e.t))return K(e,e.P),le((()=>T(e,t)));e.t|=512},T=(e,t)=>{const n=e.k;let s;return t&&(s=U(n,"componentWillLoad")),q(s,(()=>F(e,n,t)))},F=async(e,t,n)=>{const s=e.S,i=s["s-rc"];n&&(e=>{const t=e.O,n=e.S,s=t.t,i=((e,t)=>{let n=f(t),s=ee.get(n);if(e=11===e.nodeType?e:r,s)if("string"==typeof s){let t,i=d.get(e=e.head||e);i||d.set(e,i=new Set),i.has(n)||(t=r.createElement("style"),t.innerHTML=s,e.insertBefore(t,e.querySelector("link")),i&&i.add(n))}else e.adoptedStyleSheets.includes(s)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,s]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&s&&(n["s-sc"]=i,n.classList.add(i+"-h"))})(e);L(e,t),i&&(i.map((e=>e())),s["s-rc"]=void 0);{const t=s["s-p"],n=()=>V(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},L=(n,i)=>{try{s=i,i=i.render(),n.t&=-17,n.t|=2,((n,s)=>{const i=n.S,o=n.j||w(null,null),r=(e=>e&&e.p===y)(s)?s:p(null,null,s);t=i.tagName,r.p=null,r.t|=4,n.j=r,r.v=o.v=i.shadowRoot||i,e=i["s-sc"],x(o,r)})(n,i)}catch(e){I(e,n.S)}return s=null,null},V=e=>{const t=e.S,n=e.k,s=e.P;U(n,"componentDidRender"),64&e.t?U(n,"componentDidUpdate"):(e.t|=64,H(t),U(n,"componentDidLoad"),e.M(t),s||Q()),e.C(t),e.$&&(e.$(),e.$=void 0),512&e.t&&re((()=>N(e,!1))),e.t&=-517},D=e=>{{const t=X(e),n=t.S.isConnected;return n&&2==(18&t.t)&&N(t,!1),n}},Q=()=>{H(r.documentElement),re((()=>(e=>{const t=l.ce("appload",{detail:{namespace:"streamline"}});return e.dispatchEvent(t),t})(o)))},U=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){I(e)}},q=(e,t)=>e&&e.then?e.then(t):t(),H=e=>e.classList.add("hydrated"),R=(e,t,n)=>{if(t.A){const s=Object.entries(t.A),i=e.prototype;if(s.map((([e,[s]])=>{31&s||2&n&&32&s?Object.defineProperty(i,e,{get(){return((e,t)=>X(this).K.get(t))(0,e)},set(n){((e,t,n,s)=>{const i=X(e),o=i.K.get(t),r=i.t,l=i.k;n=((e,t)=>null==e||h(e)?e:4&t?"false"!==e&&(""===e||!!e):1&t?e+"":e)(n,s.A[t][0]),8&r&&void 0!==o||n===o||Number.isNaN(o)&&Number.isNaN(n)||(i.K.set(t,n),l&&2==(18&r)&&N(i,!1))})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&s&&Object.defineProperty(i,e,{value(...t){const n=X(this);return n.N.then((()=>n.k[e](...t)))}})})),1&n){const t=new Map;i.attributeChangedCallback=function(e,n,s){l.jmp((()=>{const n=t.get(e);if(this.hasOwnProperty(n))s=this[n],delete this[n];else if(i.hasOwnProperty(n)&&"number"==typeof this[n]&&this[n]==s)return;this[n]=(null!==s||"boolean"!=typeof this[n])&&s}))},e.observedAttributes=s.filter((([e,t])=>15&t[0])).map((([e,n])=>{const s=n[1]||e;return t.set(s,e),s}))}}return e},W=e=>{U(e,"connectedCallback")},J=(e,t={})=>{const n=[],s=t.exclude||[],i=o.customElements,a=r.head,u=a.querySelector("meta[charset]"),d=r.createElement("style"),m=[];let h,p=!0;Object.assign(l,t),l.i=new URL(t.resourcesUrl||"./",r.baseURI).href,e.map((e=>{e[1].map((t=>{const o={t:t[0],o:t[1],A:t[2],T:t[3]};o.A=t[2];const r=o.o,a=class extends HTMLElement{constructor(e){super(e),z(e=this,o),1&o.t&&e.attachShadow({mode:"open"})}connectedCallback(){h&&(clearTimeout(h),h=null),p?m.push(this):l.jmp((()=>(e=>{if(0==(1&l.t)){const t=X(e),n=t.O,s=()=>{};if(1&t.t)W(t.k);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){K(t,t.P=n);break}}n.A&&Object.entries(n.A).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,s,i)=>{if(0==(32&t.t)){{if(t.t|=32,(i=Z(n)).then){const e=()=>{};i=await i,e()}i.isProxied||(R(i,n,2),i.isProxied=!0);const e=()=>{};t.t|=8;try{new i(t)}catch(e){I(e)}t.t&=-9,e(),W(t.k)}if(i.style){let e=i.style;const t=f(n);if(!ee.has(t)){const s=()=>{};((e,t,n)=>{let s=ee.get(e);c&&n?(s=s||new CSSStyleSheet,s.replace(t)):s=t,ee.set(e,s)})(t,e,!!(1&n.t)),s()}}}const o=t.P,r=()=>N(t,!0);o&&o["s-rc"]?o["s-rc"].push(r):r()})(0,t,n)}s()}})(this)))}disconnectedCallback(){l.jmp((()=>{}))}componentOnReady(){return X(this).F}};o.L=e[0],s.includes(r)||i.get(r)||(n.push(r),i.define(r,R(a,o,1)))}))})),d.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",d.setAttribute("data-styles",""),a.insertBefore(d,u?u.nextSibling:a.firstChild),p=!1,m.length?m.map((e=>e.connectedCallback())):l.jmp((()=>h=setTimeout(Q,30)))},B=new WeakMap,X=e=>B.get(e),_=(e,t)=>B.set(t.k=e,t),z=(e,t)=>{const n={t:0,S:e,O:t,K:new Map};return n.N=new Promise((e=>n.C=e)),n.F=new Promise((e=>n.M=e)),e["s-p"]=[],e["s-rc"]=[],B.set(e,n)},G=(e,t)=>t in e,I=(e,t)=>(0,console.error)(e,t),Y=new Map,Z=e=>{const t=e.o.replace(/-/g,"_"),n=e.L,s=Y.get(n);return s?s[t]:import(`./${n}.entry.js`).then((e=>(Y.set(n,e),e[t])),I)},ee=new Map,te=[],ne=[],se=(e,t)=>n=>{e.push(n),i||(i=!0,t&&4&l.t?re(oe):l.raf(oe))},ie=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){I(e)}e.length=0},oe=()=>{ie(te),ie(ne),(i=te.length>0)&&l.raf(oe)},re=e=>a().then(e),le=se(ne,!0),ae=e=>!("isConnected"in e)||e.isConnected,ce=(()=>{let e;return(...t)=>{e&&clearTimeout(e),e=setTimeout((()=>{e=0,(e=>{for(let t of e.keys())e.set(t,e.get(t).filter(ae))})(...t)}),2e3)}})();var ue,de,fe,me,he,pe;const{state:we,onChange:ye}=(()=>{const e=((e,t=((e,t)=>e!==t))=>{let n=new Map(Object.entries(null!=e?e:{}));const s={dispose:[],get:[],set:[],reset:[]},i=()=>{n=new Map(Object.entries(null!=e?e:{})),s.reset.forEach((e=>e()))},o=e=>(s.get.forEach((t=>t(e))),n.get(e)),r=(e,i)=>{const o=n.get(e);t(i,o,e)&&(n.set(e,i),s.set.forEach((t=>t(e,i,o))))},l="undefined"==typeof Proxy?{}:new Proxy(e,{get:(e,t)=>o(t),ownKeys:()=>Array.from(n.keys()),getOwnPropertyDescriptor:()=>({enumerable:!0,configurable:!0}),has:(e,t)=>n.has(t),set:(e,t,n)=>(r(t,n),!0)}),a=(e,t)=>(s[e].push(t),()=>{((e,t)=>{const n=e.indexOf(t);n>=0&&(e[n]=e[e.length-1],e.length--)})(s[e],t)});return{state:l,get:o,set:r,on:a,onChange:(t,n)=>{const s=a("set",((e,s)=>{e===t&&n(s)})),i=a("reset",(()=>n(e[t])));return()=>{s(),i()}},use:(...e)=>{const t=e.reduce(((e,t)=>(t.set&&e.push(a("set",t.set)),t.get&&e.push(a("get",t.get)),t.reset&&e.push(a("reset",t.reset)),t.dispose&&e.push(a("dispose",t.dispose)),e)),[]);return()=>t.forEach((e=>e()))},dispose:()=>{s.dispose.forEach((e=>e())),i()},reset:i,forceUpdate:e=>{const t=n.get(e);s.set.forEach((n=>n(e,t,t)))}}})({actions:{post:{id:"post",condition:!0,name:"Search for a post",active:"post",route:"get/posts"},site:{id:"site",condition:null===(ue=null===window||void 0===window?void 0:window.streamlineData)||void 0===ue?void 0:ue.network,name:"Search for a site",active:"site",route:"get/sites"}},active:"search",bodyStyle:{},currentSite:{id:1,path:"/"},data:window.streamlineData,drawer:{active:!1,items:[],onSave:null,title:"",values:{}},entriesSettings:[{type:"settings",children:[{name:"Key shortcuts",id:"key",children:[{id:"navigation",name:"Entry navigation",nameParent:"Key shortcuts",label:"Navigate between entry items",metaKey:!1,keys:["↑","↓"]},{id:"navigationTabs",name:"Tab navigation",nameParent:"Key shortcuts",label:"Navigate between top-level tab items",metaKey:!0,keys:["→","←"]},{id:"search",name:"Focus search",nameParent:"Key shortcuts",label:"Focus the search bar",metaKey:!0,keys:["s"]},{id:"exit",name:"Close",nameParent:"Key shortcuts",label:"Exit the app",metaKey:!1,keys:["esc"]}]},{name:"Appearance",id:"appearance",children:[{id:"animation",name:"Enable animations",nameParent:"Appearance",label:"Enables micro animations throughout the app"}]},{name:"Queries",id:"queries",children:[{id:"amount",name:"Post amount",nameParent:"Queries",label:"Maximum number of displayed posts per page"}]}]}],entriesActions:{},entriesEditing:{},entriesFav:JSON.parse(null!==(fe=null===(de=null===window||void 0===window?void 0:window.streamlineData)||void 0===de?void 0:de.favourites)&&void 0!==fe?fe:"[]"),entriesFavActive:JSON.parse(null!==(he=null===(me=null===window||void 0===window?void 0:window.streamlineData)||void 0===me?void 0:me.favourites)&&void 0!==he?he:"[]"),entriesMenu:[],entriesMenuCurrentPath:"",entriesNetworkMenu:[],entriesPost:[],entriesPostActive:[],entriesPostCurrentPage:1,entriesPostCurrentPath:"",entriesPostQuery:"",entriesPostTotal:0,entriesSearch:[],entriesSearchActive:[],entriesSettingsActive:[],entriesSettingsHaveChanged:!1,entriesSettingsLoad:{keys:{navigation:!0,navigationTabs:!0,search:!0,exit:!0},appearance:{animation:!0},query:{amount:20}},entriesSettingsSave:{},entriesSite:[],entriesSiteActive:[],entriesSiteCurrentPage:1,entriesSiteQuery:"",entriesSiteTotal:0,infoBar:{pages:1,amount:1},isEnter:!1,isLoading:!1,isMac:-1!==navigator.userAgent.indexOf("Mac OS X"),isSearchFocus:!0,isVisible:!1,scroll:0,searchPlaceholder:"",searchNoValue:"No entries found",searchValue:"",sort:{post:{},site:{}},test:(null===(pe=document.querySelector("streamline-container"))||void 0===pe?void 0:pe.hasAttribute("test"))||!1},void 0);return e.use((()=>{const e=new Map;return{dispose:()=>e.clear(),get:t=>{s&&((e,t,n)=>{const s=e.get(t);s?s.includes(n)||s.push(n):e.set(t,[n])})(e,t,s)},set:t=>{const n=e.get(t);n&&e.set(t,n.filter(D)),ce(e)},reset:()=>{e.forEach((e=>e.forEach(D))),ce(e)}}})()),e})();ye("isVisible",(e=>{(e=>{const t=["position","overflow","left","top","width"];!0===e?(t.forEach((e=>{const t=document.body.style[e];t&&(we.bodyStyle=Object.assign(Object.assign({},we.bodyStyle),{[e]:t}))})),we.scroll=window.scrollY,document.body.style.overflow="hidden",document.body.style.left="0",document.body.style.top="0",document.body.style.width="100%"):(t.forEach((e=>{we.bodyStyle[e]?document.body.style[e]=we.bodyStyle[e]:document.body.style.removeProperty(e)})),window.scrollTo(0,we.scroll))})(e)})),we.entriesSettingsActive=we.entriesSettings,we.entriesSettingsSave=we.entriesSettingsLoad;const ve=e=>e[0].toUpperCase()+e.slice(1),ge=()=>{we.searchPlaceholder="post"===we.active||"site"===we.active?Object.values(we["entries"+ve(we.active)]).length>=1?`Search for a ${we.active} or filter entries`:"Search for a "+we.active:"search"===we.active?"Search or filter entries":"Filter entries"};export{y as H,ge as a,J as b,ve as c,E as g,p as h,ye as o,a as p,_ as r,we as s}