import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/home/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
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
