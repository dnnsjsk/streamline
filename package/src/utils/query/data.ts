import { state } from '../../store/internal';

export default function data(method = 'GET') {
  return {
    method,
    credentials: 'same-origin',
    headers: {
      'X-WP-Nonce': state.data.nonceRest,
      'Content-Type': 'application/json',
    },
  };
}
