const {login,register,getAllUsers,setAvatar,logOut,} = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", verifyToken, getAllUsers);
router.post("/setavatar/:id", verifyToken, setAvatar);
router.get("/logout/:id", verifyToken, logOut);

module.exports = router;