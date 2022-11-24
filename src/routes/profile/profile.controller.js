const { Router } = require("express");
const asyncHandler = require("../../middleware/asyncHandler");
const { User } = require("../../models/user");

class ProfileController {
  static router;

  static getRouter() {
    this.router = Router();

    this.router.get("/", asyncHandler(this.getUserProfile));
    return this.router;
  }

  // protected endpoint
  static async getUserProfile(req, res) {
    const {
      user: { id },
    } = req;
    const user = await User.findById(id);

    res.status(200).send(user);
  }
}

module.exports = ProfileController;
