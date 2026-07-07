const {uploadController} = require("../controllers/cloudinaryController");
const verifyToken = require("../middleware/authMiddleware");

const router = require("express").Router();
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({storage});

router.post("/upload", verifyToken, upload.single('image'), uploadController);

module.exports = router;