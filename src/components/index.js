const path = require("path");
const files = require.context(".", true, /\.vue$/);
const modules = [];

const setHeadToUpperCase = (str) => {
  const head = str.substring(0, 1);
  const tail = str.substring(1);
  return head.toUpperCase() + tail;
};

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const filename = path.normalize(key).toLowerCase().replace(".vue", "");
  const componentName = filename.split("-").map(setHeadToUpperCase).join("");
  modules.push({
    filename,
    componentName,
    component: require(`@/components/${path.normalize(key)}`).default,
  });
});

const components = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default components;
