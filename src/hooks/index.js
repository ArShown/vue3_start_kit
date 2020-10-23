const path = require("path");
const files = require.context(".", true, /\.js$/);
let plugins = [];

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const { plugin, options = {} } = require(`@/hooks/${path.normalize(
    key
  )}`).default;
  plugins.push({
    plugin,
    options,
  });
});

const hooks = {
  install: (app) => {
    plugins.forEach((m) => {
      app.use(m.plugin, m.options);
    });
  },
};

export default hooks;
