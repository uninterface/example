import { existsSync } from 'node:fs'
import { defineConfig, devices } from '@playwright/test'

const productionUrl = 'http://127.0.0.1:4173'
const developmentUrl = 'http://127.0.0.1:4174'
const chromiumExecutable =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ??
  (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined)

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'production',
      use: { baseURL: productionUrl },
    },
    {
      name: 'development',
      use: { baseURL: developmentUrl },
    },
  ],
  use: {
    ...devices['Desktop Chrome'],
    launchOptions: {
      executablePath: chromiumExecutable,
    },
  },
  webServer: [
    {
      command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
      url: productionUrl,
    },
    {
      command:
        'npm run dev -- --host 127.0.0.1 --port 4174 --strictPort --force',
      url: developmentUrl,
    },
  ],
})
