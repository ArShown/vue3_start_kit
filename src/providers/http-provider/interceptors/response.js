export default {
  install: (register) => {
    register.response.use((response) => {
      return response.data;
    });
  },
};
