import{s as o,a}from"./p-63b42aad.js";const r=a=>o.isMac?a.metaKey:a.ctrlKey,s=function(){document.addEventListener("keydown",(a=>{"k"===a.key&&r(a)&&(a.preventDefault(),o.isVisible=!o.isVisible),o.isVisible&&("ArrowUp"===a.key&&r(a)&&o.entriesSettingsLoad.keys.navigationTabs&&a.preventDefault(),"ArrowDown"===a.key&&r(a)&&o.entriesSettingsLoad.keys.navigationTabs&&a.preventDefault(),"Escape"===a.key&&o.entriesSettingsLoad.keys.exit&&(a.preventDefault(),o.isVisible=!1))})),a()};export{s as g}