import{r as o,h as t,H as e,a as n}from"./p-be955441.js";import{s as i}from"./p-46d26ccf.js";import{a as s}from"./p-c3b539f8.js";var r=!1;if("undefined"!=typeof window){var a={get passive(){r=!0}};window.addEventListener("testPassive",null,a),window.removeEventListener("testPassive",null,a)}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),c=[],u=!1,l=-1,f=void 0,h=void 0,p=function(o){return c.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(o))}))},v=function(o){var t=o||window.event;return!!p(t.target)||t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1)};const w=class{constructor(t){o(this,t)}connectedCallback(){(function(o,t){if(o){if(!c.some((function(t){return t.targetElement===o}))){var e={targetElement:o,options:t||{}};c=[].concat(function(o){if(Array.isArray(o)){for(var t=0,e=Array(o.length);t<o.length;t++)e[t]=o[t];return e}return Array.from(o)}(c),[e]),d?(o.ontouchstart=function(o){1===o.targetTouches.length&&(l=o.targetTouches[0].clientY)},o.ontouchmove=function(t){1===t.targetTouches.length&&function(o,t){var e=o.targetTouches[0].clientY-l;!p(o.target)&&(t&&0===t.scrollTop&&e>0||function(o){return!!o&&o.scrollHeight-o.scrollTop<=o.clientHeight}(t)&&e<0?v(o):o.stopPropagation())}(t,o)},u||(document.addEventListener("touchmove",v,r?{passive:!1}:void 0),u=!0)):function(o){if(void 0===h){var t=window.innerWidth-document.documentElement.clientWidth;o&&!0===o.reserveScrollBarGap&&t>0&&(h=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===f&&(f=document.body.style.overflow,document.body.style.overflow="hidden")}(t)}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")})(this.el),s()}componentDidLoad(){setTimeout((()=>{this.el.shadowRoot.querySelector("input").focus()}),50)}disconnectedCallback(){d?(c.forEach((function(o){o.targetElement.ontouchstart=null,o.targetElement.ontouchmove=null})),u&&(document.removeEventListener("touchmove",v,r?{passive:!1}:void 0),u=!1),l=-1):(void 0!==h&&(document.body.style.paddingRight=h,h=void 0),void 0!==f&&(document.body.style.overflow=f,f=void 0)),c=[]}static handleChange(o){i.searchValue=o.target.value,s()}render(){return t(e,null,t("div",{class:"container"},t("streamline-sidebar",null),t("div",{class:"inner"},t("div",{class:"focus"},t("input",{part:"search",class:"search",type:"text",placeholder:"Search for anything",onInput:o=>w.handleChange(o)})),t("streamline-entries",null))))}get el(){return n(this)}};w.style=':host .focus{box-sizing:border-box;position:relative;display:flex;width:100%;outline:none;border-radius:var(--sl-border-radius)}:host .focus:hover+.focus .icon{opacity:1}:host .focus input:focus,:host .focus button:focus,:host .focus a:focus{outline:none}:host .focus input{padding-left:var(--sl-s)}:host .focus:before{border-radius:var(--sl-border-radius);position:absolute;content:"";box-sizing:border-box;left:4px;top:4px;width:calc(100% - 8px);height:calc(100% - 9px);pointer-events:none;transition:box-shadow var(--sl-transition-fast)}:host .focus:focus-within:before{box-shadow:inset 0 0 0 2px var(--sl-focus-color)}:host .focus.is-main:before,:host .focus.is-icon:before,:host .focus.is-header:before{left:0;top:0;width:100%;height:100%}:host .focus.is-icon{width:auto}@keyframes fadein{from{opacity:0;transform:translate3d(-50%, calc(-50% + 20px), 0)}to{opacity:1;transform:translate3d(-50%, -50%, 0)}}:host .container{width:100%;height:100%;position:absolute;top:50%;left:50%;transform:translate3d(-50%, -50%, 0);max-width:900px;max-height:700px;z-index:99999999999;background-color:var(--sl-bg);border-radius:0;display:grid;overflow:hidden;animation:fadein 0.4s var(--sl-transition)}:host .inner{left:var(--sl-side-w);position:absolute;height:100%;width:calc(100% - var(--sl-side-w))}:host .search{height:calc(var(--sl-side-w) - 2px);font-size:1.15rem;width:100%;margin:0;padding:0;border:none;border-bottom:1px solid var(--sl-border-color)}';export{w as streamline_box}