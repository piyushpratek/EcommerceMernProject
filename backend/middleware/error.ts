import type {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from 'express'
import { NODE_ENV } from '../config/config'
import { HttpStatus } from '../http-status.enum'
import ErrorHandler from '../utils/errorHandler'
import logger from '../config/logger'

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // eslint-disable-next-line no-console
    logger.error('---Error Handler Middleware--:')
    // eslint-disable-next-line no-console
    console.log({ name: err.name, message: err.message })
    // eslint-disable-next-line no-console
    console.log('---Error Stack---', err.stack, '\n\n')
    const statusCode =
        res.statusCode === HttpStatus.OK
            ? HttpStatus.INTERNAL_SERVER_ERROR
            : res.statusCode

    // Wrong Mongodb Id error
    if (err.name === 'CastError') {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const message = `Resource not found. Invalid: ${(err as any).path}`
        err = new ErrorHandler(message, HttpStatus.BAD_REQUEST)
    }
    // Mongoose duplicate key error

    if ((err as any).code === 11000) {
        const keys = Object.keys((err as any).keyValue)
        const message = `Duplicate ${keys.join(', ')} Entered`
        err = new ErrorHandler(message, (err as any).keyValue, HttpStatus.BAD_REQUEST)
    }
    C
    if ((err as any).code === 'JsonWebTokenError') {
        const message = 'Json Web Token is invalid, Try again'
        err = new ErrorHandler(message, HttpStatus.BAD_REQUEST)
    }

    // JWT Expire Error

    if ((err as any).code === 'TokenExpireError') {
        const message = 'Json Web Token is Expired, Try again'
        err = new ErrorHandler(message, HttpStatus.BAD_REQUEST)
    }
    // handle any other error
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: NODE_ENV === 'production' ? null : err.stack,
    })
}
