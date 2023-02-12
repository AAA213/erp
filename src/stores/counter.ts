import { defineStore } from "pinia";
import type { loginInfoRes } from "@/types/apiTypes";
import { createPinia } from "pinia";
import type { App } from "vue";
import { arr2Tree } from "@/utils/fun";
import { getAdminInfo } from "@/apis/login";
export const useStore = defineStore("main", {
  // other options...
  state: () => {
    return {
      // 图标链接
      icon: "",
      // 目录
      menus: [],
      // 角色
      roles: [""],
      // 用户名
      username: "",
    };
  },
  // 不能使用箭头函数定义 actions 内的函数（会改变 this 指向）
  actions: {
    /**
     * 保存用户信息
     */
    setUserInfo(data: loginInfoRes) {
      // 一次性修改多条数据使用 $patch 有性能优化
      this.$patch((state) => {
        state.icon = data.icon;
        state.menus = data.menus;
        state.roles = data.roles;
        state.username = data.username;
      });
    },
    /**
     * 获取用户信息并保存
     */

    async getAdminUserInfo() {
      // 获取用户信息
      const adminInfo = await getAdminInfo();
      // 保存用户信息到 pinia
      this.setUserInfo(adminInfo.data);
    },
  },

  // 类似计算属性 (有缓存功能)
  getters: {
    // 接收一个可选参数 state
    // 也可直接在函数体里使用 this,但这时 ts 无法自动判断函数返回值类型，需要手动确认
    newMenu(state) {
      return arr2Tree(state.menus, 0);
      // return this.username + 10;
    },
  },
});

// 创建，并挂载Pinia
export const initPinia = (app: App<Element>) => {
  app.use(createPinia());
};
