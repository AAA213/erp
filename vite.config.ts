import { fileURLToPath, URL } from "node:url";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // Ant Design of Vue 按需导入
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    // 为传统浏览器提供支持 类似babel
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".ts", ".js"],
  },
});
