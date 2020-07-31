const { body } = require("express-validator");
const { isExist } = require("../dal/services/user");
const registerValidation = [
  body("username")
    .isLength({ min: 4, max: 20 })
    .isString()
    .custom((val) => {
      if (isExist(val)) {
        return Promise.reject(`Username already exist!`);
      }
      return true;
    }),
  body("password").isLength({ min: 5, max: 16 }).isString(),
];

module.exports = { registerValidation };
