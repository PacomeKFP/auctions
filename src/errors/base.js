class AppBaseError extends Error {
  static EErrorCodes = {
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INVALID_TOKEN_ERROR: "INVALID_TOKEN_ERROR",
    ACCESS_DENIED_ERROR: "ACCESS_DENIED_ERROR",
    RESOURCE_NOT_FOUND_ERROR: "RESOURCE_NOT_FOUND_ERROR",
    DATABASE_CONNECTION_ERROR: "DATABASE_CONNECTION_ERROR",
    UNAUTHENTICATED_USER_ERROR: "UNAUTHENTICATED_USER_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    BAD_REQUEST_ERROR: "BAD_REQUEST_ERROR",
  };
  constructor(code, message, status) {
    super(message);
    this.errorCode = code;
    this.errorMessage = message;
    this.status = status;
  }

  responseBody = () => ({
    code: this.errorCode,
    message: this.errorMessage,
  });
}

module.exports = { AppBaseError };
