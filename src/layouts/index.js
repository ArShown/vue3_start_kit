import Default from "./default";
import Empty from "./empty";
import Error from "./error";

const layouts = {
  install: (app) => {
    app.component("DefaultLayout", Default);
    app.component("EmptyLayout", Empty);
    app.component("ErrorLayout", Error);
  },
};

export default layouts;
