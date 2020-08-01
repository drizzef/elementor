const { body } = require("express-validator");
const { UserService } = require("../dal/services");
const { registerConstants } = require("./constants");

const { password, username } = registerConstants;

const registerValidation = [
  body("username")
    .isLength({ min: username.len.min, max: username.len.max })
    .isString()
    .custom(async (val) => {
      if (val) {
        const result = await UserService.isExist(val);
        if (result) {
          return Promise.reject(`Username already exist!`);
        }
        return Promise.resolve();
      }
    }),
  body("password")
    .isLength({ min: password.len.min, max: password.len.max })
    .isString(),
];

module.exports = { registerValidation };
