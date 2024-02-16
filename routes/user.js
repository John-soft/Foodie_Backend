const router = require("express").Router();
const {
  getUser,
  deleteUser,
  verifyAccount,
  verifyPhone,
} = require("../controllers/userController");

const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAuthorization, getUser);
router.delete("/", verifyTokenAndAuthorization, deleteUser);
router.get("/verify/:otp", verifyTokenAndAuthorization, verifyAccount);
router.get("/verify_phone/:phone", verifyTokenAndAuthorization, verifyPhone);

module.exports = router;
