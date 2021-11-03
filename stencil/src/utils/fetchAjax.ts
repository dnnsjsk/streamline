import { stateInternal } from '../store/internal';

export function fetchAjax(obj) {
  stateInternal.isProcessing = true;
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
    )}&nonce=${streamline.nonce}&userId=${String(stateInternal.data.userId)}`,
  })
    .then((response) => response && response.json())
    .then(() => {
      stateInternal.isProcessing = false;
      obj.callback && obj.callback();
    })
    .catch(() => {
      console.log();
    });
}
