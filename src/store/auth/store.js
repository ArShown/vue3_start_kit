import { defineStore } from "pinia";
import { useHttpService } from "@/services/http-service";
import { useAlertService } from "@/services/alert-service";
import { useRouterService } from "@/services/router-service";
import { useWelcomStore } from "@/store/app/welcome-store";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userInfo: {},
  }),
  getters: {
    isLogin: (state) => "id" in state.userInfo,
  },
  actions: {
    async login() {
      const http = useHttpService();
      const router = useRouterService();
      const welcomStore = useWelcomStore();
      const res = await http.post("/login");
      if (res.code === 0) {
        this.userInfo = res.data;
        welcomStore.setMessageShown();
        router.push({ name: "default-path" });
      }
    },

    logout() {
      const alert = useAlertService();
      const router = useRouterService();
      this.$reset();
      alert.toast("登出成功");
      router.push({ name: "/login" });
    },
  },
});
