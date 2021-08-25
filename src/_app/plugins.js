const files = require.context("../plugins", true, /\.js$/);
const modules = [];

files.keys().forEach((key) => {
  const { alias = null, value, install = false } = files(key).default;
  modules.push({
    alias,
    value,
    install,
  });
});

const layouts = {
  install: (app) => {
    modules.forEach((m) => {
      if (m.install) {
        if (m.options) {
          app.use(m.value, m.options);
        } else {
          app.use(m.value);
        }
      }
      if (m.alias) {
        /* 使用 inject 引入 */
        // app.config.globalProperties[m.alias] = m.value;
        app.provide(m.alias, m.value);
      }
    });
  },
};

export default layouts;
