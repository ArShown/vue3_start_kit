import { createRouter, createWebHashHistory } from "vue-router";
import {
  findIndex,
  propEq,
  set,
  lensPath,
  map,
  pipe,
  toPairs,
  reduce,
  forEach,
  has,
} from "ramda";
import pages from "./pages";

const options = {
  defaultPath: "/home",
  layouts: {
    empty: ["/about"],
  },
};

/**
 * 轉換路由結構
 * 1. 寫入預設路徑
 * 2. 寫入 layout
 * @param {Array<Object>>} routes
 * @return {Array<Object>>}
 */
const compileRoutes = (routes) => {
  const defaultIndex = findIndex(propEq("path", options.defaultPath))(pages);
  if (defaultIndex < 0) throw new Error("找不到預設路由");
  const invertRouteLayout = pipe(
    toPairs,
    reduce((obj, [key, values]) => {
      forEach((v) => (obj[v] = obj[v] || key), values);
      return obj;
    }, {})
  )(options.layouts);

  const currentPages = pipe(
    set(lensPath([defaultIndex, "path"]), "/"),
    map((obj) => {
      if (has(obj.path, invertRouteLayout))
        return set(
          lensPath(["meta", "layout"]),
          invertRouteLayout[obj.path],
          obj
        );
      return obj;
    })
  )(pages);

  return [...currentPages, ...routes];
};

const routes = compileRoutes([
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    meta: { layout: "error" },
    component: { template: null },
  },
]);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 登入驗證
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

export default router;
