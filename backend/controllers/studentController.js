const User = require("../models/User");

exports.getMyCourses = async (req, res) => {
  try {
    const student = await User.findById(req.user._id)
      .populate("enrolledCourses");

    res.json(student.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: "Failed to load courses" });
  }
};

exports.unenrollCourse = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { enrolledCourses: req.params.courseId },
    });

    res.json({ message: "Unenrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unenroll" });
  }
};
