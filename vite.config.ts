import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dns from 'dns';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import vitePluginImp from 'vite-plugin-imp';
import viteSentry from 'vite-plugin-sentry';
import envCompatible from 'vite-plugin-env-compatible';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import tailwindcss from 'tailwindcss';
import Pages from 'vite-plugin-pages';

dns.setDefaultResultOrder('verbatim');

type viteConfigProps = {
  mode: string;
};

export default ({ mode }: viteConfigProps) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    cacheDir: '.vite',
    plugins: [
      react(),
      envCompatible(),
      viteTsconfigPaths(),
      svgrPlugin(),
      Pages(),
      viteSentry({
        url: process.env.REACT_APP_SENTRY_URL,
        authToken: process.env.REACT_APP_SENTRY_AUTH_TOKEN,
        org: process.env.REACT_APP_SENTRY_ORG,
        project: process.env.REACT_APP_SENTRY_PROJECT,
        release: '1.0',
        deploy: {
          env: 'staging',
        },
        setCommits: {
          auto: true,
        },
        sourceMaps: {
          include: ['./build/assets'],
          ignore: ['node_modules'],
          urlPrefix: '~/assets',
        },
      }),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: name => {
              return `antd/es/${name}/style/index.js`;
            },
          },
        ],
      }),
      AutoImport({
        // imports: ['vitest'],
        imports: mode === 'test' ? ['vitest'] : [], // chỉ import vitest khi test
        dts: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    resolve: {
      alias: [{ find: '~', replacement: resolve(__dirname, './node_modules') }],
    },
    server: {
      port: 5000,
      open: true,
    },
    optimizeDeps: {
      include: ['@ant-design/icons'],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
    build: {
      sourcemap: false,
      outDir: 'build',
      ...(process.env.ANALYZE === 'true' && {
        rollupOptions: {
          cache: false,
          plugins: [
            visualizer({
              open: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              brotliSize: true,
            }),
          ],
        },
      }),
    },
  });
};
