import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Atalho '@' para a pasta 'src'
    },
  },
  server: {
    port: 3000, // Porta do servidor de desenvolvimento
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
    hmr: {
      overlay: true, // Mantém o overlay de erros ativado para feedback visual
    },
  },
  build: {
    sourcemap: true, // Gera mapas de fonte para depuração em produção
    chunkSizeWarningLimit: 1000, // Aumenta o limite de tamanho do chunk para evitar avisos
    outDir: 'dist', // Garantir que o Vite coloca os arquivos de build na pasta correta
    assetsDir: 'assets', // Pasta onde os arquivos estáticos (CSS, JS, imagens) serão colocados
  },
});
