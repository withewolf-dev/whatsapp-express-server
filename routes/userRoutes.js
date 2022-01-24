const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controller/userController");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/", allUsers);
module.exports = router;
