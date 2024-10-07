import { HttpCodes } from "../../constant/http-codes";
import { BusinessError } from "./business-error";

//Wrapper for situations where the user sent wronge input
export class InvalidParameter extends BusinessError {
  constructor(message: string, errorCode?: number) {
    super(message, HttpCodes.BadRequest, errorCode);
  }
}
