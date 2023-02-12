import axios from "@/plugins/axios";
import type {
  promiseRes,
  loginInfoRes,
  loginRes,
  userListObj,
} from "@/types/apiTypes";
/**
 * 获取用户列表

 */
const getUserList = (data = {}): promiseRes<userListObj[]> => {
  return axios.get("/admin/list", data);
};
export { getUserList };
