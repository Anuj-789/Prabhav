const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const createAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const password = "123456";

    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword
    });

    await admin.save();

    console.log("Admin created successfully");
    process.exit();

  } catch (err) {
    console.log("Error:", err);
    process.exit();
  }
};

createAdmin();