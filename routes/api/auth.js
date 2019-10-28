const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // check if the user already registered
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
    } catch (error) {}

    // get the use gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    const user = new User({
      name,
      email,
      avatar,
      password
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save user in the database
    await user.save();
    // return the jsonwebtoken to the client

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        return res.json(token);
      }
    );
  }
);

module.exports = router;
