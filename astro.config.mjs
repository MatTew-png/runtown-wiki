import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'tap'
  },
  server: {
    host: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx()
  ]
});
