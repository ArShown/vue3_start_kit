import { slice, min } from "ramda";

const mutations = {
  insert(state, { data, currentPage, totalAmount, perPage = 10 }) {
    const fromIndex = (currentPage - 1) * perPage;
    const toIndex = min(totalAmount, currentPage * perPage);

    state.data = slice(fromIndex, toIndex, data);
    state.currentPage = currentPage;
    state.totalAmount = totalAmount;
    state.perPage = perPage;
  },
};

export default mutations;
