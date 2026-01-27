const express = require("express");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Course = require("../models/Course");

const router = express.Router();

// Enroll
router.post("/enroll/:courseId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== "student") return res.status(403).json({ message: "Only students can enroll" });
    if (user.enrolledCourse) return res.status(400).json({ message: "Already enrolled in a course" });

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    user.enrolledCourse = course._id;
    await user.save();

    res.json({ message: "Enrollment successful", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

// Unenroll
router.post("/unenroll", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.enrolledCourse) return res.status(400).json({ message: "No active enrollment" });

    user.enrolledCourse = null;
    await user.save();

    res.json({ message: "Unenrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unenroll failed" });
  }
});

module.exports = router;
