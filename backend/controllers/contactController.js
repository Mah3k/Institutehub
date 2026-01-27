const Inquiry = require("../models/Inquiry");

// Submit Contact Message
const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "All fields required" });

    const inquiry = await Inquiry.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message sent", inquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// Get all inquiries
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

// Toggle read/unread
const toggleRead = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Not found" });

    inquiry.isRead = !inquiry.isRead;
    await inquiry.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
};

// Delete inquiry
const deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = { createInquiry, getAllInquiries, toggleRead, deleteInquiry };
