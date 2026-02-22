const User = require("../models/User");
const Inquiry = require("../models/Inquiry");

/* ================================
   GET ALL STUDENTS
================================ */
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

/* ================================
   GET SINGLE STUDENT
================================ */
const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .select("-password")
      .populate("enrolledCourse", "title duration level fees");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch student" });
  }
};

/* ================================
   DELETE STUDENT
================================ */
const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete student" });
  }
};

/* ================================
   GET ALL INQUIRIES
================================ */
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

/* ================================
   DELETE INQUIRY
================================ */
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    await Inquiry.findByIdAndDelete(req.params.id);

    res.json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ================================
   MARK INQUIRY AS READ
================================ */
const markAsRead = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    inquiry.isRead = true;   // ✅ FIXED (matches your model)
    await inquiry.save();

    res.json({ message: "Inquiry marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update inquiry" });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  getAllInquiries,
  deleteInquiry,
  markAsRead,
};