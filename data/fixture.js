import { test as base } from '@playwright/test';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';

// Extend the base test with additional fixtures
export const test = base.extend({
  blocker: async ({ context }, use) => {
    // Load adblocker engine
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(context);

    // Use the blocker in the tests
    await use(blocker);
  },
});

export { expect } from '@playwright/test';
