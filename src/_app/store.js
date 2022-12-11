// @ts-nocheck
import { getNormalize, getFilename } from "./_rename";
const files = import.meta.globEager("../store/**/*.js");
import * as R from "ramda";
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

for (let path in files) {
  const [, , ...paths] = getNormalize(path).split("/");
  const filepaths = [...paths, getFilename(path)];
  const currentTree = setMouduleTree(
    R.init(filepaths),
    R.last(filepaths),
    files[path].default
  );
  modules = R.mergeDeepLeft(modules, currentTree);
}

export default modules;
