import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	clearScreen: false,
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: 'index.html'
			})
		})
	],
	// Match the WebView requirements documented in README.md.
	build: {
		target: ['chrome111', 'safari16.4']
	},
	server: {
		// Keep this in sync with build.devUrl in src-tauri/tauri.conf.json.
		port: 5173,
		strictPort: true,
		watch: {
			ignored: ['**/src-tauri/**']
		}
	}
});
