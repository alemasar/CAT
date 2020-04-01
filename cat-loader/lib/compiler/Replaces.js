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

var _Compiler = _interopRequireDefault(require("./Compiler"));

/* eslint-disable */
var Replaces = /*#__PURE__*/function () {
  function Replaces() {
    (0, _classCallCheck2["default"])(this, Replaces);
  }

  (0, _createClass2["default"])(Replaces, [{
    key: "replaceJson",
    value: function replaceJson(src, json) {
      return new Promise(function (resolve, reject) {
        resolve(JSON.stringify(json));
      });
    }
  }, {
    key: "replaceRoutes",
    value: function () {
      var _replaceRoutes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(src, json, alias) {
        var routerKeys, router, _i, _routerKeys, k, view, route;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                routerKeys = Object.keys(json);
                router = "";
                _i = 0, _routerKeys = routerKeys;

              case 3:
                if (!(_i < _routerKeys.length)) {
                  _context.next = 15;
                  break;
                }

                k = _routerKeys[_i];
                router += "if (\"".concat(json[k].path, "\" === this.url.pathname){\n       const template = await import(`VIEWS/").concat(json[k].view, "`);");
                view = fs.readFileSync(_path["default"].join(src + "/" + alias.VIEWS, "./" + json[k].view), "utf8").toString();
                _context.next = 9;
                return _Compiler["default"].getTemplateImports(src, alias, view);

              case 9:
                route = _context.sent;
                router += route;
                router += "document.getElementById(\"app\").innerHTML = document.getElementById(\"app\").innerHTML + template.default;\n     }";

              case 12:
                _i++;
                _context.next = 3;
                break;

              case 15:
                ;
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  resolve(router);
                }));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function replaceRoutes(_x, _x2, _x3) {
        return _replaceRoutes.apply(this, arguments);
      }

      return replaceRoutes;
    }()
  }]);
  return Replaces;
}();

var _default = Replaces;
exports["default"] = _default;