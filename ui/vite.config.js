import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:80';
  console.log({ SHIP_URL });

  return defineConfig({
    plugins: [
      svelte(),
      urbitPlugin({
        base: 'portal-dev',
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
        '@components': path.resolve('./src/components'),
        '@fragments': path.resolve('./src/fragments'),
      },
    },
  });
};
