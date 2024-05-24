import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
import autoImport from 'unplugin-auto-import/vite'
import path from 'node:path';

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      pluginExposeRenderer(name),
      autoImport({
        imports: ['react'],
        dts: './src/types/auto-imports.d.ts',
      }),
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/web/components'),
        '@layouts': resolve('src/web/layouts'),
        '@pages': resolve('src/web/pages'),
        '@routes': resolve('src/web/routes'),
        '@utils': resolve('src/web/utils'),
        '@redux': resolve('src/web/redux'),
      },
    },
    clearScreen: false,
  } as UserConfig;
});
