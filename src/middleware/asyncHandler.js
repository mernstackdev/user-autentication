const asyncHandler = (routerFunction) => {
  return async (req, res, next) => {
    try {
      await routerFunction(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncHandler;
