import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './scripts',
  timeout: 45000,
  use: {
    channel: 'chrome',
    headless: true,
  },
});
