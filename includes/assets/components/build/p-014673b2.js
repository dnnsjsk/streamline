import{s as n,a as e}from"./p-1ad3f854.js";import{r as t}from"./p-d6d0abfb.js";const a=()=>{const t=[...n.entriesActions,...n.entriesMenu,...n.entriesNetworkMenu];n.entriesSearch=t,n.entriesSearchActive=t,n.entriesFavActive=n.entriesFav,n.entriesSiteActive=n.entriesSite,e()},r=(e={})=>{let r=[];const o={},m=document.querySelector("#adminmenuwrap")&&(e.network&&n.data.isNetwork||!e.network&&n.data.isAdmin&&!n.data.isNetwork),i=e.network,s=!!n.data.network,d=e.adminUrl||(i?n.data.network:n.data.adminUrl),u=e.siteId||(i?0:n.data.siteId),c=!e.path&&i?"networkMenu":"menu";function p(t){t.querySelectorAll(".menu-top > a").forEach(((n,e)=>{const t=n.innerText.replace(/(\r\n|\n|\r)/gm,""),a=n.closest("li.menu-top"),r={};if(a){const n=a.querySelectorAll("a");n.forEach(((e,a)=>{var o;if(0!==a&&n.length>=2||0===a&&1===n.length){const m=null===(o=[...e.childNodes].find((n=>n.nodeType===Node.TEXT_NODE)))||void 0===o?void 0:o.textContent.trim(),i=e.querySelector(".update-count")?m+` (${e.querySelector(".update-count").innerHTML})`:e.innerText.replace(/(\r\n|\n|\r)/gm,""),s=e.getAttribute("href");r[s]={adminUrl:d,href:d+s,index:1===n.length?a:a-1,name:i,nameParent:t,path:s,siteId:Number(u),type:c}}}))}o[t]={index:e,name:t,children:r}})),r=[{adminUrl:d,children:o,isMultisite:s,path:e.path||n.currentSite.path,siteId:Number(u),type:c}],i?n.entriesNetworkMenu=r:n.entriesMenu=r,a()}m&&!e.fetch?(p(document),e.callback&&e.callback()):(n.isLoading=!0,fetch(d).then((n=>n.text&&n.text())).then((n=>{p((new DOMParser).parseFromString(n,"text/html")),t(),e.callback&&e.callback()})).catch((()=>{})))};export{r as g,a as s}