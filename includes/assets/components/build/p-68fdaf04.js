import{s as e}from"./p-e24a7e82.js";import{d as s}from"./p-34629754.js";import{h as t}from"./p-0f8b05c7.js";const o=t=>{var o;e.isLoading=!0,fetch(`${null===(o=null===window||void 0===window?void 0:window.streamline)||void 0===o?void 0:o.rest}streamline/v1/${t.route}?siteId=${e.currentSite.id}&userId=${e.data.userId}&type=${t.type}&values=${JSON.stringify(t.values)}`,s("POST")).then((e=>e&&e.json())).then((()=>{e.isLoading=!1,t.callback&&t.callback()})).catch((()=>{e.isLoading=!1}))},a=({keys:s})=>t("div",{class:"flex space-x-1.5"},s.map((s=>t("div",{style:{boxShadow:"0 2px 0 0 #E2E8F0"},class:"key leading-0 relative -top-px h-[max-content] rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium uppercase text-slate-800"},t("kbd",{class:"!font-sans !text-[11px]"},e.isMac&&"Meta"===s?"⌘":e.isMac||"Meta"!==s?s:"CTRL")))));export{a as K,o as p}