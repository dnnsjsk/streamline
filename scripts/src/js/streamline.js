import { render, Fragment, useEffect } from "@wordpress/element";
import { ScrollLock, KeyboardShortcuts } from "@wordpress/components";

import Overlay from "./components/overlay";
import { Box } from "./components/box";
import { useStore as useInternal } from "./store/internal";

import "../scss/streamline.scss";

/**
 * App.
 */
export function App() {
  const isVisible = useInternal((state) => state.visible);
  const setVisible = useInternal((state) => state.setVisible);
  const menu = useInternal((state) => state.menu);
  const setMenu = useInternal((state) => state.setMenu);

  const toggleVisible = () => {
    setVisible(isVisible !== true);
  };
  const removeVisible = () => {
    setVisible(false);
  };

  const obj = [];
  const go = {};

  document.querySelectorAll(".menu-top > a").forEach((item) => {
    const name = item.innerText.replace(/(\r\n|\n|\r)/gm, "");
    const href = item.getAttribute("href");

    const subMenu = item.closest("li.menu-top");
    const subArr = [];

    if (subMenu) {
      subMenu.querySelectorAll("a").forEach((itemSub) => {
        const nameSub = itemSub.innerText.replace(/(\r\n|\n|\r)/gm, "");
        const hrefSub = itemSub.getAttribute("href");

        subArr.push({
          name: nameSub,
          href: hrefSub,
        });
      });
    }

    obj.push({
      name,
      href,
      children: subArr,
    });
  });

  obj.push(go);

  useEffect(() => {
    setMenu(obj);
    setVisible(true);
  }, []);

  return (
    <Fragment>
      <KeyboardShortcuts
        bindGlobal={true}
        shortcuts={{
          "command+k": toggleVisible,
          esc: removeVisible,
        }}
      />
      {isVisible && (
        <div className="streamline__inner">
          <Overlay onClick={() => setVisible(false)} />
          {menu && <Box />}
          <ScrollLock />
        </div>
      )}
    </Fragment>
  );
}
render(<App />, document.getElementById(`streamline`));
