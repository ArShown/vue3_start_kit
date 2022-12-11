// @ts-nocheck
import { mergeDeepRight } from "ramda";
import pages from "./pages";

const createRoutes = (opts) => {
  const options = mergeDeepRight(
    {
      defaultPath: "/",
    },
    opts
  );

  const routes = [
    {
      path: "/",
      name: "default-path",
      redirect: { name: options.defaultPath },
    },
    ...pages,
    {
      path: "/404",
      name: "not-found",
      meta: { layout: "layout-error" },
      component: { template: null },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-match",
      redirect: { name: "not-found" },
    },
  ];

  return routes;
};

export default createRoutes;
