interface apiRes<T> {
  code: number;
  data: T;
  message: string;
}
type promiseRes<T> = Promise<apiRes<T>>;
interface loginRes {
  token: string;
  tokenHead: string;
}
interface loginInfoRes {
  icon: string;
  menus: [];
  roles: string[];
  username: string;
}

interface userListObj {
  createTime: string;
  email: string;
  icon: string;
  id: number;
  loginTime: string;
  nickName: string;
  note: string;
  password: string;
  status: number;
  username: string;
}
interface userList {
  list: userListObj[];
  pageNum: number;
  pageSize: number;
  total: number;
  totalPage: number;
}
type userListRes = promiseRes<userList>;
export type { promiseRes, loginInfoRes, loginRes, userListRes, userListObj };
