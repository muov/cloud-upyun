import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    // 配置允许访问的主机列表
    // 可选：如果需要开放所有主机访问（开发环境临时使用）
    allowedHosts: true,
  },
});
