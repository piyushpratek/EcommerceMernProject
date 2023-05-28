import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../utils/errorHandler'
import { catchAsyncErrors } from './catchAsyncErrors'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { HttpStatus } from '../http-status.enum'

export const isAuthenticatedUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies

  if (!token) {
    next(new ErrorHandler('Please Login to access this resource', HttpStatus.UNAUTHORIZED)); return
  }

  const decodedData: any = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodedData.id)

  next()
})

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      ); return
    }

    next()
  }
}
