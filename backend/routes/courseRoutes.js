const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses); // return array of courses
  } catch (err) {
    console.error("Fetch courses error:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// GET single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Fetch single course error:", err);
    res.status(500).json({ message: "Failed to fetch course" });
  }
});

// POST create course (admin only)
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    console.error("Create course error:", err);
    res.status(400).json({ message: "Course creation failed" });
  }
});

module.exports = router;
