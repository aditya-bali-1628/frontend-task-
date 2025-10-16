const { body } = require('express-validator');

exports.registerValidator = [
  body('name').isLength({ min: 2 }).withMessage('Name too short'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password required')
];

exports.noteValidator = [
  body('title').isLength({ min: 1 }).withMessage('Title is required'),
  body('content').optional().isString()
];
