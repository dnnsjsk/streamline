import{r as e,h as n,H as t}from"./p-5dadf619.js";import{s as i}from"./p-3f6fc400.js";import{s as o,a as r}from"./p-5c5baf61.js";
/*!
 * hotkeys-js v3.8.7
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */var a="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function s(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent&&e.attachEvent("on".concat(n),(function(){t(window.event)}))}function c(e,n){for(var t=n.slice(0,n.length-1),i=0;i<t.length;i++)t[i]=e[t[i].toLowerCase()];return t}function f(e){"string"!=typeof e&&(e="");for(var n=(e=e.replace(/\s/g,"")).split(","),t=n.lastIndexOf("");t>=0;)n[t-1]+=",",n.splice(t,1),t=n.lastIndexOf("");return n}for(var l={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":a?173:189,"=":a?61:187,";":a?59:186,"'":222,"[":219,"]":221,"\\":220},u={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},d={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},m={16:!1,18:!1,17:!1,91:!1},p={},v=1;v<20;v++)l["f".concat(v)]=111+v;var h=[],b="all",w=[],y=function(e){return l[e.toLowerCase()]||u[e.toLowerCase()]||e.toUpperCase().charCodeAt(0)};function g(e){b=e||"all"}function x(){return b||"all"}var k=function(e){var n=e.scope,t=e.method,i=e.splitKey,o=void 0===i?"+":i;f(e.key).forEach((function(e){var i=e.split(o),r=i.length,a=i[r-1],s="*"===a?"*":y(a);if(p[s]){n||(n=x());var f=r>1?c(u,i):[];p[s]=p[s].map((function(e){return t&&e.method!==t||e.scope!==n||!function(e,n){for(var t=e.length>=n.length?e:n,i=e.length>=n.length?n:e,o=!0,r=0;r<t.length;r++)-1===i.indexOf(t[r])&&(o=!1);return o}(e.mods,f)?e:{}}))}}))};function _(e,n,t){var i;if(n.scope===t||"all"===n.scope){for(var o in i=n.mods.length>0,m)Object.prototype.hasOwnProperty.call(m,o)&&(!m[o]&&n.mods.indexOf(+o)>-1||m[o]&&-1===n.mods.indexOf(+o))&&(i=!1);(0!==n.mods.length||m[16]||m[18]||m[17]||m[91])&&!i&&"*"!==n.shortcut||!1===n.method(e,n)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}function z(e){var n=p["*"],t=e.keyCode||e.which||e.charCode;if(K.filter.call(this,e)){if(93!==t&&224!==t||(t=91),-1===h.indexOf(t)&&229!==t&&h.push(t),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(n){var t=d[n];e[n]&&-1===h.indexOf(t)?h.push(t):!e[n]&&h.indexOf(t)>-1?h.splice(h.indexOf(t),1):"metaKey"===n&&e[n]&&3===h.length&&(e.ctrlKey||e.shiftKey||e.altKey||(h=h.slice(h.indexOf(t))))})),t in m){for(var i in m[t]=!0,u)u[i]===t&&(K[i]=!0);if(!n)return}for(var o in m)Object.prototype.hasOwnProperty.call(m,o)&&(m[o]=e[d[o]]);e.getModifierState&&(!e.altKey||e.ctrlKey)&&e.getModifierState("AltGraph")&&(-1===h.indexOf(17)&&h.push(17),-1===h.indexOf(18)&&h.push(18),m[17]=!0,m[18]=!0);var r=x();if(n)for(var a=0;a<n.length;a++)n[a].scope===r&&("keydown"===e.type&&n[a].keydown||"keyup"===e.type&&n[a].keyup)&&_(e,n[a],r);if(t in p)for(var s=0;s<p[t].length;s++)if(("keydown"===e.type&&p[t][s].keydown||"keyup"===e.type&&p[t][s].keyup)&&p[t][s].key){for(var c=p[t][s],f=c.key.split(c.splitKey),l=[],v=0;v<f.length;v++)l.push(y(f[v]));l.sort().join("")===h.sort().join("")&&_(e,c,r)}}}function K(e,n,t){h=[];var i=f(e),o=[],r="all",a=document,l=0,d=!1,v=!0,b="+";for(void 0===t&&"function"==typeof n&&(t=n),"[object Object]"===Object.prototype.toString.call(n)&&(n.scope&&(r=n.scope),n.element&&(a=n.element),n.keyup&&(d=n.keyup),void 0!==n.keydown&&(v=n.keydown),"string"==typeof n.splitKey&&(b=n.splitKey)),"string"==typeof n&&(r=n);l<i.length;l++)o=[],(e=i[l].split(b)).length>1&&(o=c(u,e)),(e="*"===(e=e[e.length-1])?"*":y(e))in p||(p[e]=[]),p[e].push({keyup:d,keydown:v,scope:r,mods:o,shortcut:i[l],method:t,key:i[l],splitKey:b});void 0!==a&&!function(e){return w.indexOf(e)>-1}(a)&&window&&(w.push(a),s(a,"keydown",(function(e){z(e)})),s(window,"focus",(function(){h=[]})),s(a,"keyup",(function(e){z(e),function(e){var n=e.keyCode||e.which||e.charCode,t=h.indexOf(n);if(t>=0&&h.splice(t,1),e.key&&"meta"===e.key.toLowerCase()&&h.splice(0,h.length),93!==n&&224!==n||(n=91),n in m)for(var i in m[n]=!1,u)u[i]===n&&(K[i]=!1)}(e)})))}var j={setScope:g,getScope:x,deleteScope:function(e,n){var t,i;for(var o in e||(e=x()),p)if(Object.prototype.hasOwnProperty.call(p,o))for(t=p[o],i=0;i<t.length;)t[i].scope===e?t.splice(i,1):i++;x()===e&&g(n||"all")},getPressedKeyCodes:function(){return h.slice(0)},isPressed:function(e){return"string"==typeof e&&(e=y(e)),-1!==h.indexOf(e)},filter:function(e){var n=e.target||e.srcElement,t=n.tagName,i=!0;return!n.isContentEditable&&("INPUT"!==t&&"TEXTAREA"!==t&&"SELECT"!==t||n.readOnly)||(i=!1),i},unbind:function(e){if(e){if(Array.isArray(e))e.forEach((function(e){e.key&&k(e)}));else if("object"==typeof e)e.key&&k(e);else if("string"==typeof e){for(var n=arguments.length,t=new Array(n>1?n-1:0),i=1;i<n;i++)t[i-1]=arguments[i];var o=t[0],r=t[1];"function"==typeof o&&(r=o,o=""),k({key:e,scope:o,method:r,splitKey:"+"})}}else Object.keys(p).forEach((function(e){return delete p[e]}))}};for(var T in j)Object.prototype.hasOwnProperty.call(j,T)&&(K[T]=j[T]);if("undefined"!=typeof window){var I=window.hotkeys;K.noConflict=function(e){return e&&window.hotkeys===K&&(window.hotkeys=I),K},window.hotkeys=K}const L=class{constructor(n){e(this,n)}componentDidLoad(){K("command+k",(function(){return i.visible=!i.visible,!1}));const e=i.data.menu.top,n=i.data.menu.sub;let t=[];const a=[];function s(e,n){return e===n&&e.includes(".php")?e:n.includes(".php")&&!n.includes("/")?n:e.includes("post_type")?`${e}&page=${n}`:e.includes(".php")||e.includes("/")?`${e}?page=${n}`:`admin.php?page=${e}`}Object.entries(e).forEach((([n,t])=>{"wp-menu-separator"===t[4]&&delete e[n]})),Object.values(e).forEach(((e,t)=>{const i=[],r=e[0].trim(),c=s(e[2],e[2]);n[e[2]]?Object.values(n[e[2]]).forEach(((n,t)=>{const a=n[0].trim(),c=s(e[2],n[2]);i.push({index:t,type:"menu",name:a,nameParent:r,href:c,favourite:!!o.menuFavourites.includes(c)})})):i.push({index:0,type:"menu",name:r,nameParent:r,href:c,favourite:!!o.menuFavourites.includes(c)}),a.push({index:t,name:r,children:i})})),t=[...t,{index:0,type:"menu",name:"Navigate to",children:a}],document.querySelectorAll(".menu-top > a").forEach((e=>{const n=e.innerText.replace(/(\r\n|\n|\r)/gm,""),t=e.closest("li.menu-top"),i=[];if(t){const e=t.querySelectorAll("a");e.forEach(((t,r)=>{if(0!==r&&e.length>=2||0===r&&1===e.length){const a=t.innerText.replace(/(\r\n|\n|\r)/gm,""),s=t.getAttribute("href");i.push({index:1===e.length?r:r-1,type:"menu",name:a,nameParent:n,href:s,favourite:!!o.menuFavourites.includes(s)})}}))}})),i.entries=t,i.entriesActive=t,r()}render(){return n(t,null,i.visible&&n("div",{class:"fixed top-0 left-0 w-full h-full z-[9999999999999999]"},n("div",{tabIndex:-1,class:"fixed top-0 left-0 w-full h-full bg-black/90",onClick:()=>i.visible=!1}),n("streamline-box",null)))}};L.style=":host{display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{border:0 solid;box-sizing:border-box}.visible{visibility:visible}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}sub{bottom:-.25em;font-size:75%;line-height:0;position:relative;vertical-align:baseline}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.fixed{position:fixed}.top-0{top:0}.left-0{left:0}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-full{height:100%}.w-full{width:100%}.bg-black\\/90{background-color:rgba(0,0,0,.9)}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";export{L as streamline_container}