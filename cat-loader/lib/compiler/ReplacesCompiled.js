"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/* eslint-disable */


var fs = require("fs");

var path = require("path");

var Compiler = require("./CompilerCompiled");

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
        var view = fs.readFileSync(path.join(src + "/" + alias.VIEWS, "./" + json[k].view), "utf8").toString();
        console.log(Compiler);
        router += Compiler.getTemplateImports(src, alias, view);
        router += "document.getElementById(\"app\").innerHTML = document.getElementById(\"app\").innerHTML + template.default;\n     }";
      });
      return router;
    }
  }]);

  return Replaces;
}();

var _default = Replaces;
exports["default"] = _default;