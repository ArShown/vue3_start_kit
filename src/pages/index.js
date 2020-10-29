const path = require("path");
const files = require.context(".", true, /\.vue$/);
const modules = [];
files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const name = path.normalize(key).toLowerCase().replace(".vue", "");
  let currentPath = "/" + name;
  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");
  /* /_id => /:id */
  currentPath = currentPath.replace(/\/_+/g, "/:");

  modules.push({
    path: currentPath,
    name: currentPath,
    component: () => import(`@/pages/${path.normalize(key)}`),
  });
});
export default modules;
