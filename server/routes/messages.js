const { addMessage, getMessages } = require("../controllers/messageController");
const verifyToken = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/addmessage/", verifyToken, addMessage);
router.post("/getmessage/", verifyToken, getMessages);

module.exports = router;