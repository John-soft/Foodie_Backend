const router = require("express").Router();
const {
  createAddress,
  getAddress,
  deleteAddress,
  setDefaultAddress,
  getDefaultAddress,
} = require("../controllers/addressController");

const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, createAddress);
router.get("/all", verifyTokenAndAuthorization, getAddress);
router.delete("/:id", verifyTokenAndAuthorization, deleteAddress);
router.patch("/default/:id", verifyTokenAndAuthorization, setDefaultAddress);
router.get("/default", verifyTokenAndAuthorization, getDefaultAddress);

module.exports = router;
