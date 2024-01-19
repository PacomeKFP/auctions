const { AppBaseError } = require("../../../errors/base");
const { EErrorCodes } = require("../../../errors/codes");

class ControllerWrapper {
  constructor() {
    this.response = {};
    this.status = 100;
  }

  run(targetController) {
    return async (req, res) => {
      try {
        this.response = await targetController(req); //{data, status, message}
        this.status = this.response.status;
        this.response.status = "SUCCESS";
      } catch (error) {
        console.error(error);
        this.handle(error);
      } finally {
        res.status(this.status).send(this.response);
      }
    };
  }

  handle(error) {
    if (error.constructor && error.constructor.name === AppBaseError.name) {
      this.status = error.status;
      this.response = { ...error.responseBody() };
      return;
    }
    this.status = 400;
    this.response = {
      code: EErrorCodes.UNKNOWN_ERROR,
      message: "An error occured",
      e: error,
    };
  }
}

module.exports = { ControllerWrapper };
