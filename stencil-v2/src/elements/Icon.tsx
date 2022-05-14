// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';

export const Icon = (props) => {
  return (
    <div
      innerHTML={props.icon}
      class={{
        'fill-current h-3.5 w-3.5 lg:h-4 lg:w-4': true,
        [props.class]: props.class,
      }}
    />
  );
};
