import { useEffect, useState } from "@wordpress/element";
import { filterDeep } from "deepdash-es/standalone";

import Sidebar from "./sidebar";
import Entries from "./entries";
import Search from "./search";

import { useStore as useLocal } from "../store/local";
import { useStore as useInternal } from "../store/internal";

/**
 * Box.
 */
export function Box() {
  const active = useLocal((state) => state.active);
  const menu = useInternal((state) => state.menu);
  const [value, setValue] = useState("");
  const [obj, setObj] = useState([]);

  const data = menu;

  function onValueChange(nextValue) {
    setValue(nextValue);

    const newObj =
      obj === null || nextValue === ""
        ? data
        : filterDeep(
            data.filter((val) => Object.keys(val).length !== 0),
            function (o) {
              return o.name.toLowerCase().includes(nextValue.toLowerCase());
            },
            { childrenPath: ["children"] }
          );

    setObj(newObj);
  }

  useEffect(() => {
    setObj(data);
  }, []);

  return (
    <div className="streamline__box">
      <Sidebar />
      <div className="streamline__box-inner">
        <Search
          value={value}
          onChange={(nextValue) => onValueChange(nextValue)}
        />
        {active === "menu" ? <Entries items={obj} /> : ""}
      </div>
    </div>
  );
}
