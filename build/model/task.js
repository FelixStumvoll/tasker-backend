"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskModel = exports.taskSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var ObjectId = _mongoose.default.Schema.Types.ObjectId;
var taskSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  text: {
    type: Object,
    required: false
  },
  tags: {
    type: Array,
    required: false
  },
  dueDate: {
    type: String,
    required: false
  },
  userId: {
    type: ObjectId,
    required: true
  }
});
exports.taskSchema = taskSchema;

var taskModel = _mongoose.default.model('Task', taskSchema);

exports.taskModel = taskModel;
//# sourceMappingURL=task.js.map