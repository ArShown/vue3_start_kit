// @ts-nocheck
import { createApp } from "vue";
import App from "@/App.vue";
import layouts from "@/_app/layouts";
import components from "@/_app/components";
import providers from "@/_app/providers";
import "@/assets/css/tailwind.css";
import "../mock";

const app = createApp(App);
app.use(layouts);
app.use(components);
app.use(providers);
app.mount("#app");
