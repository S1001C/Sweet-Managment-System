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
  restockSweet
} = require("../controllers/sweet.controller");

// create sweet
router.post("/", authMiddleware, createSweet);
// purchase sweet
router.post("/:id/purchase", authMiddleware, purchaseSweet);

// restock sweet (admin only)
router.post("/:id/restock", authMiddleware, isAdmin, restockSweet);

// get all sweets
router.get("/", authMiddleware, getAllSweets);

// search sweets
router.get("/search", authMiddleware, searchSweets);

// update sweet
router.put("/:id", authMiddleware, updateSweet);

// delete sweet (admin only)
router.delete("/:id", authMiddleware, isAdmin, deleteSweet);

module.exports = router;
