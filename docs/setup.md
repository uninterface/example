# Choose a backend

Run `npm ci` from this checkout to install the dependencies recorded in the lockfile. The `@uninterface/backend` dependency in [`package.json`](../package.json) is an npm alias. Keep that key so the application's imports resolve to the package named in its value.

1. Choose a backend compatible with your Core and Vue versions and the capabilities declared in [application setup](../src/main.ts).
2. Set the alias value to `npm:<package>@<version-or-tag>`, using the package name and a compatible release or dist-tag from its setup guide. Follow that guide for any Vite or application setup steps.
3. Run `npm install` to update the lockfile, then `npm run build`. Review and commit `package-lock.json` with the manifest change.

The example uses Vite's default dependency optimization with the Vue plugin. It loads the shared bundled font set from `@uninterface/fonts/font-bundled.css` before the selected backend's stylesheet.

The record editor uses Core imports. The [browser tests](testing.md) use the same backend alias as the application.
