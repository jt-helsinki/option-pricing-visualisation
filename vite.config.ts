import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        global: {},
        'process.env': process.env
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "./src"),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            util: "util",
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: "globalThis",
            },
            // Enable esbuild polyfill plugins
            plugins: [
            ],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@ "./src/index.scss";`,
            },
            style: {
                define: {},
            },
        },
    }
})
