import path from "path";
import UnoCSS from "unocss/vite";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  base: "/Comparador-de-Cuotas/",
  plugins: [solidPlugin(), UnoCSS()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
});
