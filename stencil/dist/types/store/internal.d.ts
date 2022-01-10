declare const state: {
  class: {
    tag: string;
  };
  commands: {
    local: {};
  };
  currentSite: {
    id: any;
    path: any;
  };
  data: any;
  entriesFav: any;
  entriesFavActive: any;
  entriesMenu: any[];
  entriesMenuActive: any[];
  entriesMenuCurrentPath: string;
  entriesNetwork: any[];
  entriesNetworkActive: any[];
  entriesPost: any[];
  entriesPostActive: any[];
  entriesPostIsQuery: boolean;
  entriesPostCurrentPath: string;
  entriesSettings: {
    children: ({
      children: {
        id: string;
        name: string;
        nameParent: string;
        label: string;
        metaKey: boolean;
        keys: string[];
      }[];
      name: string;
    } | {
      children: {
        id: string;
        name: string;
        nameParent: string;
        label: string;
      }[];
      name: string;
    })[];
    type: string;
  }[];
  entriesSettingsActive: any[];
  entriesSettingsLoad: {
    keyNavigation: {
      default: boolean;
    };
    keyNavigationTabs: {
      default: boolean;
    };
    keySearch: {
      default: boolean;
    };
    keyExit: {
      default: boolean;
    };
    searchResetInput: {
      default: boolean;
    };
    searchFocus: {
      default: boolean;
    };
    appearanceBlur: {
      default: boolean;
    };
  };
  entriesSettingsSave: {};
  entriesSettingsHaveChanged: boolean;
  entriesSite: any[];
  entriesSiteActive: any[];
  entriesSiteIsQuery: boolean;
  historySearchesSite: any;
  historySearchesPost: any;
  isEnter: boolean;
  isHelp: boolean;
  isLoading: boolean;
  isMac: boolean;
  isProcessing: boolean;
  isSearch: boolean;
  isSearchFocus: boolean;
  isSlash: boolean;
  focusIndex: number;
  menus: string[];
  menu: {
    site: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    network: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    fav: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    menu: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    post: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    settings: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
  };
  searchNoValue: string;
  searchPlaceholder: string;
  searchValue: string;
  test: boolean;
  testFull: boolean;
  visible: boolean;
}, dispose: () => void, onChange: import("@stencil/store/dist/types").OnChangeHandler<{
  class: {
    tag: string;
  };
  commands: {
    local: {};
  };
  currentSite: {
    id: any;
    path: any;
  };
  data: any;
  entriesFav: any;
  entriesFavActive: any;
  entriesMenu: any[];
  entriesMenuActive: any[];
  entriesMenuCurrentPath: string;
  entriesNetwork: any[];
  entriesNetworkActive: any[];
  entriesPost: any[];
  entriesPostActive: any[];
  entriesPostIsQuery: boolean;
  entriesPostCurrentPath: string;
  entriesSettings: {
    children: ({
      children: {
        id: string;
        name: string;
        nameParent: string;
        label: string;
        metaKey: boolean;
        keys: string[];
      }[];
      name: string;
    } | {
      children: {
        id: string;
        name: string;
        nameParent: string;
        label: string;
      }[];
      name: string;
    })[];
    type: string;
  }[];
  entriesSettingsActive: any[];
  entriesSettingsLoad: {
    keyNavigation: {
      default: boolean;
    };
    keyNavigationTabs: {
      default: boolean;
    };
    keySearch: {
      default: boolean;
    };
    keyExit: {
      default: boolean;
    };
    searchResetInput: {
      default: boolean;
    };
    searchFocus: {
      default: boolean;
    };
    appearanceBlur: {
      default: boolean;
    };
  };
  entriesSettingsSave: {};
  entriesSettingsHaveChanged: boolean;
  entriesSite: any[];
  entriesSiteActive: any[];
  entriesSiteIsQuery: boolean;
  historySearchesSite: any;
  historySearchesPost: any;
  isEnter: boolean;
  isHelp: boolean;
  isLoading: boolean;
  isMac: boolean;
  isProcessing: boolean;
  isSearch: boolean;
  isSearchFocus: boolean;
  isSlash: boolean;
  focusIndex: number;
  menus: string[];
  menu: {
    site: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    network: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    fav: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    menu: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    post: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
    settings: {
      name: string;
      condition: boolean;
      text: string;
      help: string;
    };
  };
  searchNoValue: string;
  searchPlaceholder: string;
  searchValue: string;
  test: boolean;
  testFull: boolean;
  visible: boolean;
}>;
export { state, dispose, onChange as onChangeInternal };
