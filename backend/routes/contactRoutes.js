const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createInquiry,
  getAllInquiries,
  toggleRead,
  deleteInquiry,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createInquiry);
router.get("/", auth, role("admin"), getAllInquiries);
router.patch("/:id/read", auth, role("admin"), toggleRead);
router.delete("/:id", auth, role("admin"), deleteInquiry);

module.exports = router;
