import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  //融合vite的配置
  viteConfig,
  defineConfig({
    test: {
      include: ['src/tests/*.test.ts'],
      //模拟测试环境
      environment: 'happy-dom',
      //测试报告类型
      reporters: ['default']
    }
  })
);
