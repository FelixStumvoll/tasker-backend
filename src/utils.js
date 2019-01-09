let passwordRules = ['.{8,}', '[a-z]', '[A-Z]', '(?=\\W)(\\S)', '\\d'];

/*
Passwordrules:
Needs to be 8 Characters long
Needs to contain Upper and Lowercase characters
Needs to contain a special character
Needs to contain a digit
*/

export { passwordRules };
