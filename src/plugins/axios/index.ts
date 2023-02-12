import axios from "axios";

import { getToken, getTokenHeader } from "@/utils/token";
// 使用 unplugin-vue-components 来进行按需加载时无法处理非组件模块，如 message，notification,这种组件需要手动加载：
import "ant-design-vue/es/notification/style/css";
const instance = axios.create({
  baseURL: "http://120.24.64.5:8088/mall-admin/",
  timeout: 30000,
});

// 拦截器
instance.interceptors.request.use(
  (config) => {
    if (getToken() && getTokenHeader()) {
      // config.headers[getTokenKey() as string] = getToken();
      config.headers["Authorization"] =
        (getTokenHeader() as string) + " " + getToken();
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  (result) => {
    // if (result.data.code !== "200") {
    //   notification["error"]({
    //     message: "系统提示",
    //     description: result.data.message,
    //   });
    // }
    return result.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
