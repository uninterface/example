# Test Uninterface example

## Try the expense record editor

Follow the [README](../README.md) to start the app. Data is kept in memory, so a reload restores the sample record.

1. Clear **Name** and press Tab. Once the error appears, click **Save**. Focus returns to **Name**.
2. Edit the name, amount, category and enabled state. Enter `12.345` to see the amount round to `$12.35`.
3. Select **Fail next save**, then click **Save**. The draft stays in the editor and **Last saved record** keeps its previous values.
4. Save again. After it succeeds, edit a value and click **Reset** to restore the latest saved values.

The [record editor](../src/RecordEditor.vue) creates its form and draft from the initial record when it mounts. A successful save sets the next Reset baseline. Unmounting the editor disposes its form and category controls. The [application](../src/App.vue) supplies the initial record, simulates save failure and displays the most recently saved values. The save callback receives valid amounts as integer cents.

## Run the browser tests

From the repository root with Node.js 24 or 26 and npm:

```sh
npm ci
npm run build
npm test
```

The example uses `/usr/bin/chromium` when available. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an absolute executable path to use another Chromium or Chrome installation.

On a machine without a local Chromium installation, run `npx playwright install chromium`. By default, Playwright stores the download in a per-user cache shared by projects that need the same browser revision. Keep `PLAYWRIGHT_BROWSERS_PATH` unset or point it to the same shared directory across projects.

`npm run build` checks types and builds the app. Playwright checks focus recovery on invalid submission after blur validation, then exercises save failure, retry and reset in Chromium against both the production build and a fresh Vite dev server. The [GitHub Actions workflow](../.github/workflows/ci.yml) runs the same checks.

## Try the Uninterface testing harness

The [harness sample](../tests/testing-harness.spec.ts) is part of `npm test`. It uses `@uninterface/testing` to select a category by its business key and check the saved record. The [shared fixture](../tests/fixtures.ts) imports the selected backend's adapter through `@uninterface/backend/testing`. To run the suite with another backend, choose one that provides this export and supports the installed `@uninterface/testing` version. The test command uses `tsx` to support TypeScript adapters.

```sh
npm test -- tests/testing-harness.spec.ts
```
