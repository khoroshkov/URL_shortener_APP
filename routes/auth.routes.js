const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");
const router = Router();

const saltRounds = 10;

router.post(
  "/register",
  [
    check("email", "You entered incorrect email").isEmail(),
    check("password", "Minimum required 6 symbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect input during registration",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: "This email is already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "New user has been created" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Try again later" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter Your password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect input during login",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with this ${email} didn't found` });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "You entered incorrect email" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong at login" });
    }
  }
);

module.exports = router;
