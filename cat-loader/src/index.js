/* eslint-disable */
import { getOptions, isUrlRequest } from 'loader-utils';
import * as fs from 'fs';
import path from "path";
import Compiler from "./compiler/Compiler";

class Router {
  static getRouter(src, args) {
    let router = fs.readFileSync(path.join(__dirname, "../router/index.js"), "utf8").toString();
    return Compiler.compile(src, router, args);
  }
}

module.exports = function loader(input, map, meta) {
  const webpack = this;
  const options = getOptions(this) || {};
  const callback = this.async();
  const config_json = JSON.parse(input);

  webpack.clearDependencies();
  Router.getRouter(options.context, { json: config_json["cat-router"], alias: config_json["cat-config"]["components-alias"] }).then(code=>{
    callback (null, code);
  });
  return;
}
