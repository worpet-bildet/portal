import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    mode === 'production'
      ? ''
      : process.env.SHIP_URL ||
        process.env.VITE_SHIP_URL ||
        'http://localhost:80';
  console.log(
    `Building for ${mode} at URL: ${SHIP_URL} with indexer: ${process.env.VITE_INDEXER}`
  );

  return defineConfig({
    plugins: [
      svelte(),
      viteCommonjs(),
      urbitPlugin({
        base: 'portal',
        target: SHIP_URL,
        changeOrigin: true,
        secure: false,
      }),
    ],
    resolve: {
      alias: {
        '@assets': path.resolve('./src/assets'),
        '@root': path.resolve('./src'),
        '@pages': path.resolve('./pages'),
        '@components': path.resolve('./src/components/index.ts'),
        '@fragments': path.resolve('./src/fragments'),
        $types: path.resolve('./src/types'),
      },
    },
  });
};
