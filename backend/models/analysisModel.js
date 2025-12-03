const mongoose = require("mongoose");

const analysisSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "myusers",
    },
    jobTitle: {
      type: String,
      required: [true, "Please add a job title"],
      trim: true,
    },

    customScore: {
      type: Number,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    resumeText: {
      type: String,
      required: true,
    },

    suggestions: {
      type: [String],
    },

    jobMatchDetails: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

analysisSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Analysis", analysisSchema);
