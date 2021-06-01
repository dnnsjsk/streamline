// eslint-disable-next-line no-unused-vars
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'streamline',
  globalStyle: 'src/globals/globals.scss',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      dir: '../assets',
      empty: true,
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/globals/mixins.scss', 'src/globals/mq.scss'],
    }),
  ],
  devServer: {
    openBrowser: false,
  },
  extras: {
    initializeNextTick: false,
  },
};
