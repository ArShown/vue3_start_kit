import { defineService } from "@/_app/_define";
import { createRouter, createWebHashHistory } from "vue-router";
import createRoutes from "@/_app/routes";
import { useBreadcrumbStore } from "@/store/app/breadcrumb-store";
import { useAuthStore } from "@/store/auth/store";
import { path } from "ramda";

const options = {
  defaultPath: "/dashboard",
};

const router = createRouter({
  history: createWebHashHistory(
    import.meta.env.BASE_URL /* read from vite.config.js */
  ),
  routes: createRoutes(options),
});

router.beforeResolve(async (to, from, next) => {
  /* 分頁切換 */
  if (to.path === from.path) {
    next();
    return false;
  }

  /** 404 */
  if (to.name === "not-found") {
    next();
    return false;
  }

  /** hooks */
  const breadcrumbStore = useBreadcrumbStore();
  const authStore = useAuthStore();

  const { needAuth = true, breadcrumb = [] } = path(
    ["matched", 0, "components", "default"],
    to
  );

  /* 要身份驗證的頁面 */
  if (needAuth) {
    /**
     * 做些什麼...
     *
     * ex. 獲取個人資料、權限... 等等
     */

    /* 沒有登入就導向登入頁 */
    if (!authStore.isLogin) {
      next({ name: "/login" });
      return false;
    }
  }

  /* 寫入麵包屑 */
  breadcrumbStore.set(breadcrumb);

  next();
});

export const useRouterService = defineService("router-service", router);

export default router;
