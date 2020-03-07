const loader_utils = require("loader-utils");

module.exports = function(input) {
  const webpack = this;
  const callback = this.async();

  const config_string = loader_utils.stringifyRequest(webpack, input);
  console.log("CAT LOADER: ",this.request)
  webpack.clearDependencies();
  callback(null, "hola");
  return;
};