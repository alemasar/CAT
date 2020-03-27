"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loader;

var _loaderUtils = require("loader-utils");

var fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Compiler = _interopRequireDefault(require("./compiler/Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, null, [{
    key: "getRouter",
    value: function getRouter(src, args) {
      var router = fs.readFileSync(_path["default"].join(__dirname, "../router/index.js"), "utf8").toString();
      return _Compiler["default"].compile(src, router, args);
    }
  }]);

  return Router;
}();

function loader(input, map, meta) {
  var webpack = this;
  var options = (0, _loaderUtils.getOptions)(this) || {};
  var callback = this.async();
  var config_json = JSON.parse(input);
  webpack.clearDependencies();
  callback(null, Router.getRouter(options.context, {
    json: config_json["cat-router"],
    alias: config_json["cat-config"]["components-alias"]
  }));
}