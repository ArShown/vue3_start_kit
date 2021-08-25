const path = require("path");
const R = require("ramda");
const files = require.context("../store", true, /\.js$/);
let modules = {};

const setMouduleTree = (keyList, key, value) => {
  const [first, ...others] = keyList;
  if (others.length)
    return {
      [first]: {
        namespaced: true,
        modules: setMouduleTree(others, key, value),
      },
    };
  return {
    [first]: {
      namespaced: true,
      [key]: value,
    },
  };
};

files.keys().forEach((key) => {
  const filepaths = path.dirname(path.normalize(key)).toLowerCase().split("/");
  const filename = path.basename(key, ".js");
  const currentTree = setMouduleTree(filepaths, filename, files(key).default);
  modules = R.mergeDeepLeft(modules, currentTree);
});

export default modules;
