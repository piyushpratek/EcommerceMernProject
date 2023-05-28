import { Request, Response, NextFunction } from 'express'

export const catchAsyncErrors = (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(theFunc(req, res, next)).catch(next)
}
