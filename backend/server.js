require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const adminRoutes = require("./routes/adminRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const articleRoutes = require("./routes/articleRoutes.js");

const app = express();

// =====================
// CORS FIX (IMPORTANT)
// =====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS Not Allowed: " + origin));
      }
    },
    credentials: true,
  })
);

// =====================
// MIDDLEWARES
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================
// ROUTES
// =====================
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/article", articleRoutes);

// =====================
// DB + SERVER
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => console.log("DB Error:", err));