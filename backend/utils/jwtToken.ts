import { Response } from 'express'
import { UserDocument } from '../models/userModel'

const sendToken = (
  user: UserDocument,
  statusCode: number,
  res: Response
): Response<any> => {
  const token = user.getJWTToken()

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  return res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      user,
      token,
    })
}

export default sendToken
