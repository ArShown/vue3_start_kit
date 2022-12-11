// @ts-nocheck
const files = import.meta.glob("../pages/**/*.vue");
const defaults = import.meta.globEager("../pages/**/*.vue");
const modules = [];
for (let path in files) {
  const name = path.replace("../pages", "").toLowerCase().replace(".vue", "");
  let currentPath = name;
  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");
  /* /_id => /:id */
  currentPath = currentPath.replace(/\/_+/g, "/:");

  modules.push({
    path: currentPath,
    name: currentPath,
    meta: {
      layout: defaults[path].default.layout || "layout-default",
    },
    component: files[path],
  });
}

export default modules;
