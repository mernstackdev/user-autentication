const { Router } = require("express");
const isUserAuthenticated = require("../middleware/auth");
const ProfileController = require("./profile/profile.controller");
const UserController = require("./user/user.controller");

const router = Router();

// routes
router.use("/users", UserController.getRouter());
router.use("/profile", isUserAuthenticated, ProfileController.getRouter());
module.exports = router;
