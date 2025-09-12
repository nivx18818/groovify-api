const handleError = (error, req, res, next) => {
  res.error(500, error.toString(), null, error);
};

module.exports = handleError;
