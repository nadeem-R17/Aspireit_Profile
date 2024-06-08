const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");
const upload = require("../middleware/multerConfig.js");
const { authenticateJwt } = require("../middleware/auth.js");
const router = express.Router();

// Signup route
router.post("/signup", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    // Check if all fields are provided
    if (!firstname || !lastname || !username || !password || !req.file) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      profilePhoto: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Create and send JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

      res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if all fields are provided
    if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

      res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update Profile details
router.put("/profile", authenticateJwt, upload.single("profilePhoto"), async (req, res) => {
    try {
      const { firstname, lastname } = req.body;
      const { id } = req.user; // Get user ID from token

      // Find user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update user details
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (req.file) {
        user.profilePhoto = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      // Save updated user to database
      const updatedUser = await user.save();

      res.json({
        user: {
          id: updatedUser._id,
          firstname: updatedUser.firstname,
          lastname: updatedUser.lastname,
          username: updatedUser.username,
          profilePhoto: updatedUser.profilePhoto,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// get profile details
router.get("/profile", authenticateJwt, async (req, res) => {
  try {
    const { id } = req.user; // Get user ID from token

    // Find user by ID
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
      res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
