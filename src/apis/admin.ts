import axios from "@/plugins/axios";
import type { userListRes } from "@/types/apiTypes";

/**
 * 获取用户列表

 */
const getUserList = (params = { pageNum: 1, pageSize: 10 }): userListRes => {
  return axios.get("/admin/list", { params });
};
export { getUserList };
