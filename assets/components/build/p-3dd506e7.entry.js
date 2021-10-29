import{r as t,h as e,g as a}from"./p-66ac06e5.js";import{c as r,f as n}from"./p-8550399b.js";var o=!1;if("undefined"!=typeof window){var s={get passive(){o=!0}};window.addEventListener("testPassive",null,s),window.removeEventListener("testPassive",null,s)}var i="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),l=[],d=!1,w=-1,c=void 0,f=void 0,u=function(t){return l.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},v=function(t){var e=t||window.event;return!!u(e.target)||e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1)};let m=class{constructor(e){t(this,e)}connectedCallback(){r()}componentDidLoad(){(function(t,e){if(t){if(!l.some((function(e){return e.targetElement===t}))){var a={targetElement:t,options:e||{}};l=[].concat(function(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}(l),[a]),i?(t.ontouchstart=function(t){1===t.targetTouches.length&&(w=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var a=t.targetTouches[0].clientY-w;!u(t.target)&&(e&&0===e.scrollTop&&a>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&a<0?v(t):t.stopPropagation())}(e,t)},d||(document.addEventListener("touchmove",v,o?{passive:!1}:void 0),d=!0)):function(t){if(void 0===f){var e=window.innerWidth-document.documentElement.clientWidth;t&&!0===t.reserveScrollBarGap&&e>0&&(f=document.body.style.paddingRight,document.body.style.paddingRight=e+"px")}void 0===c&&(c=document.body.style.overflow,document.body.style.overflow="hidden")}(e)}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")})(this.el.shadowRoot.querySelector("streamline-entries").shadowRoot.querySelector("div > div"),{reserveScrollBarGap:!0}),this.el.shadowRoot.querySelector(".inner").classList.add("animate"),setTimeout((()=>{n()}),50)}disconnectedCallback(){i?(l.forEach((function(t){t.targetElement.ontouchstart=null,t.targetElement.ontouchmove=null})),d&&(document.removeEventListener("touchmove",v,o?{passive:!1}:void 0),d=!1),w=-1):(void 0!==f&&(document.body.style.paddingRight=f,f=void 0),void 0!==c&&(document.body.style.overflow=c,c=void 0)),l=[]}render(){return e("div",{class:"inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[900px] max-h-[700px] bg-white overflow-hidden grid"},e("streamline-sidebar",null),e("div",{class:"wrap h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]"},e("streamline-search",{class:"h-[var(--sl-side-w)] w-full"}),e("streamline-entries",null)))}get el(){return a(this)}};m.style="@-webkit-keyframes fadein{0%{opacity:0;transform:translate3d(-50%,calc(-50% + 20px),0)}to{opacity:1;transform:translate3d(-50%,-50%,0)}}@keyframes fadein{0%{opacity:0;transform:translate3d(-50%,calc(-50% + 20px),0)}to{opacity:1;transform:translate3d(-50%,-50%,0)}}.inner{opacity:0}.animate{-webkit-animation:fadein .4s cubic-bezier(.4,0,.2,1) normal forwards;animation:fadein .4s cubic-bezier(.4,0,.2,1) normal forwards;will-change:transform,opacity}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.absolute{position:absolute}.left-1\\/2{left:50%}.top-1\\/2{top:50%}.left-\\[var\\(--sl-side-w\\)\\]{left:var(--sl-side-w)}.grid{display:grid}.h-full{height:100%}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[700px\\]{max-height:700px}.w-full{width:100%}.w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}.max-w-\\[900px\\]{max-width:900px}.-translate-x-1\\/2{--tw-translate-x:-50%;transform:var(--tw-transform)}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.overflow-hidden{overflow:hidden}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";export{m as streamline_box}