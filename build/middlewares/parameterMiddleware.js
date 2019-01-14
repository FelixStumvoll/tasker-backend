"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(paramsArray) {
  return function (req, res, next) {
    var body = req.body;

    try {
      paramsArray.forEach(function (element) {
        if (!body[element]) {
          throw {
            status: 400,
            message: 'Parameter missing'
          };
        }
      });
      return next();
    } catch (ex) {
      return next(ex);
    }
  };
};

exports.default = _default;
//# sourceMappingURL=parameterMiddleware.js.map