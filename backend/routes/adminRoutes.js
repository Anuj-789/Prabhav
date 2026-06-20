const express = require("express");
const { loginAdmin, getProfile, updateProfile, getDashboardStats } = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 AUTH
router.post("/login", loginAdmin);

router.get("/dashboard", protectAdmin, getDashboardStats);
// 👤 PROFILE
router.get("/profile", protectAdmin, getProfile);
router.put("/profile", protectAdmin, updateProfile);



module.exports = router;