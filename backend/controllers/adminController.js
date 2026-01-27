const User = require("../models/User");
const Inquiry = require("../models/Inquiry");

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .populate("enrolledCourse", "title duration level fees");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Get single student
const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .select("-password")
      .populate("enrolledCourse", "title duration level fees");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch student" });
  }
};

// Get all inquiries
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

// Delete inquiry
const deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = { getAllStudents, getStudentById, getAllInquiries, deleteInquiry };
