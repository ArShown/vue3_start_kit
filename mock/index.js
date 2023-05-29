import Mock from "mockjs";
const files = import.meta.globEager("./*.js");

for (let path in files) {
  const name = path.replace("./", "").toLowerCase().replace(".js", "");
  const apis = files[path].default;
  for (let api of apis) {
    const { path, method, response } = api;
    const currentPath = path === "/" ? name : `${name}/${path}`;
    Mock.mock(
      `${import.meta.env.VITE_API_URL}/${currentPath}`,
      method,
      response
    );
  }
}

export default Mock;
