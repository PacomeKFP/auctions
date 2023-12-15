class AppBaseError extends Error {
  constructor(code, message) {
    super(message);
    this.errorCode = code;
    this.errorMessage = message;
  }

  responseBody = () => ({
    code: this.errorCode,
    message: this.errorMessage,
  });
}

module.exports = { AppBaseError };
