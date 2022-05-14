import { h } from './internal-398bd786.js';

// eslint-disable-next-line no-unused-vars
const Icon = (props) => {
  return (h("div", { innerHTML: props.icon, class: {
      'fill-current h-3.5 w-3.5 lg:h-4 lg:w-4': true,
      [props.class]: props.class,
    } }));
};

export { Icon as I };
