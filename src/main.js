import { createApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "./App";
import build from "./_app";
import store from "./store";
import router from "./router";
import "@/assets/css/tailwind.css";
import "../mock";

const app = createApp(App);
build(app);
app.use(store);
app.use(router);
sync(store, router);
app.mount("#app");
