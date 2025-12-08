import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default defineConfig((env) => mergeConfig(
  viteConfig(env),
  defineConfig({
    test: {
      setupFiles: ['./tests/setup.ts'],
      globals: true,
      environment: 'happy-dom',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
        '**/e2e/**',
      ],
      reporters: 'default',
    },
  }),
));
