"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status ? err.status : 500).send(err.message ? err.message : 'Internal Server Error');
};

exports.default = _default;
//# sourceMappingURL=exceptionMiddleware.js.map