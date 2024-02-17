class customeError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status =
      statusCode >= 400 || statusCode <= 500
        ? "operationfailedcustome"
        : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.message);
  }
};
module.exports = customeError;
