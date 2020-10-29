const path = require("path");
const files = require.context(".", true, /\.vue$/);
const modules = [];

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const filename = path.normalize(key).toLowerCase().replace(".vue", "");
  modules.push({
    filename,
    component: require(`@/layouts/${path.normalize(key)}`).default,
  });
});

const layouts = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(`${m.filename}-layout`, m.component);
    });
  },
};

export default layouts;
