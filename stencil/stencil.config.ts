// @ts-ignore
import autoprefixer from 'autoprefixer';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import purgecss from '@fullhuman/postcss-purgecss';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';
import { defaultExtractor } from 'tailwindcss/lib/lib/defaultExtractor';

const colors = require('tailwindcss/colors');

const tailwindConfig = {
  mode: 'jit',
  content: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      amber: colors.amber,
      black: colors.black,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      lime: colors.lime,
      neutral: colors.neutral,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      sky: colors.sky,
      slate: colors.slate,
      stone: colors.stone,
      teal: colors.teal,
      violet: colors.violet,
      white: colors.white,
      yellow: colors.yellow,
      zinc: colors.zinc,
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    borderRadius: {
      none: '0px',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    extend: {
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
    },
  },
};

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
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/mixins.scss'],
    }),
    tailwind({
      tailwindCssPath: './tailwind.css',
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
