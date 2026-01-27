const express = require("express");
const { submitInquiry } = require("../controllers/inquiryController");

const router = express.Router();

// POST /api/contact
router.post("/", submitInquiry);

module.exports = router;
