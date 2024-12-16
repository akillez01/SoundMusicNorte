import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Define '@' como atalho para 'src'
    },
  },
  server: {
    port: 3000, // Define a porta do servidor de desenvolvimento como 3000
    hmr: {
      overlay: false, // Desativa o overlay de erros no navegador
    },
  },
});
