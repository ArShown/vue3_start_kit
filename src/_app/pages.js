const path = require("path");
const files = require.context("../pages", true, /\.vue$/);
const modules = [];
files.keys().forEach((key) => {
  const name = path.normalize(key).toLowerCase().replace(".vue", "");
  let currentPath = "/" + name;
  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");
  /* /_id => /:id */
  currentPath = currentPath.replace(/\/_+/g, "/:");

  modules.push({
    path: currentPath,
    name: currentPath,
    meta: { layout: files(key).default.layout || "layout-default" },
    component: () => import(`@/pages/${path.normalize(key)}`),
  });
});
export default modules;
