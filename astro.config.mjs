// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://hexecute.app',

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [react(), svelte()],

    server: {
        allowedHosts: ['tunnel.thatother.dev'],
    },
});