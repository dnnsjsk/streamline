import{g as e,f as t}from"./p-cc400426.js";const n=e=>!("isConnected"in e)||e.isConnected,s=(()=>{let e;return(...t)=>{e&&clearTimeout(e),e=setTimeout((()=>{e=0,(e=>{for(let t of e.keys())e.set(t,e.get(t).filter(n))})(...t)}),2e3)}})(),o=(n,o)=>{const r=((e,t=((e,t)=>e!==t))=>{let n=new Map(Object.entries(null!=e?e:{}));const s={dispose:[],get:[],set:[],reset:[]},o=()=>{n=new Map(Object.entries(null!=e?e:{})),s.reset.forEach((e=>e()))},r=e=>(s.get.forEach((t=>t(e))),n.get(e)),a=(e,o)=>{const r=n.get(e);t(o,r,e)&&(n.set(e,o),s.set.forEach((t=>t(e,o,r))))},i="undefined"==typeof Proxy?{}:new Proxy(e,{get:(e,t)=>r(t),ownKeys:()=>Array.from(n.keys()),getOwnPropertyDescriptor:()=>({enumerable:!0,configurable:!0}),has:(e,t)=>n.has(t),set:(e,t,n)=>(a(t,n),!0)}),c=(e,t)=>(s[e].push(t),()=>{((e,t)=>{const n=e.indexOf(t);n>=0&&(e[n]=e[e.length-1],e.length--)})(s[e],t)});return{state:i,get:r,set:a,on:c,onChange:(t,n)=>{const s=c("set",((e,s)=>{e===t&&n(s)})),o=c("reset",(()=>n(e[t])));return()=>{s(),o()}},use:(...e)=>e.forEach((e=>{e.set&&c("set",e.set),e.get&&c("get",e.get),e.reset&&c("reset",e.reset)})),dispose:()=>{s.dispose.forEach((e=>e())),o()},reset:o,forceUpdate:e=>{const t=n.get(e);s.set.forEach((n=>n(e,t,t)))}}})(n,o);return(({on:n})=>{const o=new Map;"function"==typeof e&&(n("dispose",(()=>{o.clear()})),n("get",(t=>{const n=e();n&&((e,t,n)=>{const s=e.get(t);s?s.includes(n)||s.push(n):e.set(t,[n])})(o,t,n)})),n("set",(e=>{const n=o.get(e);n&&o.set(e,n.filter(t)),s(o)})),n("reset",(()=>{o.forEach((e=>e.forEach(t))),s(o)})))})(r),r},{state:r}=o({data:window.streamlineData,class:{tag:"px-2.5 py-1.5 bg-gray-200 text-gray-500 inline-block h-[max-content] leading-1"},menu:{fav:{name:"fav"},menu:{name:"menu",commands:["/site"]},post:{name:"post"}},commands:{local:{site:{name:"/site [name]",description:"Display entries from a different site in the network.",callback:"get_sites"}}},entriesFav:JSON.parse(window.streamlineData.favourites),entriesFavActive:JSON.parse(window.streamlineData.favourites),entriesMenu:[],entriesMenuActive:[],entriesPost:[],entriesPostActive:[],entriesSite:[],isEnter:!1,isLoading:!1,isSites:!1,isSlash:!1,searchNoValue:"No entries found",searchPlaceholder:"",searchValue:"",visible:!0}),a=(e,t)=>{try{return JSON.parse(e.getItem(t))}catch(e){return null}},i=(e,t,n,s=!1)=>{var r;const i=o(null!=(r=a(e,t))?r:n),c=(()=>{let n=!1;return()=>{n||(n=!0,setTimeout((()=>{e.setItem(t,JSON.stringify(i.state)),n=!1}),0))}})();return c(),s&&window.addEventListener("storage",(()=>{const n=a(e,t);if(null!==n)for(const e in n)i.set(e,n[e])})),i.use({set:c,reset:c}),i},{state:c,onChange:l}=((e,t,n=!1)=>i(localStorage,"streamline",{active:"menu"},n))();function u(){var e;return(null===(e=r.menu[c.active].commands)||void 0===e?void 0:e.length)>=1}function m(){const e=u()?" or type '/' for available commands":"";r.searchPlaceholder="post"===c.active?`Search for a post${e}`:`Search entries${e}`}l("active",(()=>{m()}));export{r as a,c as b,u as i,m as s}