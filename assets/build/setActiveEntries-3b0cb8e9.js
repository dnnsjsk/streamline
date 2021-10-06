import { c as createStore, s as state$1 } from './internal-8ac3b7d5.js';
import { f as filterDeep, g as getFavourites } from './getFavourites-f4494130.js';

const e=(t,e)=>{try{return JSON.parse(t.getItem(e))}catch(t){return null}},r=(r,s,n,o=!1)=>{var i;const l=createStore(null!=(i=e(r,s))?i:n),a=(t=>{let e=!1;return ()=>{e||(e=!0,setTimeout(()=>{t(),e=!1;},0));}})(()=>r.setItem(s,JSON.stringify(l.state)));return a(),o&&window.addEventListener("storage",()=>{const t=e(r,s);if(null!==t)for(const e in t)l.set(e,t[e]);}),l.use({set:a,reset:a}),l},s=(t,e,s=!1)=>r(localStorage,t,e,s),n=(t,e)=>r(sessionStorage,t,e);

const { state, onChange } = s("streamline", {
    active: "menu",
    menuMode: "",
    menuFavourites: [],
    flowMode: "",
    flowFavourites: [],
});
onChange("active", (value) => {
    state.active = value;
});
onChange("menuMode", (value) => {
    state.menuMode = value;
});
onChange("menuFavourites", (value) => {
    state.menuFavourites = value;
});
onChange("flowMode", (value) => {
    state.flowMode = value;
});
onChange("flowFavourites", (value) => {
    state.flowFavourites = value;
});

function setActiveEntries() {
  state$1.entriesActive = filterDeep(state$1.entries.filter((val) => Object.keys(val).length !== 0), (o) => {
    const getResults = (type) => {
      return (state.active === type &&
        ((o.type === state.active &&
          o.name
            .toLowerCase()
            .includes(state$1.searchValue.toLowerCase())) ||
          (o.type === state.active &&
            o.nameParent &&
            o.nameParent
              .toLowerCase()
              .includes(state$1.searchValue.toLowerCase()))) &&
        (state[type + 'Mode'] === 'favourite'
          ? o.favourite === true
          : true));
    };
    const isActive = (type) => {
      return (state.active === type &&
        getFavourites(state$1.entries, type) === null);
    };
    const menu = getResults('menu') && o.href;
    const flow = getResults('flow');
    if (isActive('menu')) {
      state.menuMode = '';
      return menu;
    }
    else if (isActive('flow')) {
      state.flowMode = '';
      return flow;
    }
    else {
      return menu || flow;
    }
  }, { childrenPath: ['children'] });
}

export { setActiveEntries as a, state as s };
