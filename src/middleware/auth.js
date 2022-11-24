const { verifyAuthToken } = require("../utils/helpers");

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }
  return null;
};

const isUserAuthenticated = (req, res, next) => {
  const token = getTokenFromHeaders(req);

  if (!token) {
    return res.status(401).send({
      error: true,
      message: "Access denied, no access token is provided",
    });
  }

  try {
    const isTokenValid = verifyAuthToken(token);

    if (isTokenValid) {
      req.user = isTokenValid;
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .send({ error: true, message: "Invalid Authentication Token!" });
  }
};

module.exports = isUserAuthenticated;
