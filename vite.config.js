import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        lines: resolve(__dirname, "src/lines/index.html"),
        particles: resolve(__dirname, "src/particles/index.html"),
      },
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
  server: {
    open: "/src/home/index.html",
  },
});
