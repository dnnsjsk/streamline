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
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      dir: '../includes/assets/components',
      empty: true,
    },
  ],
  devServer: {
    openBrowser: false,
  },
  sourceMap: false,
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
};
