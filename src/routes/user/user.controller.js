const { Router } = require("express");
const passport = require("passport");
const asyncHandler = require("../../middleware/asyncHandler");
const joiErrorHandler = require("../../middleware/joiHandler");
const { User } = require("../../models/user");
const { generateHash, generateAuthToken } = require("../../utils/helpers");
const { createUserSchema, loginSchema } = require("./validationSchema");

class UserController {
  static router;

  static getRouter() {
    this.router = Router();

    this.router.post(
      "/",
      joiErrorHandler(createUserSchema),
      asyncHandler(this.createUser)
    );

    this.router.post(
      "/login",
      joiErrorHandler(loginSchema),
      asyncHandler(this.userLogin)
    );
    return this.router;
  }

  static async createUser(req, res) {
    const { body: userPayload } = req;

    let user = await User.findOne({ email: userPayload.email });

    if (user) {
      return res.status(400).send({
        error: true,
        message: "User already exist with same email address",
      });
    }
    userPayload.password = generateHash(userPayload.password);

    user = new User(userPayload);
    await user.save();

    delete userPayload.password;
    res.send({ success: true, user: userPayload });
  }

  static async userLogin(req, res, next) {
    return passport.authenticate(
      "local",
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error);
        }

        if (user) {
          const response = {
            id: user._id,
            username: user.userame,
            email: user.email,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
            token: generateAuthToken(user),
          };

          return res.status(200).send({ success: true, user: response });
        }
        return res.status(400).send({ error: true, message: info });
      }
    )(req, res, next);
  }
}

module.exports = UserController;
