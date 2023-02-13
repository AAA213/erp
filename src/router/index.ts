import type { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { getToken } from "@/utils/token";
import { useStore } from "@/stores/counter";
// 不支持 () => import('./dir/foo.js'), 这种导入方式 （有时会报错）
// Vite官方文档说需要使用Glob 导入形式，然后看了一个Glob的文档，解决了这个问题。不能使用@
const modules = import.meta.glob("../views/**/**/*.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: modules["../views/login/LoginView.vue"],
  },
  {
    path: "/home",
    name: "home",
    component: modules["../views/home/HomeView.vue"],
  },
];

const router = createRouter({
  // 和 vue2 的模式相同
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();

  if (!getToken() && to.path !== "/login") {
    // 没有token的情况 跳转到登录页面
    next("/login");
  }
  if (getToken()) {
    // if (to.path === "/login" && from.path !== "/login") {
    //   // 有token,还要跳转到登录页,重定向到原本页面 (排除刚打开网页的情况)
    //   next(from);
    // }
    if (store.menus.length === 0) {
      // token 存在  && menu 为空 说明刷新
      await store.getAdminUserInfo();
      // 生成路由配置
      addRouter();
      // 因为这里是异步，所以不能直接 next()，此时 router.addRoute 添加的路由还没有添加进去
      // 重定向，再次进入前置路由守卫，第二次进入路由守卫时 动态添加的路由就添加完成了
      next(to.path);
    }
    if (from.path === "/login" && to.path === "/homePage") {
      // 首次登录成功的情况
      // 登录进入首页时，因为有 token,store.menus 所以不会进入上面的分支，动态加载路由
      addRouter();
      next("/index");
    }
  }

  next();
});

/**
 * 动态生成路由并载入
 * 仅支持两层
 */
function addRouter() {
  // 不能将 useStore() 放到 外部，因为注册router总比pinia先，
  const store = useStore();
  const newMenu = store.newMenu;
  for (const item of newMenu) {
    const routerItem: RouteRecordRaw = {
      path: `/${item.name}`,
      name: `${item.name}`,
      component: modules["../views/home/HomeView.vue"],
      redirect: `/${item.name}/${item.children[0].name}`,
      children: [],
    };

    for (const childrenItem of item.children) {
      routerItem.children.push({
        path: `${childrenItem.name}`,
        name: `${childrenItem.name}`,
        component:
          modules[
            "../views/" +
              item.name +
              "/" +
              childrenItem.name +
              "/" +
              childrenItem.name +
              "View.vue"
          ],
      });
    }
    // 动态添加路由
    router.addRoute(routerItem);
    // 动态添加首页
  }
  router.addRoute({
    path: "/",
    name: "homeView",
    component: modules["../views/home/HomeView.vue"],
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: modules["../views/index/indexView.vue"],
      },
    ],
  });
}
// 挂载路由的方法，为了模块化，使得 关于 router 的全在这个文件
export const initRouter = (app: App<Element>) => {
  app.use(router);
};
