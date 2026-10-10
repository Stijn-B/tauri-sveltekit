![Tauri x SvelteKit Banner](/readme_assets/banner.png)

# Tauri x SvelteKit

1. [Getting Started](#getting-started)
2. [How it Works](#how-it-works)
3. [About the Frameworks](#about-the-frameworks)
4. [Desktop Apps with SvelteKit and Tauri - Step-by-Step Tutorial](#desktop-apps-with-sveltekit-and-tauri---step-by-step-tutorial)

## Getting Started

Use GitHub's **Use this template** button to create your own repository, then clone it
and open a terminal in the project directory.

Install the current [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/), including
Rust and a supported Node.js release (22.17 or newer within Node 22, or Node 24+). The
repository's recommended Node and Rust toolchains are recorded in `.nvmrc` and
`rust-toolchain.toml`.

**Install the packages**

```shell
npm ci
```

**Customize your application**

The starter runs with its placeholder settings. Before distributing your own app,
replace its identifier with a unique reverse-domain name (e.g. `com.example.my-tauri-app`).
It may contain alphanumeric characters (A–Z, a–z, and 0–9), hyphens (-), and periods (.).

Set your application identifier in `src-tauri/tauri.conf.json`:

```json
{
	"identifier": "com.example.my-tauri-app"
}
```

Also customize `productName`, `version`, and the window title in that file, the name
and version in `package.json`, and the package metadata in `src-tauri/Cargo.toml`.
Replace the starter icons with `npm run tauri -- icon path/to/your-icon.png`.

**Run the Tauri app**

For development, run the following command:

```shell
npm run dev
```

**Build the Tauri app**

For building the app into a distributable package, run the following command:

```shell
npm run build
```

**The initial app should look like this:**

![Screenshot of the Tauri app](/readme_assets/application-screenshot.png)

For frontend-only development, use `npm run sveltekit:dev`; `npm run preview` serves
the built frontend in a browser. These browser modes do not provide Tauri native APIs.
The desktop development server uses port 5173 and fails if it is already occupied.

Before submitting changes, run:

```shell
npm run check
npm run lint
npm run sveltekit:build
cd src-tauri
cargo fmt --check
cargo clippy --locked --all-targets --all-features -- -D warnings
cargo test --locked --all-targets --all-features
```

CI audits dependencies and runs frontend checks on Linux, macOS, and Windows. Native
release builds verify Linux DEB/AppImage/RPM packages, a macOS app bundle, and a Windows
NSIS installer. These checks validate compilation and packaging; they do not launch
the app or cover signing, notarization, Windows MSI installers, or macOS DMG images.

## How it works

Tauri can integrate any frontend framework that compiles to HTML, JS and CSS. SvelteKit can be configured to build a static single-page app using the [@sveltejs/adapter-static adapter](https://svelte.dev/docs/kit/adapter-static). This enables us to use Tauri with SvelteKit.

> [!IMPORTANT]  
> In SPA mode, SvelteKit features that require a server, such as server-side rendering (SSR) and server endpoints, are not available at runtime. Tauri loads the pre-built static files directly in its webview instead of running a SvelteKit server.

## Content Security Policy

The packaged app uses a [Content Security Policy](https://v2.tauri.app/security/csp/)
in `src-tauri/tauri.conf.json`. It permits local frontend assets and Tauri IPC; remote
scripts and frontend network requests are blocked by default. Tauri adds hashes and
nonces for its bundled scripts and styles. Inline style attributes remain allowed for
Svelte's DOM styling and this starter's gradient.

A separate `devCsp` permits inline script/style elements and the local Vite WebSocket
on port 5173 for development and hot reload. These allowances are not part of the
packaged app's policy. Update the WebSocket sources if you change the development port.

When adding an API or remote asset, add only the required origin to the appropriate
CSP directive. Native plugin permissions are configured separately through Tauri
capabilities. Test both `npm run dev` and a packaged build after changing the policy.

## About the frameworks

[**Tauri**](https://v2.tauri.app/) is a framework for building desktop applications with a Rust backend and a web frontend. See its [security documentation](https://v2.tauri.app/security/) and [architecture guide](https://v2.tauri.app/concept/architecture/) to understand how the webview and native backend interact.

[**SvelteKit**](https://svelte.dev/docs/kit/introduction) provides routing, build tooling, and application structure for [Svelte](https://svelte.dev/docs/svelte/overview). This template uses its static adapter and client-side routing to run inside Tauri's webview.

## Desktop Apps with SvelteKit and Tauri - Step-by-Step Tutorial

The [TUTORIAL.md](/TUTORIAL.md) file contains a current Tauri 2 and SvelteKit 3 guide for manually creating the same setup. It is useful when you want to turn an existing SvelteKit project into a desktop app, or add SvelteKit to an existing Tauri project.

> [!NOTE]  
> Clone this repository to get the final result of the tutorial.

## License

This template is licensed under the [MIT License](LICENSE). You may use it for personal
and commercial projects; retain the copyright and license notice in copies or
substantial portions of the template. Your own application may use a different license.
