import type { RouteRecordName, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/index.vue";
import LayoutView from "@/views/common/layout.vue";
import NotFoundView from "@/views/error/not-found.vue";
import NotAllowedView from "@/views/error/not-allowed.vue";
import { useAppStore } from "@/store";
import { PermissionEnum } from "@/config/permission.config";
import { usePermissionStore } from "@/store/permission";

declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, undefined> {
    permission?: string;
    icon?: string;
    title?: string;
  }
}

export const MENU_ROUTE_NAME = "menuRoot";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    redirect: "project",
    children: [
      {
        name: "project",
        path: "project",
        component: () => import("@/views/project/index.vue"),
        meta: {
          permission: PermissionEnum.PROJECT,
        },
      },
      {
        name: "prototype",
        path: "/project/:id/prototype",
        component: () => import("@/views/project/prototype.vue"),
        meta: {
          permission: PermissionEnum.PROJECT,
        },
      },
    ],
  },
  {
    name: "version-view",
    path: "/project/:id/prototype/:prototypeId/version/:versionId",
    component: () => import("@/views/project/version-detail.vue"),
    meta: {
      permission: PermissionEnum.PROJECT,
    },
  },
  { path: "/login", name: "login", component: LoginView },
  { path: "/403", name: "not-allowed", component: NotAllowedView },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

const whiteList: Array<RouteRecordName | undefined | null> = [
  "login",
  "not-found",
  "not-allowed",
];

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();

  if (!appStore.token) {
    whiteList.indexOf(to.name) !== -1
      ? next()
      : next(`/login?redirect=${to.path}`);
  }

  if (appStore.token && to.path === "/login") {
    next({ name: "dashboard" });
  }
  // 判断token是否存在，判断当前访问的域名是否合法；
  // 如果不合法，跳转至403页面
  if (to.name) {
    const permissionStore = usePermissionStore();
    const hasNoPermission = !permissionStore.permissionRouteNamesList.includes(
      to.name
    );
    appStore.token &&
      hasNoPermission &&
      whiteList.indexOf(to.name) !== -1 &&
      next({ name: "not-allowed" });
  }
  next();
});

export default router;
