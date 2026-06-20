const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authorName: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  thumbnail: {
    type: String
  },
  content: {
    type: String,
    required: true
  },

  views: {
    type: Number,
    default: 0
  },

  ratings: [
    {
      value: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  ],

  averageRating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;