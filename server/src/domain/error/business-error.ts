import { HttpCodes } from "../../constant/http-codes";

//Wrapper for business related errors
export class BusinessError extends Error {
  constructor(
    public message: string = "Something went wrong!",
    public status: number = HttpCodes.InternalServerError,
    public businessErrorCode: number = 0
  ) {
    super(message);
    this.name = this.constructor.name;

    if (message) {
      this.message = message;
    }

    if (status) {
      this.status = status;
    }

    if (businessErrorCode) {
      this.businessErrorCode = businessErrorCode;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
