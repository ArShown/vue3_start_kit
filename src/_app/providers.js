const files = import.meta.globEager("../services/*.js");

const layouts = {
  install: (app) => {
    for (let path in files) {
      app.use(files[path].default);
    }
  },
};

export default layouts;
