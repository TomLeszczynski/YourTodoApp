class ValidationError extends Error {}
class NotFoundError extends Error {}

function handleError(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json({
      message:
        "Something has gone wrong. We have internal server error, Please try again later",
    });
  }
}

module.exports = {
  handleError,
  ValidationError,
  NotFoundError,
};
