import {
  Response,
  Request,
  NextFunction,
} from 'express';

//This function is for unknown errors, it was taken directly from Mr. Mohemmed Elshafey repo
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(
    'A new Error has occured in your system'
  );
  console.log(err);
  res
    .status(400)
    .send(
      'Something Went Wrong! Try again later.'
    );
}
