const { body, validationResult } = require("express-validator");

exports.createValidator = [
  // Validate and sanitize request body fields using express-validator middleware
  body("text")
    .notEmpty()
    .withMessage("Write a todo")
    .isLength({ min: 4, max: 200 })
    .withMessage("A todo must be between 4-200 characters."),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages[0] });
    }
    next(); // Proceed to the next middleware if no validation errors
  },
];
