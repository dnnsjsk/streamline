/*! For license information please see fabrikat-admin.js.LICENSE.txt */
(()=>{var __webpack_modules__={"./src/js/fabrikat-admin.js":()=>{eval('var _wp$components = wp.components,\n    PanelBody = _wp$components.PanelBody,\n    PanelRow = _wp$components.PanelRow,\n    BaseControl = _wp$components.BaseControl,\n    Button = _wp$components.Button,\n    TextControl = _wp$components.TextControl;\nvar _wp$element = wp.element,\n    render = _wp$element.render,\n    Fragment = _wp$element.Fragment;\n\nfunction App() {\n  return wp.element.createElement(Fragment, null, wp.element.createElement("div", {\n    className: "fabrikat-admin__header"\n  }, wp.element.createElement("img", {\n    className: "fabrikat-admin__header-img",\n    src: "".concat(window.fabrikatPluginUrl, "includes/admin/assets/fabrikatLogo.svg")\n  })), wp.element.createElement("div", {\n    className: "fabrikat-admin__content"\n  }, wp.element.createElement(PanelBody, {\n    title: "Settings",\n    opened: true\n  }, wp.element.createElement(PanelRow, null, wp.element.createElement(TextControl, {\n    label: "License Key",\n    type: "text",\n    placeholder: "Your license key"\n  })), wp.element.createElement(PanelRow, null, wp.element.createElement(Button, {\n    isPrimary: true\n  }, "Save")))));\n}\n\nrender(wp.element.createElement(App, null), document.getElementById("fabrikat-plugin"));\n\n//# sourceURL=webpack://fabrikat/./src/js/fabrikat-admin.js?')}},__webpack_exports__={};__webpack_modules__["./src/js/fabrikat-admin.js"]()})();