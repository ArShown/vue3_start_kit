import { defineStore } from "pinia";
import { useHttpService } from "@/services/http-service";
import { slice, min } from "ramda";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    data: [],
    currentPage: 1,
    totalAmount: 0,
    perPage: 10,
  }),
  actions: {
    async read(page) {
      const http = useHttpService();
      const res = await http.get("/posts");
      if (res.code === 0) {
        const data = res.data;
        const currentPage = page;
        const totalAmount = data.length;
        const fromIndex = (currentPage - 1) * this.perPage;
        const toIndex = min(totalAmount, currentPage * this.perPage);

        this.data = slice(fromIndex, toIndex, data);
        this.currentPage = currentPage;
        this.totalAmount = totalAmount;
      }
    },
  },
});
