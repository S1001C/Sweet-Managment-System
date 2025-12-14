const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/role.middleware");

const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweet.controller");

// READ
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);

// USER ACTION
router.post("/:id/purchase", authMiddleware, purchaseSweet);

// ADMIN ACTIONS
router.post("/", authMiddleware, isAdmin, createSweet);
router.put("/:id", authMiddleware, isAdmin, updateSweet);
router.post("/:id/restock", authMiddleware, isAdmin, restockSweet);
router.delete("/:id", authMiddleware, isAdmin, deleteSweet);

module.exports = router;
