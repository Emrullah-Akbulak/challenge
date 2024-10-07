import { Request, NextFunction, Response } from "express";
import { BusinessError } from "../domain/error/business-error";
import { HttpCodes } from "../constant/http-codes";

//An error handling middleware
//Its a pattern that I like to use where you throw errors from your endpoints and handle the error
//in central place so your api always follows the same structure for the errors
export function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { apiError, httpStatus } = getApiError(err, req);
  res.status(httpStatus).send(apiError);
}

function getApiError(err: Error, req: Request) {
  const apiError = {
    isError: true,
    success: {},
    error: {
      code: 0,
      message: "",
    },
  };

  let httpStatus: number = HttpCodes.InternalServerError;

  if (err && err instanceof BusinessError) {
    const thrownError: BusinessError = err as BusinessError;
    httpStatus = thrownError.status;

    const errorMessage = thrownError.message;
    const businessErrorCode = thrownError.businessErrorCode;

    apiError.error.code = businessErrorCode;
    apiError.error.message = errorMessage;

    return { apiError, httpStatus };
  }

  apiError.error.message = err.message;

  //If the environment is not development environment
  //strip the stacktrace from the error
  if (process.env.ENVIRONMENT != "dev") {
    apiError.error.message = "Something Went Wrong!";
  }

  return { apiError, httpStatus };
}
