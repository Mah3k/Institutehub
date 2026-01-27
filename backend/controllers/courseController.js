const Course = require("../models/Course");

// Get all courses
exports.getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// Get single course
exports.getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};
