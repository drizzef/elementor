const { validationResult } = require('express-validator');

const validate = (validators) => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map((x) => x.msg) });
    }
    return next();
  },
];

module.exports = { validate };
