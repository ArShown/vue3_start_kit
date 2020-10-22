const path = require("path");
const files = require.context(".", true, /\.js$/);
const modules = [];

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const { alias, value } = require(`@/plugins/${path.normalize(key)}`).default;
  modules.push({
    alias,
    value,
  });
});

const layouts = {
  install: (app) => {
    modules.forEach((m) => {
      app.config.globalProperties[m.alias] = m.value;
    });
  },
};

export default layouts;
