const files = import.meta.globEager("../services/*.js");

const layouts = {
  install: (app) => {
    for (let path in files) {
      if (files[path].default && "install" in files[path].default) {
        app.use(files[path].default);
      }
    }
  },
};

export default layouts;
