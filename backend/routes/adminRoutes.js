const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAllStudents,
  getStudentById,
  getAllInquiries,
  deleteInquiry,
} = require("../controllers/adminController");

const router = express.Router();

// Get all students
router.get(
  "/students",
  auth,
  role("admin"),
  getAllStudents
);

// Get single student by ID
router.get(
  "/students/:id",
  auth,
  role("admin"),
  getStudentById
);

// Get all contact inquiries
router.get(
  "/inquiries",
  auth,
  role("admin"),
  getAllInquiries
);

// Delete inquiry
router.delete(
  "/inquiries/:id",
  auth,
  role("admin"),
  deleteInquiry
);

module.exports = router;