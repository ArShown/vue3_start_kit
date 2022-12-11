/**
 * 將一串文字轉換成字首大寫
 * @param {string} str
 */
const headToUpperCase = (str) => {
  const head = str.substring(0, 1);
  const tail = str.substring(1);
  return head.toUpperCase() + tail.toLowerCase();
};

/**
 * kebab-case -> PascalCase
 */
const kebabToPascal = (kebabStr) =>
  kebabStr.split("-").map(headToUpperCase).join("");

/**
 * kebab-case -> camelCase
 */
const kebabToCamel = (kebabStr) => {
  const [head, ...tail] = kebabStr.split("-");
  return [head, ...tail.map(headToUpperCase)].join("");
};

/**
 *
 * @param {string} filePath
 *
 * ./path/to/my-file.ext
 * ->
 * ./path/to
 */
const getNormalize = (filePath) => {
  const paths = filePath.toLowerCase().split("/");
  return paths.slice(0, -1).join("/");
};

/**
 *
 * @param {string} filePath
 *
 * ./path/to/my-file.ext
 * ->
 * my-file
 */
const getFilename = (filePath) => {
  const paths = filePath.toLowerCase().split("/");
  return paths[paths.length - 1].split(".")[0];
};

export {
  headToUpperCase,
  kebabToPascal,
  kebabToCamel,
  getFilename,
  getNormalize,
};
