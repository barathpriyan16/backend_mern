const express = require("express");
const router = express.Router();

const {
  createAdmin,
  adminLogin,
  getAllAdmins
} = require("../controllers/admincontroller");

router.post("/create", createAdmin);

router.post("/login", adminLogin);

router.get("/", getAllAdmins);

module.exports = router;