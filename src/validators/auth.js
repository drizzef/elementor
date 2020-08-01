const { body } = require('express-validator');
const { UserService } = require('../dal/services');
const { registerConstants } = require('./constants');

const { password, username } = registerConstants;

const registerValidation = [
  body('username')
    .isLength({ min: username.len.min, max: username.len.max })
    .isString()
    .custom(async (val) => {
      if (val) {
        const result = await UserService.isExist(val);
        if (result) throw new Error('Username already exist!');
        return Promise.resolve();
      }
      throw new Error('Username already exist!');
    }),
  body('password')
    .isLength({ min: password.len.min, max: password.len.max })
    .isString(),
];

module.exports = { registerValidation };
