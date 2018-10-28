class ApiError extends Error {

  constructor(message, status) {

    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
  }

  static from(error, status) {
    error.status = status;

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      if (error.errors.length > 0) {
        const validationError = error.errors[0];
        error.message = validationError.message;
      }
    }

    return error;
  }

}

module.exports = ApiError;
