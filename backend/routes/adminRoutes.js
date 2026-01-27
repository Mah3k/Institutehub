const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getAllStudents, getStudentById, getAllInquiries, deleteInquiry } = require("../controllers/adminController");

const router = express.Router();

router.get("/students", auth, role("admin"), getAllStudents);
router.get("/students/:id", auth, role("admin"), getStudentById);

router.get("/inquiries", auth, role("admin"), getAllInquiries);
router.delete("/inquiries/:id", auth, role("admin"), deleteInquiry);

module.exports = router;
