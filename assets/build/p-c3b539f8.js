import{c as e,s as t,f as o,g as n}from"./p-46d26ccf.js";const r=(e,t)=>{try{return JSON.parse(e.getItem(t))}catch(e){return null}},s=(t,o,n,s=!1)=>{var a;const u=e(null!=(a=r(t,o))?a:n),l=(()=>{let e=!1;return()=>{e||(e=!0,setTimeout((()=>{t.setItem(o,JSON.stringify(u.state)),e=!1}),0))}})();return l(),s&&window.addEventListener("storage",(()=>{const e=r(t,o);if(null!==e)for(const t in e)u.set(t,e[t])})),u.use({set:l,reset:l}),u},{state:a,onChange:u}=((e,t,o=!1)=>s(localStorage,"streamline",{active:"menu",menuMode:"",menuFavourites:[],flowMode:"",flowFavourites:[]},o))();function l(){t.entriesActive=o(t.entries.filter((e=>0!==Object.keys(e).length)),(e=>{const o=o=>a.active===o&&(e.type===a.active&&e.name.toLowerCase().includes(t.searchValue.toLowerCase())||e.type===a.active&&e.nameParent&&e.nameParent.toLowerCase().includes(t.searchValue.toLowerCase()))&&("favourite"!==a[o+"Mode"]||!0===e.favourite),r=e=>a.active===e&&null===n(t.entries,e),s=o("menu")&&e.href,u=o("flow");return r("menu")?(a.menuMode="",s):r("flow")?(a.flowMode="",u):s||u}),{childrenPath:["children"]})}u("active",(e=>{a.active=e})),u("menuMode",(e=>{a.menuMode=e})),u("menuFavourites",(e=>{a.menuFavourites=e})),u("flowMode",(e=>{a.flowMode=e})),u("flowFavourites",(e=>{a.flowFavourites=e}));export{l as a,a as s}