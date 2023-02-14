import axios from "@/plugins/axios";
import type { userListRes } from "@/types/apiTypes";

/**
 * 获取用户列表

 */
const getUserList = (params = { pageNum: 1, pageSize: 10 }): userListRes => {
  return axios.get("/admin/list", { params });
};

/**
 * 跟新用户状态
 */
const upDateUserStatus = (params: { id: number; status: number }) => {
  return axios.post(`/admin/updateStatus/${params.id}`, null, { params });
};

/**
 * 注册用户
 */
const addUser = (data: {
  email: "string";
  icon: "string";
  nickName: "string";
  note: "string";
  password: "string";
  username: "string";
}) => {
  return axios.post(`admin/register`, data);
};

export { getUserList, upDateUserStatus };
