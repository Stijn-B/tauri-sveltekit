![Tauri x SvelteKit Banner](/readme_assets/banner.png)

# Tauri x SvelteKit

1. [Getting Started](#getting-started)
2. [How it Works](#how-it-works)
3. [About the Frameworks](#about-the-frameworks)
4. [Desktop Apps with SvelteKit and Tauri - Step-by-Step Tutorial](#desktop-apps-with-sveltekit-and-tauri---step-by-step-tutorial)

## Getting Started

Install the current [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/), including
Rust and a supported Node.js release (22.12 or newer within Node 22, or Node 24+). The
repository's recommended Node and Rust toolchains are recorded in `.nvmrc` and
`rust-toolchain.toml`.

**Install the packages**

```shell
npm ci
```

**Specify your application identifier**

To build your Tauri app you must specify its identifier in reverse domain name notation (e.g. `com.tauri.my-tauri-app`). This string must be unique across applications and contain only alphanumeric characters (A–Z, a–z, and 0–9), hyphens (-), and periods (.).

Set your application identifier in `src-tauri/tauri.conf.json`:

```json
{
	"identifier": "com.example.my-tauri-app"
}
```

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

## How it works

Tauri can integrate any frontend framework that compiles to HTML, JS and CSS. SvelteKit can be configured to build a static single-page app using the [@sveltejs/adapter-static adapter](https://kit.svelte.dev/docs/adapter-static). This enables us to use Tauri with SvelteKit.

> [!IMPORTANT]  
> In SPA mode, SvelteKit features that require a server, such as server-side rendering (SSR) and server endpoints, are not available at runtime. Tauri loads the pre-built static files directly in its webview instead of running a SvelteKit server.

## About the frameworks

[**Tauri**](https://tauri.app/) is a framework for building tiny, blazing fast binaries for all major desktop platforms. Developers can integrate any frontend framework that compiles to HTML, JS and CSS for building their user interface. Tauri places a great emphasis on [security](https://tauri.app/security/). You can check out how the Tauri architecture works and get a grasp on how the different components integrate [here](https://tauri.app/concept/architecture/).

[**SvelteKit**](https://kit.svelte.dev/) is an application framework powered by Svelte which applies a new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes which results in better performance.

## Desktop Apps with SvelteKit and Tauri - Step-by-Step Tutorial

The [TUTORIAL.md](/TUTORIAL.md) file contains a current Tauri 2 and SvelteKit 2 guide for manually creating the same setup. It is useful when you want to turn an existing SvelteKit project into a desktop app, or add SvelteKit to an existing Tauri project.

> [!NOTE]  
> Clone this repository to get the final result of the tutorial.
