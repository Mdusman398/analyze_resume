const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const uploadAndExtract = require("../middleware/uploadMiddleware");

const {
  analyzeResume,
  getAnalysisHistory,
  getSingleAnalysis,
  updateAnalysis,
  deleteAnalysis,
} = require("../controllers/resumeController");

router.route("/analyze").post(protect, uploadAndExtract, analyzeResume);

router.route("/history").get(protect, getAnalysisHistory);

// CRUD Routes for Individual History Entry
router
  .route("/history/:id")
  .get(protect, getSingleAnalysis)
  .put(protect, updateAnalysis)
  .delete(protect, deleteAnalysis);

module.exports = router;
