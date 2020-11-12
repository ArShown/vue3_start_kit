process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  assetsDir: process.env.VUE_APP_STATIC_URL,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  publicPath: process.env.BASE_URL,
};
