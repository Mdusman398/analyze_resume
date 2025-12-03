const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "..", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|docx|doc|txt/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Sirf PDF, DOCX, ya TXT files hi upload ki ja sakti hain."));
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

  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  const cleanupAndNext = (text) => {
    req.body.resumeText = text;

    fs.unlink(filePath, (err) => {
      if (err)
        console.error("Temporary file delete karne mein error aaya:", err);
    });
    next();
  };

  try {
    if (fileExtension === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      pdf(dataBuffer)
        .then((data) => {
          cleanupAndNext(data.text);
        })
        .catch((error) => {
          console.error("PDF Parsing Error:", error);
          res
            .status(500)
            .json({ message: "PDF file se text nikalne mein error aaya." });
        });
    } else if (fileExtension === ".docx" || fileExtension === ".doc") {
      mammoth
        .extractRawText({ path: filePath })
        .then((result) => {
          cleanupAndNext(result.value); // The raw text
        })
        .catch((error) => {
          console.error("DOCX Parsing Error:", error);
          res
            .status(500)
            .json({ message: "DOCX file se text nikalne mein error aaya." });
        });
    } else if (fileExtension === ".txt") {
      const text = fs.readFileSync(filePath, "utf8");
      cleanupAndNext(text);
    } else {
      res.status(400).json({ message: "Unsupported file format." });
    }
  } catch (error) {
    console.error("File Read/Process Error:", error);
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
