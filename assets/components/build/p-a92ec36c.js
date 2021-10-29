import{g as n,e as t,a as e,r,s as o,c as i,h as u,d as a,m as c,u as f,j as s}from"./p-0c915939.js";import{h as d}from"./p-f5f7f724.js";function l(t){const e=n(t);return function(n,r,o){let i;return r=t.iteratee(r),o?void 0!==(o=t.cloneDeep(o)).leafsOnly&&(o.leavesOnly=o.leafsOnly):o={},o=t.merge({checkCircular:!1,leavesOnly:void 0===o.childrenPath,pathFormat:"string"},o),e(n,((n,t,e,o)=>{if(r(n,t,e,o))return i={value:n,key:t,parent:e,context:o},o.break()}),{pathFormat:o.pathFormat,checkCircular:o.checkCircular,ownPropertiesOnly:o.ownPropertiesOnly,childrenPath:o.childrenPath,includeRoot:o.includeRoot,rootIsChildren:o.rootIsChildren,callbackAfterIterate:!1,leavesOnly:o.leavesOnly}),i}}const p=l(t),v=function(){const n=l(t);return function(t,e,r){return!!n(t,e,r)}}();function m(n={}){let t=[];const u={},a=document.querySelector("#adminmenuwrap")&&!n.adminUrl&&!n.network,c=n.network||e.data.isNetwork,f=!!e.data.network,s=n.adminUrl||(c?e.data.network:e.data.adminUrl),d=n.siteId||(c?0:e.data.siteId),l=!n.path&&c?"networkMenu":"menu";function p(r){r.querySelectorAll(".menu-top > a").forEach(((n,t)=>{const e=n.innerText.replace(/(\r\n|\n|\r)/gm,""),r=n.closest("li.menu-top"),o={};if(r){const n=r.querySelectorAll("a");n.forEach(((t,r)=>{if(0!==r&&n.length>=2||0===r&&1===n.length){const i=t.innerText.replace(/(\r\n|\n|\r)/gm,""),u=t.getAttribute("href");o[u]={adminUrl:s,href:s+u,index:1===n.length?r:r-1,name:i,nameParent:e,path:u,siteId:Number(d),type:l}}}))}u[e]={index:t,name:e,children:o}})),t=[{adminUrl:s,children:u,isMultisite:f,path:n.path||e.data.path,siteId:Number(d),type:l}],e.entriesMenu=t,e.entriesMenuActive=t,e.entriesMenuCurrentPath=n.path||e.data.path,e.entriesMenuIsNetwork=n.network,i()}a?p(document):(e.isLoading=!0,fetch(s).then((n=>n.text&&n.text())).then((n=>{p((new DOMParser).parseFromString(n,"text/html")),r(),o.active="menu"})).catch((n=>console.log(n))))}function h(n){return d("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false","data-prefix":"far","data-icon":"spinner-third",class:(n.sm?"h-6 w-6 sm:h-7 sm:w-7":"w-10 h-10")+" animate-spin",role:"img",viewBox:"0 0 512 512"},d("path",{fill:"currentColor",d:"M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"}))}function b(n){for(var t=-1,e=null==n?0:n.length,r=0,o=[];++t<e;){var i=n[t];i&&(o[r++]=i)}return o}var y="top",w="bottom",g="right",O="left",x=[y,w,g,O],j=x.reduce((function(n,t){return n.concat([t+"-start",t+"-end"])}),[]),k=[].concat(x,["auto"]).reduce((function(n,t){return n.concat([t,t+"-start",t+"-end"])}),[]),T=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function M(n){return n?(n.nodeName||"").toLowerCase():null}function C(n){if(null==n)return window;if("[object Window]"!==n.toString()){var t=n.ownerDocument;return t&&t.defaultView||window}return n}function S(n){return n instanceof C(n).Element||n instanceof Element}function P(n){return n instanceof C(n).HTMLElement||n instanceof HTMLElement}function A(n){return"undefined"!=typeof ShadowRoot&&(n instanceof C(n).ShadowRoot||n instanceof ShadowRoot)}const B={name:"applyStyles",enabled:!0,phase:"write",fn:function(n){var t=n.state;Object.keys(t.elements).forEach((function(n){var e=t.styles[n]||{},r=t.attributes[n]||{},o=t.elements[n];P(o)&&M(o)&&(Object.assign(o.style,e),Object.keys(r).forEach((function(n){var t=r[n];!1===t?o.removeAttribute(n):o.setAttribute(n,!0===t?"":t)})))}))},effect:function(n){var t=n.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach((function(n){var r=t.elements[n],o=t.attributes[n]||{},i=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]).reduce((function(n,t){return n[t]="",n}),{});P(r)&&M(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(n){r.removeAttribute(n)})))}))}},requires:["computeStyles"]};function E(n){return n.split("-")[0]}function q(n){var t=n.getBoundingClientRect();return{width:t.width/1,height:t.height/1,top:t.top/1,right:t.right/1,bottom:t.bottom/1,left:t.left/1,x:t.left/1,y:t.top/1}}function I(n){var t=q(n),e=n.offsetWidth,r=n.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:n.offsetLeft,y:n.offsetTop,width:e,height:r}}function H(n,t){var e=t.getRootNode&&t.getRootNode();if(n.contains(t))return!0;if(e&&A(e)){var r=t;do{if(r&&n.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function R(n){return C(n).getComputedStyle(n)}function U(n){return["table","td","th"].indexOf(M(n))>=0}function L(n){return((S(n)?n.ownerDocument:n.document)||window.document).documentElement}function $(n){return"html"===M(n)?n:n.assignedSlot||n.parentNode||(A(n)?n.host:null)||L(n)}function F(n){return P(n)&&"fixed"!==R(n).position?n.offsetParent:null}function W(n){for(var t=C(n),e=F(n);e&&U(e)&&"static"===R(e).position;)e=F(e);return e&&("html"===M(e)||"body"===M(e)&&"static"===R(e).position)?t:e||function(n){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&P(n)&&"fixed"===R(n).position)return null;for(var e=$(n);P(e)&&["html","body"].indexOf(M(e))<0;){var r=R(e);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return e;e=e.parentNode}return null}(n)||t}function D(n){return["top","bottom"].indexOf(n)>=0?"x":"y"}var z=Math.max,N=Math.min,V=Math.round;function J(n,t,e){return z(n,N(t,e))}function Q(n){return Object.assign({},{top:0,right:0,bottom:0,left:0},n)}function _(n,t){return t.reduce((function(t,e){return t[e]=n,t}),{})}function G(n){return n.split("-")[1]}var K={top:"auto",right:"auto",bottom:"auto",left:"auto"};function X(n){var t,e=n.popper,r=n.popperRect,o=n.placement,i=n.variation,u=n.offsets,a=n.position,c=n.gpuAcceleration,f=n.adaptive,s=n.roundOffsets,d=!0===s?function(n){var t=n.y,e=window.devicePixelRatio||1;return{x:V(V(n.x*e)/e)||0,y:V(V(t*e)/e)||0}}(u):"function"==typeof s?s(u):u,l=d.x,p=void 0===l?0:l,v=d.y,m=void 0===v?0:v,h=u.hasOwnProperty("x"),b=u.hasOwnProperty("y"),x=O,j=y,k=window;if(f){var T=W(e),M="clientHeight",S="clientWidth";T===C(e)&&"static"!==R(T=L(e)).position&&"absolute"===a&&(M="scrollHeight",S="scrollWidth"),T=T,o!==y&&(o!==O&&o!==g||"end"!==i)||(j=w,m-=T[M]-r.height,m*=c?1:-1),o!==O&&(o!==y&&o!==w||"end"!==i)||(x=g,p-=T[S]-r.width,p*=c?1:-1)}var P,A=Object.assign({position:a},f&&K);return Object.assign({},A,c?((P={})[j]=b?"0":"",P[x]=h?"0":"",P.transform=(k.devicePixelRatio||1)<=1?"translate("+p+"px, "+m+"px)":"translate3d("+p+"px, "+m+"px, 0)",P):((t={})[j]=b?m+"px":"",t[x]=h?p+"px":"",t.transform="",t))}var Y={passive:!0},Z={left:"right",right:"left",bottom:"top",top:"bottom"};function nn(n){return n.replace(/left|right|bottom|top/g,(function(n){return Z[n]}))}var tn={start:"end",end:"start"};function en(n){return n.replace(/start|end/g,(function(n){return tn[n]}))}function rn(n){var t=C(n);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function on(n){return q(L(n)).left+rn(n).scrollLeft}function un(n){var t=R(n);return/auto|scroll|overlay|hidden/.test(t.overflow+t.overflowY+t.overflowX)}function an(n){return["html","body","#document"].indexOf(M(n))>=0?n.ownerDocument.body:P(n)&&un(n)?n:an($(n))}function cn(n,t){var e;void 0===t&&(t=[]);var r=an(n),o=r===(null==(e=n.ownerDocument)?void 0:e.body),i=C(r),u=o?[i].concat(i.visualViewport||[],un(r)?r:[]):r,a=t.concat(u);return o?a:a.concat(cn($(u)))}function fn(n){return Object.assign({},n,{left:n.x,top:n.y,right:n.x+n.width,bottom:n.y+n.height})}function sn(n,t){return"viewport"===t?fn(function(n){var t=C(n),e=L(n),r=t.visualViewport,o=e.clientWidth,i=e.clientHeight,u=0,a=0;return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(u=r.offsetLeft,a=r.offsetTop)),{width:o,height:i,x:u+on(n),y:a}}(n)):P(t)?function(n){var t=q(n);return t.top=t.top+n.clientTop,t.left=t.left+n.clientLeft,t.bottom=t.top+n.clientHeight,t.right=t.left+n.clientWidth,t.width=n.clientWidth,t.height=n.clientHeight,t.x=t.left,t.y=t.top,t}(t):fn(function(n){var t,e=L(n),r=rn(n),o=null==(t=n.ownerDocument)?void 0:t.body,i=z(e.scrollWidth,e.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),u=z(e.scrollHeight,e.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+on(n),c=-r.scrollTop;return"rtl"===R(o||e).direction&&(a+=z(e.clientWidth,o?o.clientWidth:0)-i),{width:i,height:u,x:a,y:c}}(L(n)))}function dn(n){var t,e=n.reference,r=n.element,o=n.placement,i=o?E(o):null,u=o?G(o):null,a=e.x+e.width/2-r.width/2,c=e.y+e.height/2-r.height/2;switch(i){case y:t={x:a,y:e.y-r.height};break;case w:t={x:a,y:e.y+e.height};break;case g:t={x:e.x+e.width,y:c};break;case O:t={x:e.x-r.width,y:c};break;default:t={x:e.x,y:e.y}}var f=i?D(i):null;if(null!=f){var s="y"===f?"height":"width";switch(u){case"start":t[f]=t[f]-(e[s]/2-r[s]/2);break;case"end":t[f]=t[f]+(e[s]/2-r[s]/2)}}return t}function ln(n,t){void 0===t&&(t={});var e=t.placement,r=void 0===e?n.placement:e,o=t.boundary,i=void 0===o?"clippingParents":o,u=t.rootBoundary,a=void 0===u?"viewport":u,c=t.elementContext,f=void 0===c?"popper":c,s=t.altBoundary,d=void 0!==s&&s,l=t.padding,p=void 0===l?0:l,v=Q("number"!=typeof p?p:_(p,x)),m=n.rects.popper,h=n.elements[d?"popper"===f?"reference":"popper":f],b=function(n,t,e){var r="clippingParents"===t?function(n){var t=cn($(n)),e=["absolute","fixed"].indexOf(R(n).position)>=0&&P(n)?W(n):n;return S(e)?t.filter((function(n){return S(n)&&H(n,e)&&"body"!==M(n)})):[]}(n):[].concat(t),o=[].concat(r,[e]),i=o.reduce((function(t,e){var r=sn(n,e);return t.top=z(r.top,t.top),t.right=N(r.right,t.right),t.bottom=N(r.bottom,t.bottom),t.left=z(r.left,t.left),t}),sn(n,o[0]));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}(S(h)?h:h.contextElement||L(n.elements.popper),i,a),O=q(n.elements.reference),j=dn({reference:O,element:m,strategy:"absolute",placement:r}),k=fn(Object.assign({},m,j)),T="popper"===f?k:O,C={top:b.top-T.top+v.top,bottom:T.bottom-b.bottom+v.bottom,left:b.left-T.left+v.left,right:T.right-b.right+v.right},A=n.modifiersData.offset;if("popper"===f&&A){var B=A[r];Object.keys(C).forEach((function(n){var t=[g,w].indexOf(n)>=0?1:-1,e=[y,w].indexOf(n)>=0?"y":"x";C[n]+=B[e]*t}))}return C}function pn(n,t){void 0===t&&(t={});var e=t.boundary,r=t.rootBoundary,o=t.padding,i=t.flipVariations,u=t.allowedAutoPlacements,a=void 0===u?k:u,c=G(t.placement),f=c?i?j:j.filter((function(n){return G(n)===c})):x,s=f.filter((function(n){return a.indexOf(n)>=0}));0===s.length&&(s=f);var d=s.reduce((function(t,i){return t[i]=ln(n,{placement:i,boundary:e,rootBoundary:r,padding:o})[E(i)],t}),{});return Object.keys(d).sort((function(n,t){return d[n]-d[t]}))}function vn(n,t,e){return void 0===e&&(e={x:0,y:0}),{top:n.top-t.height-e.y,right:n.right-t.width+e.x,bottom:n.bottom-t.height+e.y,left:n.left-t.width-e.x}}function mn(n){return[y,g,w,O].some((function(t){return n[t]>=0}))}function hn(n,t,e){void 0===e&&(e=!1);var r=P(t);P(t)&&function(n){n.getBoundingClientRect()}(t);var o,i,u=L(t),a=q(n),c={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(r||!r&&!e)&&(("body"!==M(t)||un(u))&&(c=(o=t)!==C(o)&&P(o)?{scrollLeft:(i=o).scrollLeft,scrollTop:i.scrollTop}:rn(o)),P(t)?((f=q(t)).x+=t.clientLeft,f.y+=t.clientTop):u&&(f.x=on(u))),{x:a.left+c.scrollLeft-f.x,y:a.top+c.scrollTop-f.y,width:a.width,height:a.height}}function bn(n){var t=new Map,e=new Set,r=[];function o(n){e.add(n.name),[].concat(n.requires||[],n.requiresIfExists||[]).forEach((function(n){if(!e.has(n)){var r=t.get(n);r&&o(r)}})),r.push(n)}return n.forEach((function(n){t.set(n.name,n)})),n.forEach((function(n){e.has(n.name)||o(n)})),r}var yn={placement:"bottom",modifiers:[],strategy:"absolute"};function wn(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return!t.some((function(n){return!(n&&"function"==typeof n.getBoundingClientRect)}))}function gn(n){void 0===n&&(n={});var t=n.defaultModifiers,e=void 0===t?[]:t,r=n.defaultOptions,o=void 0===r?yn:r;return function(n,t,r){void 0===r&&(r=o);var i,u,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},yn,o),modifiersData:{},elements:{reference:n,popper:t},attributes:{},styles:{}},c=[],f=!1,s={state:a,setOptions:function(r){var i="function"==typeof r?r(a.options):r;d(),a.options=Object.assign({},o,a.options,i),a.scrollParents={reference:S(n)?cn(n):n.contextElement?cn(n.contextElement):[],popper:cn(t)};var u,f,l=function(n){var t=bn(n);return T.reduce((function(n,e){return n.concat(t.filter((function(n){return n.phase===e})))}),[])}((u=[].concat(e,a.options.modifiers),f=u.reduce((function(n,t){var e=n[t.name];return n[t.name]=e?Object.assign({},e,t,{options:Object.assign({},e.options,t.options),data:Object.assign({},e.data,t.data)}):t,n}),{}),Object.keys(f).map((function(n){return f[n]}))));return a.orderedModifiers=l.filter((function(n){return n.enabled})),a.orderedModifiers.forEach((function(n){var t=n.options,e=n.effect;if("function"==typeof e){var r=e({state:a,name:n.name,instance:s,options:void 0===t?{}:t});c.push(r||function(){})}})),s.update()},forceUpdate:function(){if(!f){var n=a.elements,t=n.reference,e=n.popper;if(wn(t,e)){a.rects={reference:hn(t,W(e),"fixed"===a.options.strategy),popper:I(e)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(n){return a.modifiersData[n.name]=Object.assign({},n.data)}));for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,u=o.options;"function"==typeof i&&(a=i({state:a,options:void 0===u?{}:u,name:o.name,instance:s})||a)}else a.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(n){s.forceUpdate(),n(a)}))},function(){return u||(u=new Promise((function(n){Promise.resolve().then((function(){u=void 0,n(i())}))}))),u}),destroy:function(){d(),f=!0}};if(!wn(n,t))return s;function d(){c.forEach((function(n){return n()})),c=[]}return s.setOptions(r).then((function(n){!f&&r.onFirstUpdate&&r.onFirstUpdate(n)})),s}}var On=gn({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(n){var t=n.state,e=n.instance,r=n.options,o=r.scroll,i=void 0===o||o,u=r.resize,a=void 0===u||u,c=C(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&f.forEach((function(n){n.addEventListener("scroll",e.update,Y)})),a&&c.addEventListener("resize",e.update,Y),function(){i&&f.forEach((function(n){n.removeEventListener("scroll",e.update,Y)})),a&&c.removeEventListener("resize",e.update,Y)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(n){var t=n.state;t.modifiersData[n.name]=dn({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(n){var t=n.state,e=n.options,r=e.gpuAcceleration,o=void 0===r||r,i=e.adaptive,u=void 0===i||i,a=e.roundOffsets,c=void 0===a||a,f={placement:E(t.placement),variation:G(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,X(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:u,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,X(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},B,{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(n){var t=n.state,e=n.name,r=n.options.offset,o=void 0===r?[0,0]:r,i=k.reduce((function(n,e){return n[e]=function(n,t,e){var r=E(n),o=[O,y].indexOf(r)>=0?-1:1,i="function"==typeof e?e(Object.assign({},t,{placement:n})):e,u=i[0],a=i[1];return u=u||0,a=(a||0)*o,[O,g].indexOf(r)>=0?{x:a,y:u}:{x:u,y:a}}(e,t.rects,o),n}),{}),u=i[t.placement],a=u.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=u.x,t.modifiersData.popperOffsets.y+=a),t.modifiersData[e]=i}},{name:"flip",enabled:!0,phase:"main",fn:function(n){var t=n.state,e=n.options,r=n.name;if(!t.modifiersData[r]._skip){for(var o=e.mainAxis,i=void 0===o||o,u=e.altAxis,a=void 0===u||u,c=e.fallbackPlacements,f=e.padding,s=e.boundary,d=e.rootBoundary,l=e.altBoundary,p=e.flipVariations,v=void 0===p||p,m=e.allowedAutoPlacements,h=t.options.placement,b=E(h),x=c||(b!==h&&v?function(n){if("auto"===E(n))return[];var t=nn(n);return[en(n),t,en(t)]}(h):[nn(h)]),j=[h].concat(x).reduce((function(n,e){return n.concat("auto"===E(e)?pn(t,{placement:e,boundary:s,rootBoundary:d,padding:f,flipVariations:v,allowedAutoPlacements:m}):e)}),[]),k=t.rects.reference,T=t.rects.popper,M=new Map,C=!0,S=j[0],P=0;P<j.length;P++){var A=j[P],B=E(A),q="start"===G(A),I=[y,w].indexOf(B)>=0,H=I?"width":"height",R=ln(t,{placement:A,boundary:s,rootBoundary:d,altBoundary:l,padding:f}),U=I?q?g:O:q?w:y;k[H]>T[H]&&(U=nn(U));var L=nn(U),$=[];if(i&&$.push(R[B]<=0),a&&$.push(R[U]<=0,R[L]<=0),$.every((function(n){return n}))){S=A,C=!1;break}M.set(A,$)}if(C)for(var F=function(n){var t=j.find((function(t){var e=M.get(t);if(e)return e.slice(0,n).every((function(n){return n}))}));if(t)return S=t,"break"},W=v?3:1;W>0&&"break"!==F(W);W--);t.placement!==S&&(t.modifiersData[r]._skip=!0,t.placement=S,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(n){var t=n.state,e=n.options,r=n.name,o=e.mainAxis,i=void 0===o||o,u=e.altAxis,a=void 0!==u&&u,c=e.tether,f=void 0===c||c,s=e.tetherOffset,d=void 0===s?0:s,l=ln(t,{boundary:e.boundary,rootBoundary:e.rootBoundary,padding:e.padding,altBoundary:e.altBoundary}),p=E(t.placement),v=G(t.placement),m=!v,h=D(p),b="x"===h?"y":"x",x=t.modifiersData.popperOffsets,j=t.rects.reference,k=t.rects.popper,T="function"==typeof d?d(Object.assign({},t.rects,{placement:t.placement})):d,M={x:0,y:0};if(x){if(i||a){var C="y"===h?y:O,S="y"===h?w:g,P="y"===h?"height":"width",A=x[h],B=x[h]+l[C],q=x[h]-l[S],H=f?-k[P]/2:0,R="start"===v?j[P]:k[P],U="start"===v?-k[P]:-j[P],L=t.elements.arrow,$=f&&L?I(L):{width:0,height:0},F=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},V=F[C],Q=F[S],_=J(0,j[P],$[P]),K=m?j[P]/2-H-_-V-T:R-_-V-T,X=m?-j[P]/2+H+_+Q+T:U+_+Q+T,Y=t.elements.arrow&&W(t.elements.arrow),Z=t.modifiersData.offset?t.modifiersData.offset[t.placement][h]:0,nn=x[h]+K-Z-(Y?"y"===h?Y.clientTop||0:Y.clientLeft||0:0),tn=x[h]+X-Z;if(i){var en=J(f?N(B,nn):B,A,f?z(q,tn):q);x[h]=en,M[h]=en-A}if(a){var rn=x[b],on=rn+l["x"===h?y:O],un=rn-l["x"===h?w:g],an=J(f?N(on,nn):on,rn,f?z(un,tn):un);x[b]=an,M[b]=an-rn}}t.modifiersData[r]=M}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(n){var t,e=n.state,r=n.name,o=n.options,i=e.elements.arrow,u=e.modifiersData.popperOffsets,a=E(e.placement),c=D(a),f=[O,g].indexOf(a)>=0?"height":"width";if(i&&u){var s=function(n,t){return Q("number"!=typeof(n="function"==typeof n?n(Object.assign({},t.rects,{placement:t.placement})):n)?n:_(n,x))}(o.padding,e),d=I(i),l="y"===c?y:O,p="y"===c?w:g,v=e.rects.reference[f]+e.rects.reference[c]-u[c]-e.rects.popper[f],m=u[c]-e.rects.reference[c],h=W(i),b=h?"y"===c?h.clientHeight||0:h.clientWidth||0:0,j=b/2-d[f]/2+(v/2-m/2),k=J(s[l],j,b-d[f]-s[p]);e.modifiersData[r]=((t={})[c]=k,t.centerOffset=k-j,t)}},effect:function(n){var t=n.state,e=n.options.element,r=void 0===e?"[data-popper-arrow]":e;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&H(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(n){var t=n.state,e=n.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,u=ln(t,{elementContext:"reference"}),a=ln(t,{altBoundary:!0}),c=vn(u,r),f=vn(a,o,i),s=mn(c),d=mn(f);t.modifiersData[e]={referenceClippingOffsets:c,popperEscapeOffsets:f,isReferenceHidden:s,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":s,"data-popper-escaped":d})}}]}),xn={passive:!0,capture:!0},jn=function(){return document.body};function kn(n,t,e){if(Array.isArray(n)){var r=n[t];return null==r?Array.isArray(e)?e[t]:e:r}return n}function Tn(n,t){var e={}.toString.call(n);return 0===e.indexOf("[object")&&e.indexOf(t+"]")>-1}function Mn(n,t){return"function"==typeof n?n.apply(void 0,t):n}function Cn(n,t){return 0===t?n:function(r){clearTimeout(e),e=setTimeout((function(){n(r)}),t)};var e}function Sn(n){return[].concat(n)}function Pn(n,t){-1===n.indexOf(t)&&n.push(t)}function An(n){return[].slice.call(n)}function Bn(){return document.createElement("div")}function En(n){return["Element","Fragment"].some((function(t){return Tn(n,t)}))}function qn(n){return!(!n||!n._tippy||n._tippy.reference!==n)}function In(n,t){n.forEach((function(n){n&&(n.style.transitionDuration=t+"ms")}))}function Hn(n,t){n.forEach((function(n){n&&n.setAttribute("data-state",t)}))}function Rn(n,t,e){var r=t+"EventListener";["transitionend","webkitTransitionEnd"].forEach((function(t){n[r](t,e)}))}function Un(n,t){for(var e=t;e;){var r;if(n.contains(e))return!0;e=null==(r=null==e.getRootNode?void 0:e.getRootNode())?void 0:r.host}return!1}var Ln={isTouch:!1},$n=0;function Fn(){Ln.isTouch||(Ln.isTouch=!0,window.performance&&document.addEventListener("mousemove",Wn))}function Wn(){var n=performance.now();n-$n<20&&(Ln.isTouch=!1,document.removeEventListener("mousemove",Wn)),$n=n}function Dn(){var n=document.activeElement;qn(n)&&n.blur&&!n._tippy.state.isVisible&&n.blur()}var zn=!("undefined"==typeof window||"undefined"==typeof document||!window.msCrypto),Nn=Object.assign({appendTo:jn,aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},{animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},{},{allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999}),Vn=Object.keys(Nn);function Jn(n){var t=(n.plugins||[]).reduce((function(t,e){var r,o=e.name;return o&&(t[o]=void 0!==n[o]?n[o]:null!=(r=Nn[o])?r:e.defaultValue),t}),{});return Object.assign({},n,{},t)}function Qn(n,t){var e=Object.assign({},t,{content:Mn(t.content,[n])},t.ignoreAttributes?{}:function(n,t){return(t?Object.keys(Jn(Object.assign({},Nn,{plugins:t}))):Vn).reduce((function(t,e){var r=(n.getAttribute("data-tippy-"+e)||"").trim();if(!r)return t;if("content"===e)t[e]=r;else try{t[e]=JSON.parse(r)}catch(n){t[e]=r}return t}),{})}(n,t.plugins));return e.aria=Object.assign({},Nn.aria,{},e.aria),e.aria={expanded:"auto"===e.aria.expanded?t.interactive:e.aria.expanded,content:"auto"===e.aria.content?t.interactive?null:"describedby":e.aria.content},e}function _n(n,t){n.innerHTML=t}function Gn(n){var t=Bn();return!0===n?t.className="tippy-arrow":(t.className="tippy-svg-arrow",En(n)?t.appendChild(n):_n(t,n)),t}function Kn(n,t){En(t.content)?(_n(n,""),n.appendChild(t.content)):"function"!=typeof t.content&&(t.allowHTML?_n(n,t.content):n.textContent=t.content)}function Xn(n){var t=n.firstElementChild,e=An(t.children);return{box:t,content:e.find((function(n){return n.classList.contains("tippy-content")})),arrow:e.find((function(n){return n.classList.contains("tippy-arrow")||n.classList.contains("tippy-svg-arrow")})),backdrop:e.find((function(n){return n.classList.contains("tippy-backdrop")}))}}function Yn(n){var t=Bn(),e=Bn();e.className="tippy-box",e.setAttribute("data-state","hidden"),e.setAttribute("tabindex","-1");var r=Bn();function o(e,r){var o=Xn(t),i=o.box,u=o.content,a=o.arrow;r.theme?i.setAttribute("data-theme",r.theme):i.removeAttribute("data-theme"),"string"==typeof r.animation?i.setAttribute("data-animation",r.animation):i.removeAttribute("data-animation"),r.inertia?i.setAttribute("data-inertia",""):i.removeAttribute("data-inertia"),i.style.maxWidth="number"==typeof r.maxWidth?r.maxWidth+"px":r.maxWidth,r.role?i.setAttribute("role",r.role):i.removeAttribute("role"),e.content===r.content&&e.allowHTML===r.allowHTML||Kn(u,n.props),r.arrow?a?e.arrow!==r.arrow&&(i.removeChild(a),i.appendChild(Gn(r.arrow))):i.appendChild(Gn(r.arrow)):a&&i.removeChild(a)}return r.className="tippy-content",r.setAttribute("data-state","hidden"),Kn(r,n.props),t.appendChild(e),e.appendChild(r),o(n.props,n.props),{popper:t,onUpdate:o}}Yn.$$tippy=!0;var Zn=1,nt=[],tt=[];function et(n,t){var e,r,o,i,u,a,c,f,s,d=Qn(n,Object.assign({},Nn,{},Jn((e=t,Object.keys(e).reduce((function(n,t){return void 0!==e[t]&&(n[t]=e[t]),n}),{}))))),l=!1,p=!1,v=!1,m=!1,h=[],b=Cn(_,d.interactiveDebounce),y=Zn++,w=(s=d.plugins).filter((function(n,t){return s.indexOf(n)===t})),g={id:y,reference:n,popper:Bn(),popperInstance:null,props:d,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:w,clearDelayTimeouts:function(){clearTimeout(r),clearTimeout(o),cancelAnimationFrame(i)},setProps:function(t){if(!g.state.isDestroyed){I("onBeforeUpdate",[g,t]),J();var e=g.props,r=Qn(n,Object.assign({},g.props,{},t,{ignoreAttributes:!0}));g.props=r,V(),e.interactiveDebounce!==r.interactiveDebounce&&(U(),b=Cn(_,r.interactiveDebounce)),e.triggerTarget&&!r.triggerTarget?Sn(e.triggerTarget).forEach((function(n){n.removeAttribute("aria-expanded")})):r.triggerTarget&&n.removeAttribute("aria-expanded"),R(),q(),j&&j(e,r),g.popperInstance&&(Y(),nn().forEach((function(n){requestAnimationFrame(n._tippy.popperInstance.forceUpdate)}))),I("onAfterUpdate",[g,t])}},setContent:function(n){g.setProps({content:n})},show:function(){var n=g.state.isVisible,t=g.state.isDestroyed,e=!g.state.isEnabled,r=Ln.isTouch&&!g.props.touch,o=kn(g.props.duration,0,Nn.duration);if(!(n||t||e||r||P().hasAttribute("disabled")||(I("onShow",[g],!1),!1===g.props.onShow(g)))){if(g.state.isVisible=!0,S()&&(x.style.visibility="visible"),q(),W(),g.state.isMounted||(x.style.transition="none"),S()){var i=B();In([i.box,i.content],0)}var u,a,f;c=function(){var n;if(g.state.isVisible&&!m){if(m=!0,x.style.transition=g.props.moveTransition,S()&&g.props.animation){var t=B(),e=t.box,r=t.content;In([e,r],o),Hn([e,r],"visible")}H(),R(),Pn(tt,g),null==(n=g.popperInstance)||n.forceUpdate(),g.state.isMounted=!0,I("onMount",[g]),g.props.animation&&S()&&function(n){z(n,(function(){g.state.isShown=!0,I("onShown",[g])}))}(o)}},a=g.props.appendTo,f=P(),(u=g.props.interactive&&a===jn||"parent"===a?f.parentNode:Mn(a,[f])).contains(x)||u.appendChild(x),Y()}},hide:function(){var n=!g.state.isVisible,t=g.state.isDestroyed,e=!g.state.isEnabled,r=kn(g.props.duration,1,Nn.duration);if(!(n||t||e)&&(I("onHide",[g],!1),!1!==g.props.onHide(g))){if(g.state.isVisible=!1,g.state.isShown=!1,m=!1,l=!1,S()&&(x.style.visibility="hidden"),U(),D(),q(),S()){var o=B(),i=o.box,u=o.content;g.props.animation&&(In([i,u],r),Hn([i,u],"hidden"))}H(),R(),g.props.animation?S()&&function(n,t){z(n,(function(){!g.state.isVisible&&x.parentNode&&x.parentNode.contains(x)&&t()}))}(r,g.unmount):g.unmount()}},hideWithInteractivity:function(n){A().addEventListener("mousemove",b),Pn(nt,b),b(n)},enable:function(){g.state.isEnabled=!0},disable:function(){g.hide(),g.state.isEnabled=!1},unmount:function(){g.state.isVisible&&g.hide(),g.state.isMounted&&(Z(),nn().forEach((function(n){n._tippy.unmount()})),x.parentNode&&x.parentNode.removeChild(x),tt=tt.filter((function(n){return n!==g})),g.state.isMounted=!1,I("onHidden",[g]))},destroy:function(){g.state.isDestroyed||(g.clearDelayTimeouts(),g.unmount(),J(),delete n._tippy,g.state.isDestroyed=!0,I("onDestroy",[g]))}};if(!d.render)return g;var O=d.render(g),x=O.popper,j=O.onUpdate;x.setAttribute("data-tippy-root",""),x.id="tippy-"+g.id,g.popper=x,n._tippy=g,x._tippy=g;var k=w.map((function(n){return n.fn(g)})),T=n.hasAttribute("aria-expanded");return V(),R(),q(),I("onCreate",[g]),d.showOnCreate&&tn(),x.addEventListener("mouseenter",(function(){g.props.interactive&&g.state.isVisible&&g.clearDelayTimeouts()})),x.addEventListener("mouseleave",(function(n){g.props.interactive&&g.props.trigger.indexOf("mouseenter")>=0&&(A().addEventListener("mousemove",b),b(n))})),g;function M(){var n=g.props.touch;return Array.isArray(n)?n:[n,0]}function C(){return"hold"===M()[0]}function S(){var n;return!!(null==(n=g.props.render)?void 0:n.$$tippy)}function P(){return f||n}function A(){var n,t,e=P().parentNode;return e&&(null==(t=Sn(e)[0])||null==(n=t.ownerDocument)?void 0:n.body)?t.ownerDocument:document}function B(){return Xn(x)}function E(n){return g.state.isMounted&&!g.state.isVisible||Ln.isTouch||u&&"focus"===u.type?0:kn(g.props.delay,n?0:1,Nn.delay)}function q(){x.style.pointerEvents=g.props.interactive&&g.state.isVisible?"":"none",x.style.zIndex=""+g.props.zIndex}function I(n,t,e){var r;void 0===e&&(e=!0),k.forEach((function(e){e[n]&&e[n].apply(void 0,t)})),e&&(r=g.props)[n].apply(r,t)}function H(){var t=g.props.aria;if(t.content){var e="aria-"+t.content,r=x.id;Sn(g.props.triggerTarget||n).forEach((function(n){var t=n.getAttribute(e);if(g.state.isVisible)n.setAttribute(e,t?t+" "+r:r);else{var o=t&&t.replace(r,"").trim();o?n.setAttribute(e,o):n.removeAttribute(e)}}))}}function R(){!T&&g.props.aria.expanded&&Sn(g.props.triggerTarget||n).forEach((function(n){g.props.interactive?n.setAttribute("aria-expanded",g.state.isVisible&&n===P()?"true":"false"):n.removeAttribute("aria-expanded")}))}function U(){A().removeEventListener("mousemove",b),nt=nt.filter((function(n){return n!==b}))}function L(n){if(!Ln.isTouch||!v&&"mousedown"!==n.type){var t=n.composedPath&&n.composedPath()[0]||n.target;if(!g.props.interactive||!Un(x,t)){if(Un(P(),t)){if(Ln.isTouch)return;if(g.state.isVisible&&g.props.trigger.indexOf("click")>=0)return}else I("onClickOutside",[g,n]);!0===g.props.hideOnClick&&(g.clearDelayTimeouts(),g.hide(),p=!0,setTimeout((function(){p=!1})),g.state.isMounted||D())}}}function $(){v=!0}function F(){v=!1}function W(){var n=A();n.addEventListener("mousedown",L,!0),n.addEventListener("touchend",L,xn),n.addEventListener("touchstart",F,xn),n.addEventListener("touchmove",$,xn)}function D(){var n=A();n.removeEventListener("mousedown",L,!0),n.removeEventListener("touchend",L,xn),n.removeEventListener("touchstart",F,xn),n.removeEventListener("touchmove",$,xn)}function z(n,t){var e=B().box;function r(n){n.target===e&&(Rn(e,"remove",r),t())}if(0===n)return t();Rn(e,"remove",a),Rn(e,"add",r),a=r}function N(t,e,r){void 0===r&&(r=!1),Sn(g.props.triggerTarget||n).forEach((function(n){n.addEventListener(t,e,r),h.push({node:n,eventType:t,handler:e,options:r})}))}function V(){var n;C()&&(N("touchstart",Q,{passive:!0}),N("touchend",G,{passive:!0})),(n=g.props.trigger,n.split(/\s+/).filter(Boolean)).forEach((function(n){if("manual"!==n)switch(N(n,Q),n){case"mouseenter":N("mouseleave",G);break;case"focus":N(zn?"focusout":"blur",K);break;case"focusin":N("focusout",K)}}))}function J(){h.forEach((function(n){n.node.removeEventListener(n.eventType,n.handler,n.options)})),h=[]}function Q(n){var t,e=!1;if(g.state.isEnabled&&!X(n)&&!p){var r="focus"===(null==(t=u)?void 0:t.type);u=n,f=n.currentTarget,R(),!g.state.isVisible&&Tn(n,"MouseEvent")&&nt.forEach((function(t){return t(n)})),"click"===n.type&&(g.props.trigger.indexOf("mouseenter")<0||l)&&!1!==g.props.hideOnClick&&g.state.isVisible?e=!0:tn(n),"click"===n.type&&(l=!e),e&&!r&&en(n)}}function _(n){var t=n.target,e=P().contains(t)||x.contains(t);"mousemove"===n.type&&e||function(n,t){var e=t.clientX,r=t.clientY;return n.every((function(n){var t=n.popperRect,o=n.popperState,i=n.props.interactiveBorder,u=o.placement.split("-")[0],a=o.modifiersData.offset;return!a||t.top-r+("bottom"===u?a.top.y:0)>i||r-t.bottom-("top"===u?a.bottom.y:0)>i||t.left-e+("right"===u?a.left.x:0)>i||e-t.right-("left"===u?a.right.x:0)>i}))}(nn().concat(x).map((function(n){var t,e=null==(t=n._tippy.popperInstance)?void 0:t.state;return e?{popperRect:n.getBoundingClientRect(),popperState:e,props:d}:null})).filter(Boolean),n)&&(U(),en(n))}function G(n){X(n)||g.props.trigger.indexOf("click")>=0&&l||(g.props.interactive?g.hideWithInteractivity(n):en(n))}function K(n){g.props.trigger.indexOf("focusin")<0&&n.target!==P()||g.props.interactive&&n.relatedTarget&&x.contains(n.relatedTarget)||en(n)}function X(n){return!!Ln.isTouch&&C()!==n.type.indexOf("touch")>=0}function Y(){Z();var t=g.props,e=t.popperOptions,r=t.placement,o=t.offset,i=t.getReferenceClientRect,u=t.moveTransition,a=S()?Xn(x).arrow:null,f=i?{getBoundingClientRect:i,contextElement:i.contextElement||P()}:n,s=[{name:"offset",options:{offset:o}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!u}},{name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(n){var t=n.state;if(S()){var e=B().box;["placement","reference-hidden","escaped"].forEach((function(n){"placement"===n?e.setAttribute("data-placement",t.placement):t.attributes.popper["data-popper-"+n]?e.setAttribute("data-"+n,""):e.removeAttribute("data-"+n)})),t.attributes.popper={}}}}];S()&&a&&s.push({name:"arrow",options:{element:a,padding:3}}),s.push.apply(s,(null==e?void 0:e.modifiers)||[]),g.popperInstance=On(f,x,Object.assign({},e,{placement:r,onFirstUpdate:c,modifiers:s}))}function Z(){g.popperInstance&&(g.popperInstance.destroy(),g.popperInstance=null)}function nn(){return An(x.querySelectorAll("[data-tippy-root]"))}function tn(n){g.clearDelayTimeouts(),n&&I("onTrigger",[g,n]),W();var t=E(!0),e=M(),o=e[1];Ln.isTouch&&"hold"===e[0]&&o&&(t=o),t?r=setTimeout((function(){g.show()}),t):g.show()}function en(n){if(g.clearDelayTimeouts(),I("onUntrigger",[g,n]),g.state.isVisible){if(!(g.props.trigger.indexOf("mouseenter")>=0&&g.props.trigger.indexOf("click")>=0&&["mouseleave","mousemove"].indexOf(n.type)>=0&&l)){var t=E(!1);t?o=setTimeout((function(){g.state.isVisible&&g.hide()}),t):i=requestAnimationFrame((function(){g.hide()}))}}else D()}}function rt(n,t){void 0===t&&(t={});var e=Nn.plugins.concat(t.plugins||[]);document.addEventListener("touchstart",Fn,xn),window.addEventListener("blur",Dn);var r,o=Object.assign({},t,{plugins:e}),i=(r=n,En(r)?[r]:function(n){return Tn(n,"NodeList")}(r)?An(r):Array.isArray(r)?r:An(document.querySelectorAll(r))).reduce((function(n,t){var e=t&&et(t,o);return e&&n.push(e),n}),[]);return En(n)?i[0]:i}function ot(n){e.isProcessing=!0;const t=window.streamline||!1;fetch(t.ajax,{method:"POST",credentials:"same-origin",headers:new Headers({"Content-Type":"application/x-www-form-urlencoded"}),body:`action=streamlineQuery&type=${n.type}&query=${JSON.stringify(n.query)}&nonce=${t.nonce}&userId=${String(e.data.userId)}`}).then((n=>n.json())).then((()=>{e.isProcessing=!1,n.callback&&n.callback()}))}function it(n){const t=[...e.entriesFav],r=u(e[`entries${a(n.type)}`],(t=>n.filter(t)),{childrenPath:["children"]});if(n.favourite){const r=p(e.entriesFav,(t=>n.pathFav(t)),{childrenPath:["children"]});f(t,r.context._item.strPath);const o=r.context._item.parent.path;0===Object.values(s(e.entriesFav,`${o}.children`)).length&&f(t,o);const u=r.context._item.parent.parent.path;0===(!!u&&Object.values(s(e.entriesFav,`${u}.children`)).length)&&f(t,u);const a=1===t.length&&void 0===t[0]?[]:[...b(t)];e.entriesFav=a,e.entriesFavActive=a,i()}else{const o=p(e.entriesFav,(t=>n.path(t)),{childrenPath:["children"]}),i=null==o?void 0:o.key;if(0===e.entriesFav.length){const n=[...c(e.entriesFav,r)];e.entriesFav=n,e.entriesFavActive=n}else if(o){const n=c([Object.assign({},t[i])],r);t[i]=n[0],e.entriesFav=t,e.entriesFavActive=t}else{const n=[...t,r[0]];e.entriesFav=n,e.entriesFavActive=n}}var o,d,l;e.test||ot({type:"favourites",query:e.entriesFav}),n.callback&&n.callback(),d=(o={}).exclude,l=o.duration,tt.forEach((function(n){var t=!1;if(d&&(t=qn(d)?n.reference===d:n.popper===d.popper),!t){var e=n.props.duration;n.setProps({duration:l}),n.hide(),n.state.isDestroyed||n.setProps({duration:e})}}))}function ut(n){return d("svg",{class:"sidebar"===n.type?"h-[14px] relative -mr-px fill-current":"",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",style:{width:n.type?"":"8px",height:n.type?"":"8px"}},d("path",{fill:"currentColor",d:"M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"}))}function at(n){return d("span",{class:`${n.class} rounded-full w-4 h-4 text-red-500 pointer-events-none bg-white flex items-center justify-center border border-blue-gray-200`},d("span",{class:"h-full w-full flex items-center justify-center"},d(ut,null)))}rt.defaultProps=Nn,rt.setDefaultProps=function(n){Object.keys(n).forEach((function(t){Nn[t]=n[t]}))},rt.currentInput=Ln,Object.assign({},B,{effect:function(n){var t=n.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow)}}),rt.setDefaultProps({render:Yn});export{at as F,ut as H,h as L,v as a,ot as f,m as g,it as s,rt as t}