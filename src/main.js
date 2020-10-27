import { createApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "./App";
import components from "./components";
import router from "./router";
import layouts from "./layouts";
import plugins from "./plugins";
import store from "./store";
import hooks from "./hooks";

const app = createApp(App);
app.use(plugins);
app.use(hooks);
app.use(components);
app.use(layouts);
app.use(router);
app.use(store);
sync(store, router);
app.mount("#app");