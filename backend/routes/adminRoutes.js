const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAllStudents,
  getStudentById,
  deleteStudent,          // ✅ ADD
  getAllInquiries,
  deleteInquiry,
  markAsRead,             // ✅ ADD
} = require("../controllers/adminController");

const router = express.Router();

/* ---------------- STUDENTS ---------------- */

// Get all students
router.get("/students", auth, role("admin"), getAllStudents);

// Get single student
router.get("/students/:id", auth, role("admin"), getStudentById);

// ✅ Delete student
router.delete("/students/:id", auth, role("admin"), deleteStudent);


/* ---------------- INQUIRIES ---------------- */

// Get all inquiries
router.get("/inquiries", auth, role("admin"), getAllInquiries);

// Delete inquiry
router.delete("/inquiries/:id", auth, role("admin"), deleteInquiry);

// ✅ Mark inquiry as read
router.put("/inquiries/:id/read", auth, role("admin"), markAsRead);

module.exports = router;