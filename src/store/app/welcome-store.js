import { defineStore } from "pinia";

export const useWelcomStore = defineStore("app-welcome", {
  state: () => ({
    isMessageShown: false,
  }),
  actions: {
    setMessageShown() {
      this.isMessageShown = true;
    },
  },
});
