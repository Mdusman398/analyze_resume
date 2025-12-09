const multer = require("multer");
// const fs = require("fs");
const path = require("path");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = /txt/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = file.mimetype === "text/plain";

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Sirf TXT files hi upload ki ja sakti hain."));
    }
  },
}).single("resume");

const extractTextMiddleware = (req, res, next) => {
  if (!req.file) {
    if (req.body.resumeText && req.body.jobDescription) {
      return next();
    }
    return res
      .status(400)
      .json({ message: "Kripya CV file upload karein ya text paste karein." });
  }
  try {
    const resumeText = req.file.buffer.toString("utf8");

    req.body.resumeText = resumeText;

    next();
  } catch (error) {
    console.error("File Buffer Process Error:", error);
    res
      .status(500)
      .json({ message: "File processing mein internal server error aaya." });
  }
};

const uploadAndExtract = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `File upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    extractTextMiddleware(req, res, next);
  });
};

module.exports = uploadAndExtract;
