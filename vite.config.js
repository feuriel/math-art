import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        circlesOfLines: resolve(__dirname, "art/circlesOfLines/index.html"),
        particles: resolve(__dirname, "art/particles/index.html"),
        home: resolve(__dirname, "art/index.html"),
        mandala1: resolve(__dirname, "art/mandala1/index.html"),
      },
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
  server: {
    open: "art/",
  },
});
