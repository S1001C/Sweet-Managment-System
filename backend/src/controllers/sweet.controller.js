const Sweet = require("../models/Sweet");
const mongoose = require("mongoose");

// CREATE
exports.createSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

// READ ALL
exports.getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
};

// SEARCH
exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query = {};

  if (name) query.name = new RegExp(name, "i");
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(query);
  res.status(200).json(sweets);
};

// UPDATE
exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.status(200).json(sweet);
};

// DELETE (ADMIN)
exports.deleteSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.status(200).json({ message: "Sweet deleted successfully" });
};
// PURCHASE
exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Sweet out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.status(200).json({
    message: "Sweet purchased successfully",
    sweet
  });
};

// RESTOCK (ADMIN)
exports.restockSweet = async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid restock quantity" });
  }

  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += quantity;
  await sweet.save();

  res.status(200).json({
    message: "Sweet restocked successfully",
    sweet
  });
};
