const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    duration: {
      type: String,
    },

    level: {
      type: String,
    },

    fees: {
      type: Number,
    },

    image: {
      type: String,
      default: "https://via.placeholder.com/600x400",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
