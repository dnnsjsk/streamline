import{r as s,h as r,H as i}from"./p-be955441.js";import{s as o,a as t}from"./p-c3b539f8.js";import{a,b as e,S as n,d as l,e as c,i as h,s as d,g as v}from"./p-46d26ccf.js";function u(s){return s!=s}function p(s,r){return!(null==s||!s.length)&&function(s,r){return r==r?function(s,r){for(var i=-1,o=s.length;++i<o;)if(s[i]===r)return i;return-1}(s,r):function(s,r){for(var i=s.length,o=-1;++o<i;)if(r(s[o],o,s))return o;return-1}(s,u)}(s,r)>-1}var f=c((function(s,r){return h(s)?function(s,r,i,o){var t=-1,a=p,e=!0,c=s.length,h=[],d=r.length;if(!c)return h;r.length>=200&&(a=l,e=!1,r=new n(r));s:for(;++t<c;){var v=s[t],u=v;if(v=0!==v?v:0,e&&u==u){for(var f=d;f--;)if(r[f]===u)continue s;h.push(v)}else a(r,u,o)||h.push(v)}return h}(s,r):[]}));const b=class{constructor(r){s(this,r)}handleClick(){"is-sidebar"===this.type&&(o.active=this.icon,t()),"is-header"===this.type&&(o[this.typeSub+"Mode"]=o[this.typeSub+"Mode"]===this.header?"":this.header,t())}handleFavClick(){const s=o[this.typeSub+"Favourites"],r="menu"===this.typeSub?this.href:"flow"===this.typeSub&&this.ident;s.includes(r)?(o[this.typeSub+"Favourites"]=f(s,r),this.favourite=!1):(o[this.typeSub+"Favourites"]=[...s,r],this.favourite=!0);const i=d.entries;i[this.index].children[this.indexInner].children[this.indexSub].favourite=this.favourite,d.entries=i,t(),("menu"===this.typeSub&&null===v(d.entries,"menu")||"flow"===this.typeSub&&null===v(d.entries,"flow"))&&document.activeElement.blur()}static getHeart(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r("path",{fill:"currentColor",d:"M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"}))}render(){var s,t,a;const e=null===(a=null===(t=null===(s=d.entries[this.index])||void 0===s?void 0:s.children[this.indexInner])||void 0===t?void 0:t.children[this.indexSub])||void 0===a?void 0:a.favourite,n=r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},r("path",{d:"M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"})),l=r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},r("path",{d:"M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"})),c=r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},r("path",{d:"M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z"})),h="wordpress"===this.icon?n:"menu"===this.icon?l:"flow"===this.icon?c:"heart"===this.icon&&b.getHeart(),v=this.text&&r("span",null,this.text),u="container"+(this.type?` ${this.type}`:"")+(o[this.typeSub+"Mode"]===this.header?" is-active":"")+("is-sidebar"===this.type&&o.active===this.icon?" is-active":"");return r(i,null,r("div",{class:"focus"+(this.type?` ${this.type}`:"")},"is-main"===this.type&&this.href?r("a",{href:this.href,onClick:()=>this.handleClick(),class:u},h,v):r("button",{onClick:()=>this.handleClick(),class:u},h,v),"is-main"===this.type&&e&&r("span",{class:"favourite"},b.getHeart())),"is-main"===this.type&&r("div",{class:"focus is-icon"},r("button",{onClick:()=>this.handleFavClick(),class:"icon "+(e?"is-favourite":"")},b.getHeart())))}};b.style=':host{position:relative;display:inline-flex}:host .focus{box-sizing:border-box;position:relative;display:flex;width:100%;outline:none;border-radius:var(--sl-border-radius)}:host .focus:hover+.focus .icon{opacity:1}:host .focus input:focus,:host .focus button:focus,:host .focus a:focus{outline:none}:host .focus input{padding-left:var(--sl-s)}:host .focus:before{border-radius:var(--sl-border-radius);position:absolute;content:"";box-sizing:border-box;left:4px;top:4px;width:calc(100% - 8px);height:calc(100% - 9px);pointer-events:none;transition:box-shadow var(--sl-transition-fast)}:host .focus:focus-within:before{box-shadow:inset 0 0 0 2px var(--sl-focus-color)}:host .focus.is-main:before,:host .focus.is-icon:before,:host .focus.is-header:before{left:0;top:0;width:100%;height:100%}:host .focus.is-icon{width:auto}:host a{text-decoration:none}:host .focus:hover+.icon{opacity:1}:host .container{cursor:pointer;text-align:center;white-space:nowrap;border-radius:var(--sl-border-radius)}:host .container.is-main{font-size:var(--sl-text-sm);padding:var(--sl-s-2-5) var(--sl-s-3);line-height:1;border:1px solid var(--sl-wp-g2-light-gray-300);background:var(--sl-wp-g2-light-gray-100);color:var(--sl-wp-g2-blueberry);min-width:75px;transition:border-color var(--sl-transition-fast)}:host .container.is-main:hover{border-color:var(--sl-wp-g2-blueberry)}:host .container.is-sidebar{height:calc(var(--sl-side-w) + 8px);border-radius:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;border:none;width:100%;color:#000000;background:transparent;border-bottom:1px solid var(--sl-wp-g2-light-gray-500);transition:color var(--sl-transition-fast)}:host .container.is-sidebar span{font-size:var(--sl-text-xs);font-weight:600;text-transform:uppercase;margin-top:var(--sl-s-1-5);display:inline-block}:host .container.is-sidebar svg{height:var(--sl-text-xl);width:var(--sl-text-xl);transition:fill var(--sl-transition-fast)}:host .container.is-sidebar:hover,:host .container.is-sidebar.is-active{color:var(--sl-wp-g2-blueberry)}:host .container.is-sidebar:hover svg,:host .container.is-sidebar.is-active svg{fill:var(--sl-wp-g2-blueberry)}:host .container.is-sidebar.is-primary{--sl-focus-color:var(--sl-wp-g2-blueberry);background:var(--sl-wp-g2-dark-gray-900);color:#ffffff;height:calc(var(--sl-side-w) - 1px);width:var(--sl-side-w);border-bottom:1px solid var(--sl-wp-g2-dark-gray-900);transition:all var(--sl-transition-fast);transition-property:border-color, background}:host .container.is-sidebar.is-primary svg{height:var(--sl-s-6);width:var(--sl-s-6);fill:currentColor}:host .container.is-sidebar.is-primary:hover{background:var(--sl-wp-g2-dark-gray-700);border-color:var(--sl-wp-g2-dark-gray-700)}:host .container.is-header{height:var(--sl-s-8);width:var(--sl-s-8);padding:0;background:transparent;color:var(--sl-wp-g2-dark-gray-700);background:var(--sl-wp-g2-light-gray-100);border:1px solid var(--sl-border-color);transition:border-color var(--transition-fast)}:host .container.is-header:hover{border-color:var(--sl-wp-g2-blueberry)}:host .container.is-header svg{margin-top:var(--sl-s-1);height:var(--sl-s-3-5);width:var(--sl-s-3-5)}:host .container.is-header.is-active{color:var(--sl-wp-g2-blueberry)}:host .icon{background:none;position:relative;border:none;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:0 var(--sl-s-2);opacity:0;left:-1px;outline:none}:host .icon:hover,:host .icon:focus{opacity:1;color:var(--sl-wp-g2-blueberry)}:host .icon.is-favourite{opacity:1;color:var(--sl-wp-g2-blueberry-dark)}:host .icon svg{margin-left:1px;height:var(--sl-s-2-5);width:var(--sl-s-2-5)}';export{b as streamline_button}