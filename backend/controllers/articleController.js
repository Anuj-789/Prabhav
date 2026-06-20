const Article = require("../models/Article");

// CREATE ARTICLE
const createArticle = async (req, res) => {
  try {
       console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { title, authorName, categoryId, content } = req.body;

const thumbnail = req.file ? req.file.path : "";

    if (!title || !authorName || !categoryId || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const article = await Article.create({
      title,
      authorName,
      categoryId,
      thumbnail,
      content
    });

    res.status(201).json(article);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ARTICLES
const getArticles = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.categoryId = category;
    }

    const articles = await Article.find(filter)
      .populate("categoryId")
      .sort({ createdAt: -1 });

    res.json(articles);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET SINGLE ARTICLE + VIEWS++
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.views += 1;
    await article.save();

    res.json(article);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ARTICLE
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ message: "Article deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD RATING
const addRating = async (req, res) => {
  try {
    const { rating } = req.body; // ✅ FIX HERE

    const numRating = Number(rating);

    if (!numRating || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.ratings.push({ value: numRating });

    const total = article.ratings.reduce(
      (acc, r) => acc + r.value,
      0
    );

   article.averageRating =
  Number((total / article.ratings.length).toFixed(1));

    await article.save();

    res.json({
      success: true,
      averageRating: article.averageRating,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateArticle = async (req, res) => {
  try {
    const { title, authorName, categoryId, content } = req.body;

    const updateData = {
      title,
      authorName,
      categoryId,
      content
    };

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  addRating,
   updateArticle 
};