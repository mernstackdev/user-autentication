const { Router } = require("express");
const passport = require("passport");
const asyncHandler = require("../../middleware/asyncHandler");
const joiErrorHandler = require("../../middleware/joiHandler");
const { User } = require("../../models/user");
const { emailSender } = require("../../utils/emailSender");
const {
  generateHash,
  generateAuthToken,
  generateActivationToken,
} = require("../../utils/helpers");
const { accountRegisterTemplate } = require("../../utils/templates");
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

    this.router.post("/activate", asyncHandler(this.activateAccount));
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
    user = await user.save();
    if (user._id) {
      const token = generateActivationToken({
        id: user._id,
        email: user.email,
      });

      user.accountActivationToken = token;
      await user.save();

      const emailContent = {
        receiver: "khizer.hayyat@datics.ai",
        subject: "Account Activation",
        content: accountRegisterTemplate({ username: user.username, token }),
      };
      await emailSender(emailContent);
    }

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

  static async activateAccount(req, res) {
    const {
      body: { token },
    } = req;

    const user = await User.findOne({ accountActivationToken: token });
    if (!user) {
      return res.status(404).send({
        error: true,
        message:
          "we are unable to found your account, please register with a valid email address if you haven't registered yet",
      });
    }

    (user.accountActivationToken = ""), (user.isActive = true);
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "Your account is activated now" });
  }
}

module.exports = UserController;
