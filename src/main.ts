import { createApp } from "vue";
import App from "./App.vue";
import { initRouter } from "./router";
import { initPinia } from "@/stores/counter";
import { mountAntd } from "./plugins/Ant Design of Vue";

import "./assets/styles/rebase.less";

const app = createApp(App);
// 调用挂载Pinia的方法
initPinia(app);
// 调用挂载路由的方法
initRouter(app);
// 调用挂载antd
mountAntd(app);

app.mount("#app");
