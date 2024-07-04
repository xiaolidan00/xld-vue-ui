import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      cacheDir: 'node_modules/.vite-storybook' // 避免跟开发环境一个缓存目录，以免相互覆盖；
    });
  }
};
export default config;
