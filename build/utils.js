"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRules = void 0;
var passwordRules = ['.{8,}', '[a-z]', '[A-Z]', '(?=\\W)(\\S)', '\\d'];
/*
Passwordrules:
Needs to be 8 Characters long
Needs to contain Upper and Lowercase characters
Needs to contain a special character
Needs to contain a digit
*/

exports.passwordRules = passwordRules;
//# sourceMappingURL=utils.js.map