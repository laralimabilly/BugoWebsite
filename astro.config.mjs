import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bugoapp.com', 
  integrations: [
    // Add integrations as needed
  ],
  vite: {
    ssr: {
      noExternal: ['gsap']
    }
  }
});