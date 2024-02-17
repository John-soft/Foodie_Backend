const router = require("express").Router();

const {
  addProductToCart,
  decrementProductQty,
  removeCartItem,
  getCart,
  getCartCount,
} = require("../controllers/cartController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, addProductToCart);
router.get("/decrement/:id", verifyTokenAndAuthorization, decrementProductQty);
router.delete("/:id", verifyTokenAndAuthorization, removeCartItem);
router.get("/", verifyTokenAndAuthorization, getCart);
router.get("/count", verifyTokenAndAuthorization, getCartCount);

module.exports = router;
