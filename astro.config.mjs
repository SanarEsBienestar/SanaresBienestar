import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // adapter: node({
  //   mode: "standalone"
  // }),
  integrations: [
    vue(), 
    tailwind()
  ]
});