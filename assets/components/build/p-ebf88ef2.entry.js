import{r as t,h as r}from"./p-cc400426.js";import{b as e,a as i}from"./p-31a052ea.js";import{r as o,g as a,s as n,a as s,t as c,H as p,F as d}from"./p-2b1ee9d9.js";import"./p-db32649d.js";const l=class{constructor(r){t(this,r),this.handleClick=()=>{"sidebar"===this.type&&(e.active=this.icon,o()),"menu"===e.active&&0===i.entriesMenu.length&&a()},this.handleFavClick=()=>{n({favourite:this.favourite,callback:this.checkIfFav,type:"menu",filter:t=>t.href===this.href&&t.adminUrl===this.adminUrl,path:t=>t.type===this.typeSub&&t.siteId===this.siteId,pathFav:t=>t.path===this.path&&t.siteId===this.siteId})},this.checkIfFav=()=>{this.favourite=s(i.entriesFav,(t=>(null==t?void 0:t.path)===this.path&&(null==t?void 0:t.siteId)===this.siteId),{childrenPath:["children"]})}}componentWillRender(){"main"===this.type&&this.checkIfFav()}componentDidLoad(){const t={name:"hideOnPopperBlur",defaultValue:!0,fn:t=>({onCreate(){t.popper.addEventListener("focusout",(r=>{t.props.hideOnPopperBlur&&r.relatedTarget&&!t.popper.contains(r.relatedTarget)&&t.hide()}))}})};if("main"===this.type&&this.link){const r=this.tooltip;r.style.display="block",c(this.link,{content:r,appendTo:this.container,interactive:!0,plugins:[t],delay:[500,null]})}}render(){const t="break-words w-[max-content] underline-none cursor-pointer text-center whitespace-no-wrap "+("main"===this.type?"text-sm px-3 py-2.5 leading-none border border-gray-200 bg-gray-50 text-indigo-600 min-w-[75px] hover:border-indigo-600":"sidebar"===this.type||"primary"===this.type?`h-[calc(var(--sl-side-w))] w-[calc(var(--sl-side-w)-1px)] flex flex-col items-center justify-center p-0 text-gray-900 bg-transparent border-b border-gray-300 ${"primary"===this.type?"bg-[#191E23] border-none text-white fill-current h-[var(--sl-side-w)] w-[var(--sl-side-w)] hover:bg-[#0e1114]":"sidebar"===this.type&&`!grid sm:!grid-rows-[20px,20px] !justify-items-center !content-center text-gray-500 border-b border-gray-300 hover:bg-gray-100 hover:text-gray-900 ${e.active===this.icon&&"text-indigo-700 bg-white border-r border-white pointer-events-none relative -right-px hover:!bg-white"}`}`:""),i="sidebar"===this.type?"hidden sm:inline-block text-xs font-bold leading-1 uppercase mt-1.5":"",o=r("svg",{class:"w-10 h-10",xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},r("path",{d:"M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"})),a=r("svg",{xmlns:"http://www.w3.org/2000/svg",class:"fill-current h-[18px]",viewBox:"0 0 512 512"},r("path",{fill:"currentColor",d:"M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"})),n=r("svg",{class:"fill-current h-[16px]",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},r("path",{d:"M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z"})),s=r("svg",{class:"fill-current h-[16px]",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r("path",{fill:"currentColor",d:"M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z"})),c="wordpress"===this.icon?o:"menu"===this.icon?a:"post"===this.icon?s:"flow"===this.icon?n:"fav"===this.icon&&r(p,{type:this.type}),l=this.text&&r("span",{class:i},this.text);return r("div",{class:"relative inline-flex w-full"},r("div",{ref:t=>this.container=t,class:"focus "+("main"===this.type?"focus--border":"sidebar"===this.type?"focus--px-x focus--px-y":"")},"main"===this.type&&this.href?r("a",{ref:t=>this.link=t,href:this.href,onClick:this.handleClick,class:t},c,l):r("button",{onClick:this.handleClick,tabIndex:e.active===this.icon?-1:0,style:{borderBottom:"primary"===this.type?"":"1px solid rgba(209,213,219,var(--tw-border-opacity))"},class:t},c,l),this.favourite&&"fav"!==e.active&&r(d,{class:"absolute -top-1 -right-1"})),"main"===this.type&&r("div",{class:"!grid divide-x divide-gray-200 auto-cols-max grid-flow-col",ref:t=>this.tooltip=t,style:{display:"block"}},[{onClick:this.handleFavClick,condition:this.favourite}].map((t=>r("button",{class:"border-none focus",onClick:t.onClick},r("span",{class:"w-8 h-8 flex items-center justify-center "+(t.condition?"text-red-500":"")},r(p,null)))))))}};l.style='.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{background-color:#333;border-radius:4px;border-radius:0!important;color:#fff;font-size:14px;line-height:1.4;outline:0;position:relative;transition-property:transform,visibility,opacity;white-space:normal}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:"";position:absolute}.tippy-content{padding:0;position:relative;z-index:1}:host .focus{box-sizing:border-box;display:inline-flex;outline:none;position:relative}:host .focus [role=button]:focus,:host .focus a:focus,:host .focus button:focus,:host .focus input:focus{outline:none}:host .focus:focus-within:before{box-shadow:inset 0 0 0 2px var(--sl-focus-color)}:host .focus:before{box-sizing:border-box;content:"";height:calc(100% - 8px);left:4px;pointer-events:none;position:absolute;top:4px;width:calc(100% - 8px)}:host .focus--px-y:before{height:calc(100% - 9px)!important}:host .focus--px-x:before{width:calc(100% - 9px)!important}:host .focus--border:before{height:calc(100% - 10px)!important;left:5px;top:5px;width:calc(100% - 10px)!important}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;border:0 solid;box-sizing:border-box}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-gray-200{--tw-bg-opacity:1;background-color:rgba(229,231,235,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:1rem}.h-full{height:100%}.w-4{width:1rem}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-gray-200{--tw-border-opacity:1;border-color:rgba(229,231,235,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */svg{display:block;vertical-align:middle}.relative{position:relative}.-mr-px{margin-right:-1px}.h-\\[14px\\]{height:14px}.fill-current{fill:currentColor}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(229,231,235,var(--tw-border-opacity));box-sizing:border-box}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}a{color:inherit;text-decoration:inherit}svg{display:block;vertical-align:middle}[hidden]{display:none}.pointer-events-none{pointer-events:none}.absolute{position:absolute}.relative{position:relative}.-right-px{right:-1px}.-top-1{top:-.25rem}.-right-1{right:-.25rem}.mt-1\\.5{margin-top:.375rem}.mt-1{margin-top:.25rem}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.\\!grid{display:grid!important}.hidden{display:none}.h-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{height:calc(var(--sl-side-w))}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-10{height:2.5rem}.h-\\[18px\\]{height:18px}.h-\\[16px\\]{height:16px}.h-8{height:2rem}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-\\[calc\\(var\\(--sl-side-w\\)-1px\\)\\]{width:calc(var(--sl-side-w) - 1px)}.w-\\[var\\(--sl-side-w\\)\\]{width:var(--sl-side-w)}.w-10{width:2.5rem}.w-full{width:100%}.w-8{width:2rem}.min-w-\\[75px\\]{min-width:75px}.cursor-pointer{cursor:pointer}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.flex-col{flex-direction:column}.\\!content-center{align-content:center!important}.items-center{align-items:center}.justify-center{justify-content:center}.\\!justify-items-center{justify-items:center!important}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgba(229,231,235,var(--tw-divide-opacity))}.break-words{overflow-wrap:break-word}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-none{border-style:none}.border-gray-200{--tw-border-opacity:1;border-color:rgba(229,231,235,var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.border-white{--tw-border-opacity:1;border-color:rgba(255,255,255,var(--tw-border-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#191E23\\]{--tw-bg-opacity:1;background-color:rgba(25,30,35,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2\\.5{padding-bottom:.625rem;padding-top:.625rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.text-center{text-align:center}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.uppercase{text-transform:uppercase}.leading-none{line-height:1}.text-indigo-600{--tw-text-opacity:1;color:rgba(79,70,229,var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}.text-indigo-700{--tw-text-opacity:1;color:rgba(67,56,202,var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.container{width:100%}.hover\\:border-indigo-600:hover{--tw-border-opacity:1;border-color:rgba(79,70,229,var(--tw-border-opacity))}.hover\\:bg-\\[\\#0e1114\\]:hover{--tw-bg-opacity:1;background-color:rgba(14,17,20,var(--tw-bg-opacity))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.hover\\:\\!bg-white:hover{--tw-bg-opacity:1!important;background-color:rgba(255,255,255,var(--tw-bg-opacity))!important}.hover\\:text-gray-900:hover{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}@media (min-width:640px){.container{max-width:640px}.sm\\:inline-block{display:inline-block}.sm\\:\\!grid-rows-\\[20px\\2c 20px\\]{grid-template-rows:20px 20px!important}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}';export{l as streamline_button}