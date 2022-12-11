const files = import.meta.globEager("../components/**/*.vue");
const modules = [];

for (let path in files) {
  const filename = path
    .replace("../components/", "")
    .toLowerCase()
    .replace("/", ".")
    .replace(".vue", "");
  modules.push({
    componentName: filename,
    component: files[path].default,
  });
}

const components = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default components;
