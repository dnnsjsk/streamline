import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testIgnore: 'components/**',
  testMatch: 'test/**/*.ts',
  retries: 3,
  workers: 4,
};

export default config;
