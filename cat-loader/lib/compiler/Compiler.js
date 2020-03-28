"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeSass = _interopRequireDefault(require("node-sass"));

var _Replaces = _interopRequireDefault(require("./Replaces"));

/* eslint-disable */
var Compiler = /*#__PURE__*/function () {
  function Compiler() {
    (0, _classCallCheck2["default"])(this, Compiler);
  }

  (0, _createClass2["default"])(Compiler, null, [{
    key: "compile",
    value: function () {
      var _compile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(src, file, args) {
        var fileArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, statement, replacementCommentEnd, replacementComment, replacementFunction, parameterName, parametersNamePos, parameterNamePos, replacementFunctions, replaceString;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fileArray = file.split("\n");
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = fileArray[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 32;
                  break;
                }

                line = _step.value;

                if (!(line.indexOf("/**") !== -1)) {
                  _context2.next = 29;
                  break;
                }

                statement = line.replace("/**", '').replace("**/", "").trim();
                replacementCommentEnd = statement.indexOf("ejecuta");
                replacementComment = "";
                replacementFunction = "";
                parameterName = "";

                if (!(replacementCommentEnd !== -1)) {
                  _context2.next = 29;
                  break;
                }

                replacementComment = statement.substring(0, replacementCommentEnd).trim();
                replacementFunction = statement.substring(replacementCommentEnd + 8, statement.indexOf(" ", replacementCommentEnd + 8));
                parametersNamePos = statement.indexOf("parametros", replacementCommentEnd + 8);

                if (!(parametersNamePos !== -1)) {
                  _context2.next = 22;
                  break;
                }

                return _context2.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var parameters, parametersName, parametersArgs, replacementFunctions, replaceString;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          parameters = statement.substring(parametersNamePos + 10, statement.length);
                          parametersName = parameters.split(",");
                          parametersArgs = [];
                          parametersName.forEach(function (p) {
                            parametersArgs.push(args[p.trim()]);
                          });
                          replacementFunctions = new _Replaces["default"]();
                          _context.next = 7;
                          return replacementFunctions[replacementFunction].apply(replacementFunctions, [src].concat(parametersArgs));

                        case 7:
                          replaceString = _context.sent;
                          file = file.replace("/* ".concat(replacementComment, " */"), replaceString);

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })(), "t0", 20);

              case 20:
                _context2.next = 29;
                break;

              case 22:
                parameterNamePos = statement.indexOf("parametro", replacementCommentEnd + 8);
                parameterName = statement.substring(parameterNamePos + 9, statement.length).trim();
                replacementFunctions = new _Replaces["default"]();
                _context2.next = 27;
                return replacementFunctions[replacementFunction](src, args[parameterName]);

              case 27:
                replaceString = _context2.sent;
                file = file.replace("/* ".concat(replacementComment, " */"), replaceString);

              case 29:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 32:
                _context2.next = 38;
                break;

              case 34:
                _context2.prev = 34;
                _context2.t1 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 38:
                _context2.prev = 38;
                _context2.prev = 39;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 41:
                _context2.prev = 41;

                if (!_didIteratorError) {
                  _context2.next = 44;
                  break;
                }

                throw _iteratorError;

              case 44:
                return _context2.finish(41);

              case 45:
                return _context2.finish(38);

              case 46:
                return _context2.abrupt("return", file);

              case 47:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 34, 38, 46], [39,, 41, 45]]);
      }));

      function compile(_x, _x2, _x3) {
        return _compile.apply(this, arguments);
      }

      return compile;
    }()
  }, {
    key: "getCss",
    value: function getCss(styles) {
      return new Promise(function (resolve, reject) {
        _nodeSass["default"].render({
          data: styles
        }, function (err, result) {
          var css = result.css.toString();
          /* this.searchImages(css, inputs.json.basePath, inputs.webpack)
           resolve(css);*/
          // console.log(css);

          resolve(css);
        });
      });
    }
  }, {
    key: "getComponentCss",
    value: function () {
      var _getComponentCss = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(componentTemplate) {
        var stylePos, styles, css;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                stylePos = componentTemplate.indexOf("<style>");
                styles = "";
                css = "";

                if (stylePos !== -1) {
                  styles = componentTemplate.substring(stylePos, componentTemplate.indexOf("</style>")).replace("<style>", "");
                  css = Compiler.getCss(styles);
                }

                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  resolve(css);
                }));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getComponentCss(_x4) {
        return _getComponentCss.apply(this, arguments);
      }

      return getComponentCss;
    }()
  }, {
    key: "getComponentTemplate",
    value: function getComponentTemplate(componentTemplate) {
      var templatePos = componentTemplate.indexOf("<template>");
      var stringTemplate = "";

      if (templatePos !== -1) {
        stringTemplate = componentTemplate.substring(templatePos, componentTemplate.indexOf("</template>")).replace("<template>", "");
      }

      return stringTemplate;
    }
  }, {
    key: "writeFileSyncRecursive",
    value: function writeFileSyncRecursive(filename, content, charset) {
      var fileSplit = filename.split('/').slice(1, -1);
      var currentPath = "";
      fileSplit.forEach(function (p) {
        currentPath += "/" + p;

        if (!fs.existsSync(_path["default"].normalize(currentPath))) {
          fs.mkdirSync(currentPath);
        }
      });
      fs.writeFileSync(filename, content, charset);
    }
  }, {
    key: "getCodeClass",
    value: function getCodeClass(code) {
      var classSplitted = code.split("\n");
      var copy = false;
      var classCode = "";
      classSplitted.forEach(function (line) {
        if (line.indexOf("class") === 0 || copy) {
          copy = true;
          classCode += "".concat(line, "\n");
        }
      });
      return classCode;
    }
  }, {
    key: "getTemplateImports",
    value: function () {
      var _getTemplateImports = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(src, alias, template) {
        var fileArray, finalStringTemplate, importingClass, imports, _i, _imports, importClass, component, css, classCode, stringTemplate;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                fileArray = template.split("\n");
                finalStringTemplate = "";
                importingClass = '';
                imports = [];
                fileArray.forEach(function (line) {
                  if (line.indexOf("<!--") !== -1) {
                    var statement = line.replace("<!--", '').replace("-->", "").trim();
                    var replacementCommentEnd = statement.indexOf("import");

                    if (replacementCommentEnd !== -1) {
                      imports.push(statement.split(" ")[1]);
                    }
                  }
                });
                console.log("start", imports);
                _i = 0, _imports = imports;

              case 7:
                if (!(_i < _imports.length)) {
                  _context4.next = 22;
                  break;
                }

                importClass = _imports[_i];
                component = fs.readFileSync(_path["default"].join(src + "/" + alias.COMPONENTS, "./" + importClass + ".js"), "utf8").toString();
                _context4.next = 12;
                return Compiler.getComponentCss(component);

              case 12:
                css = _context4.sent;
                classCode = Compiler.getCodeClass(component);
                stringTemplate = Compiler.getComponentTemplate(component);
                finalStringTemplate = "const template = document.createElement(\"template\");\n      template.innerHTML =`<style>\n      ".concat(css, "\n      </style>\n      ").concat(stringTemplate, "`;");
                console.log(finalStringTemplate);
                Compiler.writeFileSyncRecursive(_path["default"].join(src + "/" + alias.COMPONENTS + "/lib", "./" + importClass + ".js"), finalStringTemplate + "\n" + classCode, "utf8");
                importingClass += "instance.add(\"".concat(importClass, "\");");

              case 19:
                _i++;
                _context4.next = 7;
                break;

              case 22:
                console.log("end", imports);
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  resolve(importingClass);
                }));

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getTemplateImports(_x5, _x6, _x7) {
        return _getTemplateImports.apply(this, arguments);
      }

      return getTemplateImports;
    }()
  }]);
  return Compiler;
}();

var _default = Compiler;
exports["default"] = _default;