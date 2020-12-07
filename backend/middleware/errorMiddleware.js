const notFound = (req, res, next) => {
  const error = new Error('url Not found');
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 2000 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === 'production' ? 'in Production mode' : err.stack,
  });
};

exports.notFound = notFound;
exports.errorHandler = errorHandler;
