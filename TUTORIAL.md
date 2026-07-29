# Creating a desktop application with Tauri and SvelteKit

> [!NOTE]
> Clone this repository to see the completed configuration.

## Step 0: Install the prerequisites

Install the current [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/). You
will need Rust, the platform-specific system dependencies, and a supported Node.js release
(22.12 or newer within Node 22, or Node 24+).

## Step 1: Create a SvelteKit project

Create the project with the current Svelte CLI:

```shell
npx sv create tauri-sveltekit
cd tauri-sveltekit
npm install
```

You can follow the same steps in an existing SvelteKit project.

### Configure a static SPA build

Tauri loads static frontend assets in its webview, so install SvelteKit's static adapter:

```shell
npm install -D @sveltejs/adapter-static
npm uninstall -D @sveltejs/adapter-auto
```

Configure `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		})
	}
};

export default config;
```

Create `src/routes/+layout.js` to make the application a client-rendered SPA:

```javascript
export const ssr = false;
```

Add explicit frontend scripts to `package.json`:

```json
{
	"scripts": {
		"sveltekit:dev": "vite dev",
		"sveltekit:build": "vite build"
	}
}
```

Tailwind is optional. To match this repository, add it with the Svelte CLI:

```shell
npx sv add tailwindcss
```

## Step 2: Add Tauri

Install the Tauri 2 CLI:

```shell
npm install -D @tauri-apps/cli@latest
```

Add the Tauri scripts to `package.json`:

```json
{
	"scripts": {
		"dev": "npm run tauri dev",
		"build": "npm run tauri build",
		"tauri": "tauri"
	}
}
```

Initialize the Rust backend:

```shell
npx tauri init
```

Use values matching the SvelteKit development server and static build:

```text
What is your app name? tauri-sveltekit
What should the window title be? Tauri x SvelteKit
Where are your web assets located? ../build
What is the URL of your dev server? http://localhost:5173
What is your frontend dev command? npm run sveltekit:dev
What is your frontend build command? npm run sveltekit:build
```

The resulting `src-tauri/tauri.conf.json` build section should look like this:

```json
{
	"build": {
		"beforeBuildCommand": "npm run sveltekit:build",
		"beforeDevCommand": "npm run sveltekit:dev",
		"devUrl": "http://localhost:5173",
		"frontendDist": "../build"
	}
}
```

Tauri recommends preventing Vite from watching generated Rust files. Add the watch
exclusion alongside your existing Vite plugins:

```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			ignored: ['**/src-tauri/**']
		}
	}
});
```

If you change Vite's port, update `build.devUrl` in `tauri.conf.json` to match.

## Step 3: Add optional native APIs

The Tauri CLI is a development dependency. Frontend APIs and native functionality are
provided by separate Tauri packages and plugins. For example:

```shell
npm run tauri add fs
```

Tauri 2 controls access through capability files in `src-tauri/capabilities/`. Grant only
the commands and path scopes the application needs. See the
[capabilities guide](https://v2.tauri.app/security/capabilities/) and the documentation
for each plugin before enabling permissions.

## Step 4: Run and build the application

Start the desktop application in development mode:

```shell
npm run dev
```

Keep `src-tauri/Cargo.lock` in version control so application builds use the reviewed Rust
dependency graph.

Before distributing the app, set a unique reverse-domain identifier at the top level of
`src-tauri/tauri.conf.json`:

```json
{
	"identifier": "com.example.my-tauri-app"
}
```

Build the platform package:

```shell
npm run build
```

Bundles are written below `src-tauri/target/release/bundle/`. See the
[Tauri distribution documentation](https://v2.tauri.app/distribute/) for signing and
platform-specific packaging.
