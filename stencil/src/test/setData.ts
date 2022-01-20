import { state } from '../store/internal';

export function enableMultisite() {
  state.data = {
    ...state.data,
    network: true,
  };
}

export function disableMultisite() {
  state.data = {
    ...state.data,
    network: false,
  };
}
