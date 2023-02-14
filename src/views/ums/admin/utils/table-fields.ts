import { filterTime } from "@/utils/fun";
const tableFields = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    width: 100,
  },
  {
    title: "昵称",
    key: "nickName",
    dataIndex: "nickName",
    width: 120,
  },
  {
    title: "icon",
    dataIndex: "icon",
    key: "icon",
  },

  {
    title: "邮箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "密码",
    key: "password",
    dataIndex: "password",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "登录时间",
    key: "loginTime",
    dataIndex: "loginTime",
    customRender: ({ text }: { text: Date }) => {
      if (text === null) {
        return;
      }
      return filterTime(text);
    },
  },
  {
    title: "备注",
    key: "note",
    dataIndex: "note",
  },
  {
    title: "创建时间",
    key: "createTime",
    dataIndex: "createTime",
    customRender: ({ text }: { text: Date }) => {
      return filterTime(text);
    },
  },
];
export default () => tableFields;
