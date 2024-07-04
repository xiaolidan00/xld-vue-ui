import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/tests/*.test.ts'],
      environment: 'happy-dom',
      reporters: ['html']
    }
  })
);
