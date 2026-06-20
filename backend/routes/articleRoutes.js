const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  addRating,
   updateArticle 
} = require("../controllers/articleController");

const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();


router.post(
  "/",
  protectAdmin,
  upload.single("thumbnail"),
  createArticle
);
router.delete("/:id", protectAdmin, deleteArticle);

// Public
router.get("/", getArticles);
router.get("/:id", getArticleById);

router.put(
  "/:id",
  protectAdmin,
  upload.single("thumbnail"),
  updateArticle
);

// Rating (public)
router.post("/:id/rate", addRating);

module.exports = router;