// eslint-disable-next-line no-unused-vars
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import tailwind from 'stencil-tailwind-plugin';

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
      injectGlobalPaths: ['src/globals/mixins.scss'],
    }),
    tailwind({
      tailwindCssPath: './tailwind.css',
    }),
  ],
  devServer: {
    openBrowser: false,
  },
  extras: {
    initializeNextTick: false,
  },
};
