import path from "path";
import { urbitPlugin } from "@urbit/vite-plugin-urbit";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    mode === "production" ? "" : process.env.SHIP_URL || process.env.VITE_SHIP_URL || "";
  console.log(SHIP_URL);

  console.log(`Building for ${mode}`);

  return defineConfig({
    plugins: [
      urbitPlugin({
        base: "portal",
        target: SHIP_URL,
        changeOrigin: true,
        secure: false,
      }),
      reactRefresh(),
    ],
    resolve: {
      alias: {
        "@mui/material": path.resolve("./node_modules/@mui/material"),
        "@assets": path.resolve("./src/assets"),
        "@components": path.resolve("./src/components"),
        "@lib": path.resolve("./src/lib"),
        "@pages": path.resolve("./src/pages"),
        "@state": path.resolve("./src/state"),
        "@utils": path.resolve("./src/utils"),
      },
    },
    build: {
      sourcemap: false,
      manifest: true,
    },
  });
};
