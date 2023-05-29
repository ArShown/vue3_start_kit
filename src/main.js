import { createApp } from "vue";
import App from "@/App.vue";
import layouts from "@/_app/layouts";
import components from "@/_app/components";
import services from "@/_app/services";
import "@/assets/css/tailwind.css";
import "../mock";

const app = createApp(App);
app.use(services);
app.use(layouts);
app.use(components);
app.mount("#app");
