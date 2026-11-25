# Choose a backend

[`package.json`](../package.json) declares Core and the selected backend independently. The `@uninterface/backend` dependency is an npm alias. Keep that key so the application's imports resolve to the package named in its value.

1. Choose a published backend that supports the installed Core and Vue versions and the capabilities declared in [application setup](../src/main.ts).
2. Set the alias value to `npm:@uninterface/backend-xxx@VERSION`, replacing `xxx` with the backend package suffix and `VERSION` with a version or dist-tag. Follow the selected backend's setup guide for any additional integration requirements.
3. Run `npm install` to update the lockfile, then `npm run build`. Review and commit `package-lock.json` with the manifest change. `npm ci` reproduces its resolved versions.

The example uses Vite's default dependency optimization with the Vue plugin. It loads the shared bundled font set from `@uninterface/fonts/font-bundled.css` before the selected backend's stylesheet.

The record editor uses Core imports. The [browser tests](testing.md) use the same backend alias as the application.
