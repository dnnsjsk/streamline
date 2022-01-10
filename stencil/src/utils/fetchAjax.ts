import { state } from '../store/internal';

export function fetchAjax(obj) {
  state.isProcessing = true;
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const streamline = window.streamline || false;
  fetch(streamline.ajax, {
    method: 'POST',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `action=streamlineQuery&type=${obj.type}&query=${JSON.stringify(
      obj.query
      // @ts-ignore
      // eslint-disable-next-line no-undef
    )}&nonce=${streamline.nonce}&userId=${String(state.data.userId)}`,
  })
    .then((response) => response && response.json())
    .then(() => {
      state.isProcessing = false;
      obj.callback && obj.callback();
    })
    .catch(() => {
      console.log();
    });
}
