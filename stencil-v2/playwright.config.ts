import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testIgnore: 'components/**',
  testMatch: 'test/**/*.ts',
  retries: 3,
  workers: 8,
};

export default config;
