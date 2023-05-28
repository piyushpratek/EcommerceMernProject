import { NextFunction, Response } from 'express'
import ErrorHandler from '../utils/errorHandler'
import { catchAsyncErrors } from './catchAsyncErrors'
import jwt from 'jsonwebtoken'
import User, { UserDocument } from '../models/userModel'
import { HttpStatus } from '../http-status.enum'
import { JWT_SECRET } from '../config/config'
import { CustomRequest } from '../types'

interface cookiesType {
  token: string
}

export const isAuthenticatedUser = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies as cookiesType

  // eslint-disable-next-line no-extra-boolean-cast
  if (!Boolean(token)) {
    next(new ErrorHandler('Please Login to access this resource', HttpStatus.UNAUTHORIZED)); return
  }

  const decodedData: any = jwt.verify(token, JWT_SECRET)

  req.user = await User.findById(decodedData.id) as UserDocument

  next()
})

export const authorizeRoles = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role ?? '')) {
      next(
        new ErrorHandler(
          `Role: ${req?.user?.role ?? ''} is not allowed to access this resource`,
          HttpStatus.FORBIDDEN
        )
      ); return
    }

    next()
  }
}
