import { stateInternal } from '../store/internal';

export function setTestMode() {
  stateInternal.commands = {
    local: {
      site: {
        condition: false,
        name: '/site [name]',
        description: `Display entries from a different site in the network.`,
        callback: 'get_sites',
      },
      network: {
        condition: false,
        name: '/network',
        description: `Display entries from a from network dashboard.`,
      },
    },
  };
}
