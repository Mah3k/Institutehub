const User = require("../models/User");
const Course = require("../models/Course");

// Enroll a student in a course
const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user.id; 
    const courseId = req.params.id;

    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }

    // Prevent duplicate enrollment
    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    student.enrolledCourses.push(courseId);
    await student.save();

    return res.status(200).json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Enrollment failed" });
  }
};

module.exports = { enrollCourse };
