const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Article = require("../models/Article");
const Category = require("../models/Category");


// =====================
// 🔐 LOGIN ADMIN
// =====================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =====================
// 👤 GET PROFILE
// =====================
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =====================
// ✏️ UPDATE PROFILE
// =====================
const updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (email) {
      admin.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();

    res.json({
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        email: admin.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getDashboardStats = async (req, res) => {
  try {
    const articles = await Article.countDocuments();
    const categories = await Category.countDocuments();

    const viewsAgg = await Article.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" }
        }
      }
    ]);

    const ratingAgg = await Article.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$averageRating" }
        }
      }
    ]);

    res.json({
      articles,
      categories,
      views: viewsAgg[0]?.totalViews || 0,
      rating: Number(ratingAgg[0]?.avgRating || 0).toFixed(1)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAdmin,
  getProfile,
  updateProfile,
  getDashboardStats
};