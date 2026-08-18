import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const tenant = env.VITE_TENANT || "default";
  const themePath = path.resolve(__dirname, `src/styles/${tenant}.scss`);
  const resolvedTheme = fs.existsSync(themePath)
    ? themePath
    : path.resolve(__dirname, "src/styles/default.scss");

  const basePath = env.VITE_BASE_PATH || `/${tenant}/`;

  return {
    base: basePath.endsWith("/") ? basePath : `${basePath}/`,
    resolve: {
      alias: {
        "@tenant-theme": resolvedTheme
      }
    },
    plugins: [react()],
    ssgOptions: {
      dirStyle: "nested"
    },
    server: {
      port: 5173
    }
  };
});
