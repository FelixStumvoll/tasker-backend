"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _task = require("../model/task");

var _parameterMiddleware = _interopRequireDefault(require("../middlewares/parameterMiddleware"));

var _authenticationMiddleware = _interopRequireDefault(require("../middlewares/authenticationMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/', _authenticationMiddleware.default,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, tasks;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            user = res.locals.user;
            _context.next = 4;
            return _task.taskModel.find({
              userId: user._id
            }, '_id title text tags dueDate');

          case 4:
            tasks = _context.sent;

            if (!(tasks === null)) {
              _context.next = 7;
              break;
            }

            throw {
              status: 404,
              message: 'no tasks found'
            };

          case 7:
            return _context.abrupt("return", res.json(tasks));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/', _authenticationMiddleware.default,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, newTask;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user = res.locals.user;
            newTask = new _task.taskModel({
              userId: user._id
            });
            _context2.next = 5;
            return newTask.save();

          case 5:
            return _context2.abrupt("return", res.status(201).json({
              task: {
                _id: newTask._id,
                tags: newTask.tags
              }
            }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 8]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.put('/:id', _authenticationMiddleware.default, (0, _parameterMiddleware.default)(['task']),
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var id, task, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            task = req.body.task;
            user = res.locals.user;
            _context3.next = 6;
            return _task.taskModel.updateOne({
              _id: id,
              userId: user._id
            }, task);

          case 6:
            return _context3.abrupt("return", res.status(200).send('Task updated'));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 9]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.delete('/:id', _authenticationMiddleware.default,
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            user = res.locals.user;
            _context4.next = 5;
            return _task.taskModel.deleteOne({
              _id: id,
              userId: user._id
            });

          case 5:
            return _context4.abrupt("return", res.status(200).send('Task deleted'));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 8]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;
//# sourceMappingURL=taskController.js.map