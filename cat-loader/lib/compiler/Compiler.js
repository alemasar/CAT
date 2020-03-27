"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Replaces = _interopRequireDefault(require("./Replaces"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Compiler = /*#__PURE__*/function () {
  function Compiler() {
    _classCallCheck(this, Compiler);
  }

  _createClass(Compiler, null, [{
    key: "compile",
    value: function compile(src, file, args) {
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
              var replacementFunctions = new _Replaces["default"]();
              file = file.replace("/* ".concat(replacementComment, " */"), replacementFunctions[replacementFunction].apply(replacementFunctions, [src].concat(parametersArgs)));
            } else {
              var parameterNamePos = statement.indexOf("parametro", replacementCommentEnd + 8);
              parameterName = statement.substring(parameterNamePos + 9, statement.length).trim();

              var _replacementFunctions = new _Replaces["default"]();

              file = file.replace("/* ".concat(replacementComment, " */"), _replacementFunctions[replacementFunction](src, args[parameterName]));
            }
          }
        }
      });
      return file;
    }
  }, {
    key: "getComponentClass",
    value: function getComponentClass(componentTemplate) {
      console.log(componentTemplate);
      var templatePos = componentTemplate.indexOf("<template>");
      var stylePos = componentTemplate.indexOf("<style>");
      var styles = "";
      var stringTemplate = "";
      var finalStringTemplate = "";

      if (templatePos !== -1) {
        stringTemplate = componentTemplate.substring(templatePos, componentTemplate.indexOf("</template>")).replace("<template>", "");
      }

      if (stylePos !== -1) {
        styles = componentTemplate.substring(stylePos, componentTemplate.indexOf("</style>")).replace("<style>", "");
      }

      finalStringTemplate = "const template = document.createElement(\"template\");template.innerHTML =`<style>".concat(styles, "</style>").concat(stringTemplate, "`;");
      return finalStringTemplate;
    }
  }, {
    key: "writeFileSyncRecursive",
    value: function writeFileSyncRecursive(filename, content, charset) {
      //const file = path.normalize(filename);
      var fileSplit = filename.split('/').slice(1, -1);
      console.log(fileSplit);
      /*file.split('/').slice(0, -1).reduce((last, folder) => {
        let folderPath = last ? (last + '/' + folder) : folder;
        console.log("Directory: ",folderPath);
        if (!fs.accessSync(folderPath)) {
          console.log(folderPath);
          fs.mkdirSync(folderPath); 
        }
        return folderPath;
      });*/

      var currentPath = "";
      fileSplit.forEach(function (p) {
        currentPath += "/" + p; // console.log(currentPath)

        if (!fs.existsSync(_path["default"].normalize(currentPath))) {
          console.log(currentPath);
          fs.mkdirSync(currentPath);
        }
      }); // console.log(filename+'   '+fs.existsSync(path.normalize(filename)));

      fs.writeFileSync(filename, content, charset);
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
            var compiledComponent = Compiler.getComponentClass(component); //console.log(path.join(src + "/" + alias.COMPONENTS + "/lib", "./" + componentClass + ".js"));

            Compiler.writeFileSyncRecursive(_path["default"].join(src + "/" + alias.COMPONENTS + "/lib", "./" + componentClass + ".js"), compiledComponent + component, "utf8");
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