import axios from "@/plugins/axios";
import type { promiseRes, loginInfoRes, loginRes } from "@/types/apiTypes";
/**
 * 登录
 * @param data
 * @returns
 */

const login = (data: object): promiseRes<loginRes> => {
  return axios.post("/admin/login", data);
};
/**
 * 获取用户信息
 */

const getAdminInfo = (): promiseRes<loginInfoRes> => {
  return axios.get("/admin/info");
};

export { login, getAdminInfo };
