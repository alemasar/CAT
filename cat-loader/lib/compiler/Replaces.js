"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Compiler = _interopRequireDefault(require("./Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Replaces = /*#__PURE__*/function () {
  function Replaces() {
    _classCallCheck(this, Replaces);
  }

  _createClass(Replaces, [{
    key: "replaceJson",
    value: function replaceJson(src, json) {
      return JSON.stringify(json);
    }
  }, {
    key: "replaceRoutes",
    value: function replaceRoutes(src, json, alias) {
      var routerKeys = Object.keys(json);
      var router = "";
      routerKeys.forEach(function (k) {
        router += "if (\"".concat(json[k].path, "\" === this.url.pathname){\n       const template = await import(`VIEWS/").concat(json[k].view, "`);");
        var view = fs.readFileSync(_path["default"].join(src + "/" + alias.VIEWS, "./" + json[k].view), "utf8").toString();
        router += _Compiler["default"].getTemplateImports(src, alias, view);
        router += "console.log(template.default);document.getElementById(\"app\").innerHTML = document.getElementById(\"app\").innerHTML + template.default;\n     }";
      });
      return router;
    }
  }]);

  return Replaces;
}();

var _default = Replaces;
exports["default"] = _default;