// @ts-ignore
import autoprefixer from 'autoprefixer';
import * as tailwindConfig from './tailwind.config.js';
import purgecss from '@fullhuman/postcss-purgecss';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';
import { Config } from '@stencil/core';
import { defaultExtractor } from 'tailwindcss/lib/lib/defaultExtractor';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'streamline',
  globalStyle: 'src/css/global.scss',
  taskQueue: 'async',
  devServer: {
    reloadStrategy: 'pageReload',
  },
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      dir: '../assets/components',
      empty: true,
    },
  ],
  globalScript: 'src/global/script.ts',
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: ['./src/css/mixins.scss'],
    }),
    tailwind({
      tailwindCssPath: './src/css/tailwind.css',
      tailwindConf: tailwindConfig,
      postcss: {
        plugins: [
          tailwindcss(),
          purgecss({
            content: ['./**/*.tsx'],
            safelist: [
              ':root',
              ':host',
              ':shadow',
              '/deep/',
              '::part',
              '::theme',
            ],
            defaultExtractor,
          }),
          autoprefixer(),
        ],
      },
    }),
    tailwindHMR(),
  ],
};
