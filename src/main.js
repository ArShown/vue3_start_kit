import { createApp } from "vue";
import App from "./App";
import router from "./router";
import layouts from "./layouts";

const app = createApp(App);
app.use(layouts);
app.use(router);
app.mount("#app");
