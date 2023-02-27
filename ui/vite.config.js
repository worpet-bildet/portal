import path from "path";
import { fileURLToPath, URL } from "url";
import { urbitPlugin } from "@urbit/vite-plugin-urbit";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    process.env.SHIP_URL || process.env.VITE_SHIP_URL || "http://localhost:8080";
  console.log(SHIP_URL);

  return defineConfig({
    plugins: [
      urbitPlugin({ base: "portal", target: SHIP_URL, secure: false }),
      reactRefresh(),
    ],
    resolve: {
      alias: {
        "@mui/material": path.resolve("./node_modules/@mui/material"),
        // "@mui/styled-engine": path.resolve("./node_modules/@mui/styled-engine"),
        // "styled-components": path.resolve("./node_modules/styled-components"),
        // "@/": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      sourcemap: false,
      manifest: true,
    },
  });
};
