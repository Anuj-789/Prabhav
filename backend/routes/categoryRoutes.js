const express = require("express");

const {
  createCategory,
  getCategories,
  deleteCategory
} = require("../controllers/categoryController");

const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin only
router.post("/", protectAdmin, createCategory);
router.delete("/:id", protectAdmin, deleteCategory);

// Public
router.get("/", getCategories);

module.exports = router;