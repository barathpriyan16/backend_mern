const Admin = require("../models/admin");
const bcrypt = require("bcrypt");


// Create Admin (POST /admin/create)
const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message
    });
  }
};


// Admin Login (POST /admin/login)
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};





const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.status(200).json({
      success: true,
      data: admins
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admins",
      error: error.message
    });
  }
};

module.exports = {
  createAdmin,
  adminLogin,
  getAllAdmins,
};