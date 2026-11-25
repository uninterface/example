import { test as base } from '@playwright/test'
import { uiTestAdapter } from '@uninterface/backend/testing'
import { createUiTest, type UiTest } from '@uninterface/testing/playwright'

export { expect } from '@playwright/test'

export const test = base.extend<{ ui: UiTest }>({
  ui: async ({ page }, use) => {
    await use(createUiTest(page, uiTestAdapter))
  },
})
