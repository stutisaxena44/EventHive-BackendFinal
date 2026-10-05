const { body, validationResult } = require("express-validator");

// Check validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }

  next();
};


// Event validation
const eventValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("date")
    .notEmpty()
    .withMessage("Date is required"),

  body("location")
    .notEmpty()
    .withMessage("Location is required")
];


module.exports = {
  validate,
  eventValidation
};