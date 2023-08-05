import { Request, Response, NextFunction } from 'express'
import User, { UserDocument } from '../models/userModel'
import ErrorHandler from '../utils/errorHandler'
import { catchAsyncErrors } from '../middleware/catchAsyncErrors'
import sendToken from '../utils/jwtToken'
import sendEmail from '../utils/sendEmail'
import crypto from 'crypto'
import cloudinary from 'cloudinary'
import { HttpStatus } from '../http-status.enum'
import logger from '../config/logger'

// Register a User
export const registerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  })

  const { name, email, password } = req.body as UserDocument

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  })

  sendToken(user, HttpStatus.CREATED, res)
})

// Login User
export const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as UserDocument
  // checking if user has given password and email both
  if ((email === '') || (password === '')) {
    next(new ErrorHandler('Please Enter Email & Password', HttpStatus.BAD_REQUEST)); return
  }

  const user = await User.findOne({ email }).select('+password')

  if (user == null) {
    next(new ErrorHandler('Invalid email or password', HttpStatus.UNAUTHORIZED)); return
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    next(new ErrorHandler('Invalid email or password', HttpStatus.UNAUTHORIZED))
  }

  sendToken(user, HttpStatus.OK, res)
})

// Logout User
export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(HttpStatus.OK).json({
    success: true,
    message: 'Logged Out',
  })
})

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email })

  if (user == null) {
    next(new ErrorHandler('User not found', HttpStatus.NOT_FOUND)); return
  }
  // get resetpassword token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  // const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

  const protocol = req.protocol
  const host = req.get('host')
  let resetPasswordUrl = ''
  if ((protocol !== '') && (host != null)) {
    resetPasswordUrl = `${protocol}://${host}/password/reset/${resetToken}`
  } else {
    logger.info("Missing 'protocol' or 'host' in the request headers.")
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
  }

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Ecommerce Password Recovery',
      message,
    })

    res.status(HttpStatus.OK).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error: any) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    next(new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR))
  }
})

// Reset Password
export const resetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (user == null) {
    next(
      new ErrorHandler('Reset Password Token is invalid or has been expired', HttpStatus.BAD_REQUEST)
    ); return
  }

  if (req.body.password !== req.body.confirmPassword) {
    next(new ErrorHandler('Password does not match', HttpStatus.BAD_REQUEST)); return
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, HttpStatus.OK, res)
})

// Get User Detail
export const getUserDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById((req as any).user.id)

  res.status(HttpStatus.OK).json({
    success: true,
    user,
  })
})

// Update User password
export const updatePassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById((req as any).user.id).select('+password')

  const isPasswordMatched = await user?.comparePassword(req.body.oldPassword)

  if (isPasswordMatched === false) {
    next(new ErrorHandler('Old password is incorrect', HttpStatus.BAD_REQUEST)); return
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    next(new ErrorHandler('Password does not match', HttpStatus.BAD_REQUEST)); return
  }

  (user as any).password = req.body.newPassword

  await (user as any).save()

  sendToken(user as any, HttpStatus.OK, res)
})

// Update User Profile
export const updateProfile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }
  // we will add clodinary later

  // if (req.body.avatar !== '') {
  //   const user = await User.findById((req as any).user.id)

  //   const imageId = (user as any).avatar.public_id

  //   await cloudinary.v2.uploader.destroy(imageId)

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: 'avatars',
  //     width: 150,
  //     crop: 'scale',
  //   })

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   }
  // }

  const user = await User.findByIdAndUpdate((req as any).user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(HttpStatus.OK).json({
    success: true,
    user
  })
})

// Get all users (admin)
export const getAllUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find()

  res.status(HttpStatus.OK).json({
    success: true,
    users,
  })
})

// Get single user (admin)
export const getSingleUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)

  if (user == null) {
    next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, HttpStatus.BAD_REQUEST)
    ); return
  }

  res.status(HttpStatus.OK).json({
    success: true,
    user,
  })
})

// Update User Role -- Admin
export const updateUserRole = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(HttpStatus.OK).json({
    success: true,
  })
})

// Delete User -- Admin
export const deleteUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)

  if (user == null) {
    next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, HttpStatus.BAD_REQUEST)
    ); return
  }

  // const imageId = user.avatar.public_id

  // await cloudinary.v2.uploader.destroy(imageId)

  await user.deleteOne({ _id: user._id })

  res.status(HttpStatus.OK).json({
    success: true,
    message: 'User Deleted Successfully',
  })
})
