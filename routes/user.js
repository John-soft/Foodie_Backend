const router = require("express").Router();
const {
  getUser,
  deleteUser,
  verifyAccount,
  verifyPhone,
} = require("../controllers/userController");

router.get("/", getUser);
router.delete("/", deleteUser);
router.get("/verify/:otp", verifyAccount);
router.get("/verify_phone/:phone", verifyPhone);

module.exports = router;
