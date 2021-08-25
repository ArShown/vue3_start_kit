import components from "./components";
import layouts from "./layouts";
import plugins from "./plugins";

export default (app) => {
  app.use(plugins);
  app.use(components);
  app.use(layouts);
};
