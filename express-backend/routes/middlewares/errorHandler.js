function errorHandler(err, req, res, next, task = () => {}) {
  if (err) {
    task();
    let message = "";
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = "Internal Server Error";
    }
    console.error("An error occurred:", err);
    res.status(500).send({
      code: 500,
      message: message,
      data: null,
    });
  } else {
    next();
  }
}

module.exports = {
  errorHandler,
}