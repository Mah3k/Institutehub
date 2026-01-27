const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Get logged-in student's enrolled course
router.get("/me/courses", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "enrolledCourse", // singular in your schema
      "title description duration level fees"
    );

    if (!user.enrolledCourse) {
      return res.json({ message: "No active enrollment" });
    }

    res.json(user.enrolledCourse);
  } catch (err) {
    console.error("Fetch enrolled course error:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// Unenroll from course
router.delete("/courses/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.enrolledCourse || user.enrolledCourse.toString() !== req.params.id) {
      return res.status(400).json({ message: "You are not enrolled in this course" });
    }

    user.enrolledCourse = null;
    await user.save();

    res.json({ message: "Unenrolled successfully" });
  } catch (err) {
    console.error("Unenroll error:", err);
    res.status(500).json({ message: "Unenroll failed" });
  }
});

module.exports = router;
