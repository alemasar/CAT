"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loaderUtils = require("loader-utils");

var fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Compiler = _interopRequireDefault(require("./compiler/Compiler"));

/* eslint-disable */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2["default"])(this, Router);
  }

  (0, _createClass2["default"])(Router, null, [{
    key: "getRouter",
    value: function getRouter(src, args) {
      var router = fs.readFileSync(_path["default"].join(__dirname, "../router/index.js"), "utf8").toString();
      return _Compiler["default"].compile(src, router, args);
    }
  }]);
  return Router;
}();

module.exports = function loader(input, map, meta) {
  var webpack = this;
  var options = (0, _loaderUtils.getOptions)(this) || {};
  var callback = this.async();
  var config_json = JSON.parse(input);
  webpack.clearDependencies();
  Router.getRouter(options.context, {
    json: config_json["cat-router"],
    alias: config_json["cat-config"]["components-alias"]
  }).then(function (code) {
    callback(null, code);
  });
  return;
};