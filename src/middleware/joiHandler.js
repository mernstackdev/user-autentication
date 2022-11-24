const joiErrorHandler = (joiFunction) => {
  return (req, res, next) => {
    const { body: requestPayload } = req;

    const { error } = joiFunction(requestPayload);
    if (error) {
      return res
        .status(400)
        .send({ error: true, message: error.details[0].message });
    }
    next();
  };
};

module.exports = joiErrorHandler;
