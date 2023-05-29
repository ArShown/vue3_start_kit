import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      path: "path-browserify",
    },
    extensions: [".vue", ".js"],
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
