import ErrorHandler from '../lib/errorHandler';

export default function onError(err, req, res, next) {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || 'Internal Server Error';

  // if (err.name === 'ValidationError') {
  //   const message = Object.values(err.errors).map((value) => value.message);
  //   error = new ErrorHandler(message, 400);
  // }

  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
}
