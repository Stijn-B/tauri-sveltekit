import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [tailwindcss(), sveltekit()],
	server: {
		watch: {
			ignored: ['**/src-tauri/**']
		}
	}
};

export default config;
