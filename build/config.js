"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signingSecret = exports.saltRounds = exports.dbUrl = exports.port = void 0;
var port = 8000,
    dbUrl = 'mongodb://DBO:1malPasswort@ds125198.mlab.com:25198/auth_db',
    saltRounds = 10,
    signingSecret = '5|=]`J6@cLBjHDG)XXS0+X:}lZaeBJV^;f.7#;Pa3K4fC`+}$*:9PK&E/Nu)qmP';
exports.signingSecret = signingSecret;
exports.saltRounds = saltRounds;
exports.dbUrl = dbUrl;
exports.port = port;
//# sourceMappingURL=config.js.map