import{r as t,h as o}from"./p-11eabb5c.js";import{s as e,a as i}from"./p-b59d0b9e.js";const a=class{constructor(o){t(this,o)}connectedCallback(){e.visible=this.visible||!1}componentDidLoad(){i(),document.addEventListener("keydown",(t=>{"k"===t.key&&t.metaKey&&(e.visible=!e.visible)}))}render(){return e.visible&&o("div",{class:"fixed top-0 left-0 w-full h-full z-[9999999999999999]"},o("div",{tabIndex:-1,class:"fixed top-0 left-0 w-full h-full bg-black/90",onClick:()=>e.visible=!1}),o("streamline-box",null))}};a.style=":host{display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:blue-grayscale}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{border:0 solid;box-sizing:border-box}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.visible{visibility:visible}.fixed{position:fixed}.top-0{top:0}.left-0{left:0}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-full{height:100%}.w-full{width:100%}.bg-black\\/90{background-color:rgba(0,0,0,.9)}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";export{a as streamline_container}