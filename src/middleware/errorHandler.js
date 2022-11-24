const errorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(400).send({ error: true, message: err?.message });
  }
};

module.exports = errorHandler;
