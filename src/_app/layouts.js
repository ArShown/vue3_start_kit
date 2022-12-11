// @ts-nocheck
import { getFilename } from "./_rename";
const files = import.meta.globEager("../layouts/*.vue");
const modules = [];

for (let path in files) {
  const filename = getFilename(path);
  modules.push({
    componentName: filename,
    component: files[path].default,
  });
}

const layouts = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default layouts;
