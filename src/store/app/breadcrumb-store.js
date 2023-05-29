import { defineStore } from "pinia";

export const useBreadcrumbStore = defineStore("app-breadcrumb", {
  state: () => ({
    breadcrumbs: [],
  }),
  actions: {
    set(values) {
      this.breadcrumbs = values;
    },
  },
});
