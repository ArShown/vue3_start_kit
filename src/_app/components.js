const path = require("path");
const files = require.context("../components", true, /\.vue$/);
const modules = [];

files.keys().forEach((key) => {
  const filename = path.normalize(key).toLowerCase().replace(".vue", "");
  modules.push({
    componentName: filename,
    component: files(key).default,
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
