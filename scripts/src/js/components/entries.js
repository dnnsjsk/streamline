import { Button } from "@wordpress/components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useStore as useInternal } from "../store/internal";

/**
 * Entries.
 *
 * @param {Object} props
 */
export default function Entries(props) {
  const menu = useInternal((state) => state.menu);
  const setMenu = useInternal((state) => state.setMenu);

  /**
   * Plugin that hides popper on blur.
   */
  const hideOnPopperBlur = {
    name: "hideOnPopperBlur",
    defaultValue: true,
    fn(instance) {
      return {
        onCreate() {
          instance.popper.addEventListener("focusout", (event) => {
            if (
              instance.props.hideOnPopperBlur &&
              event.relatedTarget &&
              !instance.popper.contains(event.relatedTarget)
            ) {
              instance.hide();
            }
          });
        },
      };
    },
  };

  return (
    <ul tabIndex="-1" className="streamline__entries">
      {props.items &&
        [props.items].map((item) => {
          return Object.values(item).map((itemInner, indexInner) => {
            return (
              <li className="streamline__entry" key={indexInner}>
                <h1>{itemInner.name}</h1>
                {itemInner.children && (
                  <ul className="streamline__entries--sub">
                    {Object.values(itemInner.children).map(
                      (itemSub, indexSub) => {
                        return (
                          <li className="streamline__entry--sub" key={indexSub}>
                            <Tippy
                              content={
                                <button className="streamline__tippy-button">
                                  Favorite
                                </button>
                              }
                              zIndex={99999999999}
                              delay={0}
                              duration={0}
                              interactive={true}
                              plugins={hideOnPopperBlur}
                            >
                              <Button isTertiary href={itemSub.href}>
                                {itemSub.name}
                              </Button>
                            </Tippy>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}
              </li>
            );
          });
        })}
    </ul>
  );
}
