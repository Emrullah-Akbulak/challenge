import { HttpCodes } from "../../constant/http-codes";
import { BusinessError } from "./business-error";

export class NotFound extends BusinessError {
  constructor(message: string, errorCode?: number) {
    super(message, HttpCodes.NotFound, errorCode);
  }
}
