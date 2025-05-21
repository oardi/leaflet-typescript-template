import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	root: './src',
	build: {
		outDir: '../dist',
	},
	server: {
		port: 3333,
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'mixed-decls'],
			},
		},
	},
	plugins: [tsconfigPaths()],
});
