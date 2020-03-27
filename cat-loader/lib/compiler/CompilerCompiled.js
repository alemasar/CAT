"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _ReplacesCompiled = _interopRequireDefault(require("./ReplacesCompiled"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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


var fs = require('fs');

var Compiler = /*#__PURE__*/function () {
  function Compiler() {
    _classCallCheck(this, Compiler);
  }

  _createClass(Compiler, null, [{
    key: "compile",
    value: function compile(src, file, args) {
      console.log(args);
      var fileArray = file.split("\n");
      fileArray.forEach(function (line) {
        if (line.indexOf("/**") !== -1) {
          var statement = line.replace("/**", '').replace("**/", "").trim();
          var replacementCommentEnd = statement.indexOf("ejecuta");
          var replacementComment = "";
          var replacementFunction = "";
          var parameterName = "";

          if (replacementCommentEnd !== -1) {
            replacementComment = statement.substring(0, replacementCommentEnd).trim();
            replacementFunction = statement.substring(replacementCommentEnd + 8, statement.indexOf(" ", replacementCommentEnd + 8));
            var parametersNamePos = statement.indexOf("parametros", replacementCommentEnd + 8);

            if (parametersNamePos !== -1) {
              var parameters = statement.substring(parametersNamePos + 10, statement.length);
              var parametersName = parameters.split(",");
              var parametersArgs = [];
              parametersName.forEach(function (p) {
                parametersArgs.push(args[p.trim()]);
              });
              var replacementFunctions = new _ReplacesCompiled["default"]();
              file = file.replace("/* ".concat(replacementComment, " */"), replacementFunctions[replacementFunction].apply(replacementFunctions, [src].concat(parametersArgs)));
            } else {
              var parameterNamePos = statement.indexOf("parametro", replacementCommentEnd + 8);
              parameterName = statement.substring(parameterNamePos + 9, statement.length).trim();

              var _replacementFunctions = new _ReplacesCompiled["default"]();

              file = file.replace("/* ".concat(replacementComment, " */"), _replacementFunctions[replacementFunction](src, args[parameterName]));
            }
          }

          console.log(file);
        }
      });
      return file;
    }
  }, {
    key: "getTemplateImports",
    value: function getTemplateImports(src, alias, template) {
      var fileArray = template.split("\n");
      var importClass = '';
      fileArray.forEach(function (line) {
        if (line.indexOf("<!--") !== -1) {
          var statement = line.replace("<!--", '').replace("-->", "").trim();
          var replacementCommentEnd = statement.indexOf("import");

          if (replacementCommentEnd !== -1) {
            var componentClass = statement.split(" ")[1];
            var component = fs.readFileSync(_path["default"].join(src + "/" + alias.COMPONENTS, "./" + componentClass + ".js"), "utf8").toString();
            importClass += "instance.add(\"".concat(componentClass, "\");");
          }
        }
      });
      return importClass;
    }
  }]);

  return Compiler;
}();

var _default = Compiler;
exports["default"] = _default;