import{s as n,r as e,b as t,a as r}from"./p-9b67936c.js";function a(r={}){let a=[];const o={},i=document.querySelector("#adminmenuwrap")&&(r.network&&n.data.isNetwork||!r.network&&n.data.isAdmin&&!n.data.isNetwork),u=r.network,m=!!n.data.network,s=r.adminUrl||(u?n.data.network:n.data.adminUrl),d=r.siteId||(u?0:n.data.siteId),c=!r.path&&u?"networkMenu":"menu";function p(e){e.querySelectorAll(".menu-top > a").forEach(((n,e)=>{const t=n.innerText.replace(/(\r\n|\n|\r)/gm,""),r=n.closest("li.menu-top"),a={};if(r){const n=r.querySelectorAll("a");n.forEach(((e,r)=>{var o;if(0!==r&&n.length>=2||0===r&&1===n.length){const i=null===(o=[...e.childNodes].find((n=>n.nodeType===Node.TEXT_NODE)))||void 0===o?void 0:o.textContent.trim(),u=e.querySelector(".update-count")?i+` (${e.querySelector(".update-count").innerHTML})`:e.innerText.replace(/(\r\n|\n|\r)/gm,""),m=e.getAttribute("href");a[m]={adminUrl:s,href:s+m,index:1===n.length?r:r-1,name:u,nameParent:t,path:m,siteId:Number(d),type:c}}}))}o[t]={index:e,name:t,children:a}})),a=[{adminUrl:s,children:o,isMultisite:m,path:r.path||n.currentSite.path,siteId:Number(d),type:c}],u?(n.entriesNetworkMenu=a,n.entriesNetworkMenuActive=a):(n.entriesMenu=a,n.entriesMenuActive=a,n.entriesMenuCurrentPath=r.path||n.currentSite.path),t()}i&&!r.fetch?p(document):(n.isLoading=!0,fetch(s).then((n=>n.text&&n.text())).then((n=>{p((new DOMParser).parseFromString(n,"text/html")),e()})).catch((()=>{})))}function o(){n.test||("menu"===r.active&&0===n.entriesMenu.length&&a({network:!1,adminUrl:n.data.adminUrl}),"networkMenu"===r.active&&0===n.entriesNetworkMenu.length&&a({network:!0}))}function i(e){return n.isMac?e.metaKey:e.ctrlKey}export{i as a,a as b,o as g}