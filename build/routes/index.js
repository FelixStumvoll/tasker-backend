"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _taskController = _interopRequireDefault(require("./taskController"));

var _authController = _interopRequireDefault(require("./authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use('/task', _taskController.default);
router.use('/auth', _authController.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map