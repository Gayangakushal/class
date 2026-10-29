import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [viteTsConfigPaths(), tanstackRouter({ target: "react", autoCodeSplitting: true }), viteReact(), tailwindcss()],
  resolve: { dedupe: ["react", "react-dom"] },
  server: { host: true, port: 5173, strictPort: true },
});
