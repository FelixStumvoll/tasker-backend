"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _parameterMiddleware = _interopRequireDefault(require("../middlewares/parameterMiddleware"));

var _user = require("../model/user");

var _jwtThen = _interopRequireDefault(require("jwt-then"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post('/login', (0, _parameterMiddleware.default)(['username', 'password']),
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var body, loginUser, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            body = req.body;
            _context.next = 4;
            return _user.userModel.findOne({
              username: body.username
            });

          case 4:
            loginUser = _context.sent;

            if (loginUser) {
              _context.next = 7;
              break;
            }

            throw {
              status: 401,
              message: 'Username or Password Incorrect'
            };

          case 7:
            _context.next = 9;
            return loginUser.comparePassword(body.password);

          case 9:
            if (_context.sent) {
              _context.next = 11;
              break;
            }

            throw {
              status: 401,
              message: 'Username or Password Incorrect'
            };

          case 11:
            _context.next = 13;
            return _jwtThen.default.sign({
              username: loginUser.username
            }, _config.signingSecret);

          case 13:
            token = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              bearer: token,
              user: loginUser.username
            }));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 17]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/register', (0, _parameterMiddleware.default)(['username', 'password']),
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var body, checkUser, newUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            body = req.body;
            _context2.next = 4;
            return _user.userModel.findOne({
              username: body.username
            });

          case 4:
            checkUser = _context2.sent;

            if (!checkUser) {
              _context2.next = 7;
              break;
            }

            throw {
              status: 400,
              message: 'Username already exists'
            };

          case 7:
            if (!_user.userModel.isPasswordValid(body.password)) {
              _context2.next = 9;
              break;
            }

            throw {
              status: 400,
              message: 'Password does not meet the requirements'
            };

          case 9:
            newUser = new _user.userModel({
              username: body.username
            });
            _context2.next = 12;
            return newUser.hashPassword(body.password);

          case 12:
            _context2.next = 14;
            return newUser.save();

          case 14:
            return _context2.abrupt("return", res.status(201).json({
              username: newUser.username,
              _id: newUser._id
            }));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 17]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;
//# sourceMappingURL=authController.js.map