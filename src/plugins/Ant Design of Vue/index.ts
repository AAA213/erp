//从Ant Design Vue导入notification，注意首字母小写
import { notification } from "ant-design-vue";
import type { App } from "vue";
//notification的全局配置方法
notification.config({
  duration: 2,
});
//在Vue的原型链中增加notification属性
export const mountAntd = (app: App<Element>) => {
  app.config.globalProperties.$notification = notification;
};
