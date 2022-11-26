const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHash = (text) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

const compareHash = (rawText, hashText) =>
  bcrypt.compareSync(rawText, hashText);

const generateActivationToken = ({ id, email }) =>
  jwt.sign({ id, email }, process.env.JWT_EMAIL_SECRET_KEY);

const generateAuthToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1d" }
  );

const verifyAuthToken = (jwtToken) =>
  jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY);

module.exports = {
  compareHash,
  generateHash,
  verifyAuthToken,
  generateAuthToken,
  generateActivationToken,
};
