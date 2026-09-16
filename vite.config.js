import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import { google } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import { getHostname } from 'tldts';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const hostname = getHostname(env.APP_URL);

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.js'],
                refresh: true,
                fonts: [
                    google('Instrument Sans', {
                        alias: 'sans',
                        weights: [400, 500, 600, 700],
                        styles: ['normal', 'italic'],
                        subsets: ['latin'],
                        display: 'swap',
                        preload: [
                            { weight: 400 },
                            { weight: 500 },
                            { weight: 600 },
                            { weight: 700 },
                        ],
                        fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
                    }),
                ],
            }),
            tailwindcss(),
        ],

        server: {
            host: '0.0.0.0',
            port: 5173,
            strictPort: true,
            cors: true,
            allowedHosts: [hostname],
            https: {
                key: fs.readFileSync(path.resolve(import.meta.dirname, 'docker/nginx/certs/laravel.key')),
                cert: fs.readFileSync(path.resolve(import.meta.dirname, 'docker/nginx/certs/laravel.crt')),
            },
            origin: env.APP_URL,
            hmr: {
                host: hostname,
                protocol: 'wss',
                port: 5173
            },
            watch: {
                ignored: ['**/docker/**', '**/app/**', '**/routes/**', '**/bootstrap/**', '**/database/**', '**/config/**'],
            },
        },
    };
});
