const { AppBaseError } = require("../../../errors/base");
const { EErrorCodes } = require("../../../errors/codes");

class ControllerWrapper {
  constructor() {
    this.repsonse = {};
    this.requestStatus = 100;
  }

  run(targetController) {
    return async (req, res) => {
      try {
        console.clear();
        this.response = await targetController(req); //{data, status, message}
        this.requestStatus = this.response.status;
        this.repsonse.status = "SUCCESS";
      } catch (error) {
        console.log(error);
        this.handle(error);
      } finally {
        res.status(this.requestStatus).send(this.response);
      }
    };
  }

  handle(error) {
    if (error.constructor && error.constructor.name === AppBaseError.name) {
      this.status = error.status;
      this.response = { ...error.responseBody() };
    }
    this.requestStatus = this;
    this.response = {
      code: EErrorCodes.UNKNOWN_ERROR,
      message: "An error occured",
      e: error,
    };
  }
}

module.exports = { ControllerWrapper };
