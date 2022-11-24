const Joi = require("joi");

const createUserSchema = (payload) => {
  const schema = Joi.object().keys({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  });

  return schema.validate(payload);
};

const loginSchema = (payload) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(payload);
};

module.exports = { createUserSchema, loginSchema };
