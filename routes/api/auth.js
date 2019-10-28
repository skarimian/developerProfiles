const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route POST api/users
// @desc User routes
// @access Public

router.post(
  "/",
  [
    check("name", "Please enter a name")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a valid password with at least 6 charectors"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors });
    }
    res.send("Auth route");
  }
);

module.exports = router;
