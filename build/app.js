"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _config = require("./config");

var _routes = _interopRequireDefault(require("./routes"));

var _exceptionMiddleware = _interopRequireDefault(require("./middlewares/exceptionMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverPort = process.env.PORT || _config.port;
var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json()); // mongoose
//     .connect(
//         dbUrl,
//         { useNewUrlParser: true }
//     )
//     .catch(error => {
//         console.log(`Error connecting to Database: ${error}`);
//         return;
//     })
//     .then(() => {
//         console.log('connected to Database');
//
//     });

app.use((0, _cors.default)());
app.use('/api', _routes.default);
app.use(_exceptionMiddleware.default);
app.listen(serverPort, function () {
  console.log("Server Running on Port:".concat(serverPort));
});
//# sourceMappingURL=app.js.map