// eslint-disable-next-line no-unused-vars
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import tailwind from 'stencil-tailwind-plugin';

export const config: Config = {
  namespace: 'streamline',
  globalStyle: 'src/scss/globals.scss',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      dir: '../assets/components',
      empty: true,
    },
    {
      type: 'dist-custom-elements-bundle',
      dir: '../assets/bundle',
      empty: true,
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/mixins.scss'],
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
  testing: {
    setupFilesAfterEnv: ['./jest.config.ts'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$':
        '<rootDir>/node_modules/@stencil/core/testing/jest-preprocessor.js',
    },
    transformIgnorePatterns: ['/node_modules/(?!deepdash-es|lodash-es)'],
  },
};
