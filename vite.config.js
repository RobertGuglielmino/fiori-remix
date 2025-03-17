import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [remix({
    ignoredRouteFiles: ["**/.*"],
    serverModuleFormat: "esm",
    future: {
      v2_routeConvention: true,
      v2_errorBoundary: true,
      v2_meta: true,
    },
    tailwind: true
  }), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
});