import axios from "./axios";

const layouts = {
  install: (app) => {
    app.config.globalProperties[axios.alias] = axios.value;
  },
};

export default layouts;
