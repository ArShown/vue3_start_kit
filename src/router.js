import { createRouter, createWebHashHistory } from "vue-router";
import { set, lensPath, map, pipe, toPairs, reduce, forEach, has } from "ramda";
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
const compileRoutes = () => {
  const invertRouteLayout = pipe(
    toPairs,
    reduce((obj, [key, values]) => {
      forEach((v) => (obj[v] = obj[v] || key), values);
      return obj;
    }, {})
  )(options.layouts);

  return map((obj) => {
    if (has(obj.path, invertRouteLayout))
      return set(
        lensPath(["meta", "layout"]),
        invertRouteLayout[obj.path],
        obj
      );
    return obj;
  })(pages);
};

const routes = [
  {
    path: "/",
    name: "default-path",
    redirect: { name: options.defaultPath },
  },
  ...compileRoutes(),
  {
    path: "/404",
    name: "not-found",
    meta: { layout: "error" },
    component: { template: null },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-match",
    redirect: { name: "not-found" },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
