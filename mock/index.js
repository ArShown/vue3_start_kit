import Mock from "mockjs";
const path = require("path");
const files = require.context(".", true, /\.js$/);
let models = [];

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const data = require(`./${path.normalize(key)}`).default;
  models.push({
    filename: path.normalize(key).replace(".js", ""),
    data,
  });
});

models.forEach((model) => {
  Mock.mock(`/api/${model.filename}`, "get", model.data);
});

export default Mock;
