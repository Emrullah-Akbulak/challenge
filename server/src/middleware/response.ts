import { Response, Request, NextFunction } from "express";

//An api should have standarts for its input and outputs
//Before we send our response to the consumer, we wrap it in a standart style in here so that we have consistency accross our routes
export function response(req: Request, res: Response, next: NextFunction) {
  const send = res.send.bind(res);
  res.send = function (value: any) {
    if (typeof value == "object" && !value.isError) {
      return send({ isError: false, success: value, error: {} });
    }

    if (typeof value == "string" && !value.includes("{")) {
      return send({ isError: false, success: { message: value }, error: {} });
    }

    return send(value);
  };

  next();
}
