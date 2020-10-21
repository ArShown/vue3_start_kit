import { createApp } from "vue";
import App from "./App";
import router from "./router";
import layouts from "./layouts";
import plugins from "./plugins";
import store from "./store";

const app = createApp(App);
app.use(plugins);
app.use(layouts);
app.use(router);
app.use(store);
app.mount("#app");
