// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';

export default function Icon(props) {
  return (
    <div
      innerHTML={props.icon}
      class={{
        'icon h-3.5 w-3.5 fill-current': true,
        [props.class]: props.class,
      }}
    />
  );
}
