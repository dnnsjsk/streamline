// @ts-ignore
import autoprefixer from 'autoprefixer';
import * as tailwindConfig from './tailwind.config.js';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'streamline',
  taskQueue: 'async',
  devServer: {
    reloadStrategy: 'pageReload',
  },
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      dir: '../includes/assets/components',
      empty: true,
    },
  ],
  plugins: [
    inlineSvg(),
    sass(),
    tailwind({
      // @ts-ignore
      tailwindConf: tailwindConfig,
      tailwindCssPath: './src/css/tailwind.scss',
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    }),
    tailwindHMR(),
  ],
  testing: {
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$':
        '<rootDir>/node_modules/@stencil/core/testing/jest-preprocessor.js',
    },
    moduleNameMapper: {
      '^.+\\.svg$': 'jest-svg-transformer',
    },
    transformIgnorePatterns: ['/node_modules/(?!deepdash-es|lodash-es)'],
  },
};
