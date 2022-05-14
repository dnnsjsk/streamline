export const data = (method = 'GET') => {
  return {
    method: method,
    credentials: 'same-origin',
    headers: {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      'X-WP-Nonce': window?.streamline?.nonceRest,
      'Content-Type': 'application/json',
    },
  };
};
