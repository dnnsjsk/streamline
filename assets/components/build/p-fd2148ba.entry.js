import{r as n,h as e}from"./p-d400ff21.js";import{s as t}from"./p-f4b0e495.js";
/*!
 * hotkeys-js v3.8.7
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */var o="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function i(n,e,t){n.addEventListener?n.addEventListener(e,t,!1):n.attachEvent&&n.attachEvent("on".concat(e),(function(){t(window.event)}))}function r(n,e){for(var t=e.slice(0,e.length-1),o=0;o<t.length;o++)t[o]=n[t[o].toLowerCase()];return t}function a(n){"string"!=typeof n&&(n="");for(var e=(n=n.replace(/\s/g,"")).split(","),t=e.lastIndexOf("");t>=0;)e[t-1]+=",",e.splice(t,1),t=e.lastIndexOf("");return e}for(var f={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":o?173:189,"=":o?61:187,";":o?59:186,"'":222,"[":219,"]":221,"\\":220},s={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},c={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},u={16:!1,18:!1,17:!1,91:!1},l={},d=1;d<20;d++)f["f".concat(d)]=111+d;var m=[],p="all",v=[],w=function(n){return f[n.toLowerCase()]||s[n.toLowerCase()]||n.toUpperCase().charCodeAt(0)};function b(n){p=n||"all"}function y(){return p||"all"}var h=function(n){var e=n.scope,t=n.method,o=n.splitKey,i=void 0===o?"+":o;a(n.key).forEach((function(n){var o=n.split(i),a=o.length,f=o[a-1],c="*"===f?"*":w(f);if(l[c]){e||(e=y());var u=a>1?r(s,o):[];l[c]=l[c].map((function(n){return t&&n.method!==t||n.scope!==e||!function(n,e){for(var t=n.length>=e.length?n:e,o=n.length>=e.length?e:n,i=!0,r=0;r<t.length;r++)-1===o.indexOf(t[r])&&(i=!1);return i}(n.mods,u)?n:{}}))}}))};function g(n,e,t){var o;if(e.scope===t||"all"===e.scope){for(var i in o=e.mods.length>0,u)Object.prototype.hasOwnProperty.call(u,i)&&(!u[i]&&e.mods.indexOf(+i)>-1||u[i]&&-1===e.mods.indexOf(+i))&&(o=!1);(0!==e.mods.length||u[16]||u[18]||u[17]||u[91])&&!o&&"*"!==e.shortcut||!1===e.method(n,e)&&(n.preventDefault?n.preventDefault():n.returnValue=!1,n.stopPropagation&&n.stopPropagation(),n.cancelBubble&&(n.cancelBubble=!0))}}function x(n){var e=l["*"],t=n.keyCode||n.which||n.charCode;if(k.filter.call(this,n)){if(93!==t&&224!==t||(t=91),-1===m.indexOf(t)&&229!==t&&m.push(t),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(e){var t=c[e];n[e]&&-1===m.indexOf(t)?m.push(t):!n[e]&&m.indexOf(t)>-1?m.splice(m.indexOf(t),1):"metaKey"===e&&n[e]&&3===m.length&&(n.ctrlKey||n.shiftKey||n.altKey||(m=m.slice(m.indexOf(t))))})),t in u){for(var o in u[t]=!0,s)s[o]===t&&(k[o]=!0);if(!e)return}for(var i in u)Object.prototype.hasOwnProperty.call(u,i)&&(u[i]=n[c[i]]);n.getModifierState&&(!n.altKey||n.ctrlKey)&&n.getModifierState("AltGraph")&&(-1===m.indexOf(17)&&m.push(17),-1===m.indexOf(18)&&m.push(18),u[17]=!0,u[18]=!0);var r=y();if(e)for(var a=0;a<e.length;a++)e[a].scope===r&&("keydown"===n.type&&e[a].keydown||"keyup"===n.type&&e[a].keyup)&&g(n,e[a],r);if(t in l)for(var f=0;f<l[t].length;f++)if(("keydown"===n.type&&l[t][f].keydown||"keyup"===n.type&&l[t][f].keyup)&&l[t][f].key){for(var d=l[t][f],p=d.key.split(d.splitKey),v=[],b=0;b<p.length;b++)v.push(w(p[b]));v.sort().join("")===m.sort().join("")&&g(n,d,r)}}}function k(n,e,t){m=[];var o=a(n),f=[],c="all",d=document,p=0,b=!1,y=!0,h="+";for(void 0===t&&"function"==typeof e&&(t=e),"[object Object]"===Object.prototype.toString.call(e)&&(e.scope&&(c=e.scope),e.element&&(d=e.element),e.keyup&&(b=e.keyup),void 0!==e.keydown&&(y=e.keydown),"string"==typeof e.splitKey&&(h=e.splitKey)),"string"==typeof e&&(c=e);p<o.length;p++)f=[],(n=o[p].split(h)).length>1&&(f=r(s,n)),(n="*"===(n=n[n.length-1])?"*":w(n))in l||(l[n]=[]),l[n].push({keyup:b,keydown:y,scope:c,mods:f,shortcut:o[p],method:t,key:o[p],splitKey:h});void 0!==d&&!function(n){return v.indexOf(n)>-1}(d)&&window&&(v.push(d),i(d,"keydown",(function(n){x(n)})),i(window,"focus",(function(){m=[]})),i(d,"keyup",(function(n){x(n),function(n){var e=n.keyCode||n.which||n.charCode,t=m.indexOf(e);if(t>=0&&m.splice(t,1),n.key&&"meta"===n.key.toLowerCase()&&m.splice(0,m.length),93!==e&&224!==e||(e=91),e in u)for(var o in u[e]=!1,s)s[o]===e&&(k[o]=!1)}(n)})))}var _={setScope:b,getScope:y,deleteScope:function(n,e){var t,o;for(var i in n||(n=y()),l)if(Object.prototype.hasOwnProperty.call(l,i))for(t=l[i],o=0;o<t.length;)t[o].scope===n?t.splice(o,1):o++;y()===n&&b(e||"all")},getPressedKeyCodes:function(){return m.slice(0)},isPressed:function(n){return"string"==typeof n&&(n=w(n)),-1!==m.indexOf(n)},filter:function(n){var e=n.target||n.srcElement,t=e.tagName,o=!0;return!e.isContentEditable&&("INPUT"!==t&&"TEXTAREA"!==t&&"SELECT"!==t||e.readOnly)||(o=!1),o},unbind:function(n){if(n){if(Array.isArray(n))n.forEach((function(n){n.key&&h(n)}));else if("object"==typeof n)n.key&&h(n);else if("string"==typeof n){for(var e=arguments.length,t=new Array(e>1?e-1:0),o=1;o<e;o++)t[o-1]=arguments[o];var i=t[0],r=t[1];"function"==typeof i&&(r=i,i=""),h({key:n,scope:i,method:r,splitKey:"+"})}}else Object.keys(l).forEach((function(n){return delete l[n]}))}};for(var K in _)Object.prototype.hasOwnProperty.call(_,K)&&(k[K]=_[K]);if("undefined"!=typeof window){var j=window.hotkeys;k.noConflict=function(n){return n&&window.hotkeys===k&&(window.hotkeys=j),k},window.hotkeys=k}const z=class{constructor(e){n(this,e)}componentDidLoad(){k("command+k",(function(){return t.visible=!t.visible,!1}))}render(){return t.visible&&e("div",{class:"fixed top-0 left-0 w-full h-full z-[9999999999999999]"},e("div",{tabIndex:-1,class:"fixed top-0 left-0 w-full h-full bg-black/90",onClick:()=>t.visible=!1}),e("streamline-box",null))}};z.style=":host{display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{border:0 solid;box-sizing:border-box}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.visible{visibility:visible}.fixed{position:fixed}.top-0{top:0}.left-0{left:0}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-full{height:100%}.w-full{width:100%}.bg-black\\/90{background-color:rgba(0,0,0,.9)}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";export{z as streamline_container}