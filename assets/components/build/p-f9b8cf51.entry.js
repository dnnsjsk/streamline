import{r as t,h as o,H as e,g as r}from"./p-71c2b309.js";import{s as a,a as s,b as i,f as n,c as l}from"./p-33942a84.js";import{g as c,a as d}from"./p-7ebcfd8b.js";let b=class{constructor(o){t(this,o),this.mac=!1,this.cycleTabs=t=>{const o=a.menus.indexOf(s.active),e=a.menus.length;"up"===t&&(s.active=0===o?a.menus[e-1]:a.menus[o-1]),"down"===t&&(s.active=o+1===e?a.menus[0]:a.menus[o+1]),c()}}connectedCallback(){var t,o;i(),a.isMac=this.mac||-1!==navigator.userAgent.indexOf("Mac OS X"),a.entriesSettingsActive=a.entriesSettings,(null===(t=a.data)||void 0===t?void 0:t.settings)&&0!==Object.values(JSON.parse(null===(o=a.data)||void 0===o?void 0:o.settings)).length&&a.entriesSettings[0].children.forEach((t=>{t.children.forEach((t=>{var o,e;a.entriesSettingsLoad[t.id]={default:null!==(e=null===(o=(a.test?a.entriesSettings:JSON.parse(a.data.settings))[t.id])||void 0===o?void 0:o.default)&&void 0!==e?e:a.entriesSettingsLoad[t.id].default}}))})),a.entriesSettingsSave=a.entriesSettingsLoad,document.addEventListener("keydown",(t=>{"k"===t.key&&d(t)&&(t.preventDefault(),"last"!==a.entriesSettingsLoad.behaviourDefaultTab.default&&(s.active=a.entriesSettingsLoad.behaviourDefaultTab.default,c()),a.visible=!a.visible),a.visible&&("ArrowUp"===t.key&&d(t)&&a.entriesSettingsLoad.keyNavigationTabs.default&&(t.preventDefault(),this.cycleTabs("up")),"ArrowDown"===t.key&&d(t)&&a.entriesSettingsLoad.keyNavigationTabs.default&&(t.preventDefault(),this.cycleTabs("down")),"Escape"===t.key&&a.entriesSettingsLoad.keyExit.default&&(t.preventDefault(),a.visible=!1),"s"===t.key&&d(t)&&a.entriesSettingsLoad.keySearch.default&&(t.preventDefault(),n()))}))}componentDidLoad(){l(),a.visible=this.visible||!1}async setData(t){Object.entries(t).forEach((([t,o])=>{a[t]=o,a[`${t}Active`]=o})),i()}async toggle(){a.visible=!a.visible}async toggleTestFull(t){a.testFull=t,a.menu=Object.assign(Object.assign({},a.menu),{site:Object.assign(Object.assign({},a.menu.site),{condition:t}),networkMenu:Object.assign(Object.assign({},a.menu.networkMenu),{condition:t})})}render(){return o(e,null,o("div",{class:"fixed flex items-center justify-center top-0 left-0 w-full h-full z-[9999999999999999] "+(a.visible?"block pointer-events-auto":"hidden pointer-events-none")},o("div",{tabIndex:-1,class:"fixed top-0 left-0 w-full h-full bg-black/90 "+(a.entriesSettingsLoad.appearanceBlur.default?"backdrop-blur-sm":""),onClick:()=>a.visible=!1}),o("div",{class:"inner w-full h-full absolute max-w-[1024px] max-h-[700px] bg-white overflow-hidden grid"},o("streamline-sidebar",null),o("div",{class:"h-full w-full absolute bottom-[var(--sl-side-w)] h-[calc(100%-var(--sl-side-w))] sm:bottom-0 sm:left-[var(--sl-side-w)] sm:w-[calc(100%-var(--sl-side-w))] sm:top-0 sm:h-full"},o("div",{class:"bg-slate-50 grid grid-cols-[1fr,var(--sl-side-w)] lg:grid-cols-[1fr,64px]"},o("streamline-search",{class:"h-[var(--sl-side-w)] w-full lg:h-[64px]"}),o("streamline-ui-dropdown",{type:"main",items:[{text:a.isHelp?"Close help":"Show help",onClick:()=>{a.isHelp=!a.isHelp,a.isSearch=!a.isSearch}}]})),o("streamline-entries",null)),o("streamline-ui-drawer",{class:"sm:hidden"}))))}get el(){return r(this)}};b.style='/*! tailwindcss v3.0.17 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.top-0{top:0}.left-0{left:0}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-full{height:100%}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.overflow-hidden{overflow:hidden}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-slate-50,.bg-white{--tw-bg-opacity:1}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity:1;background-color:rgb(226 232 240/var(--tw-bg-opacity))}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-slate-500{--tw-text-opacity:1;color:rgb(100 116 139/var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch;box-sizing:border-box;display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;line-height:1.25}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar{height:4px;width:8px}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-track{background:#fff}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}:host .scrollbar-none::-webkit-scrollbar{height:0;width:0}:host .scrollbar-none::-webkit-scrollbar-track{background:transparent}:host .scrollbar-none::-webkit-scrollbar-thumb{background:transparent}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}.bottom-\\[var\\(--sl-side-w\\)\\]{bottom:var(--sl-side-w)}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[700px\\]{max-height:700px}.max-w-\\[1024px\\]{max-width:1024px}.grid-cols-\\[1fr\\2c var\\(--sl-side-w\\)\\]{grid-template-columns:1fr var(--sl-side-w)}.bg-black\\/90{background-color:rgba(0,0,0,.9)}@media (min-width:640px){.sm\\:bottom-0{bottom:0}.sm\\:left-\\[var\\(--sl-side-w\\)\\]{left:var(--sl-side-w)}.sm\\:top-0{top:0}.sm\\:hidden{display:none}.sm\\:h-full{height:100%}.sm\\:w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}}@media (min-width:1024px){.lg\\:h-\\[64px\\]{height:64px}.lg\\:grid-cols-\\[1fr\\2c 64px\\]{grid-template-columns:1fr 64px}}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}';export{b as streamline_container}