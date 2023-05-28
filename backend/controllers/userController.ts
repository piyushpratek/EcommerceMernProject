import { Request, Response, NextFunction } from 'express'
import User from '../models/userModel'
import ErrorHander from '../utils/errorHandler'
import { catchAsyncErrors } from '../middleware/catchAsyncErrors'

import sendToken from '../utils/jwtToken'
import sendEmail from '../utils/sendEmail'
import crypto from 'crypto'
import cloudinary from 'cloudinary'
import { HttpStatus } from '../http-status.enum'

// Register a User
export const registerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: 'avatars',
  //   width: 150,
  //   crop: 'scale',
  // })

  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this is a sample id',
      url: 'sample profile pic url',
      // public_id: myCloud.public_id,
      // url: myCloud.secure_url,
    },
  })

  sendToken(user, HttpStatus.CREATED, res)
})

// Login User
export const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  // checking if user has given pass and email both
  if (!email || !password) {
    next(new ErrorHander('Please Enter Email & Password', HttpStatus.BAD_REQUEST)); return
  }

  const user = await User.findOne({ email }).select('+password')

  if (user == null) {
    next(new ErrorHander('Invalid email or password', HttpStatus.UNAUTHORIZED)); return
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    next(new ErrorHander('Invalid email or password', HttpStatus.UNAUTHORIZED))
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
    next(new ErrorHander('User not found', 404)); return
  }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

  const message = `Your password reset token is:\n\n ${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Ecommerce Password Recovery',
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    next(new ErrorHander(error.message, 500))
  }
})

// Reset Password
export const resetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
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
      new ErrorHander('Reset Password Token is invalid or has been expired', 400)
    ); return
  }

  if (req.body.password !== req.body.confirmPassword) {
    next(new ErrorHander('Password does not match', 400)); return
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, 200, res)
})

// Get User Detail
export const getUserDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

// Update User password
export const updatePassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id).select('+password')

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    next(new ErrorHander('Old password is incorrect', 400)); return
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    next(new ErrorHander('Password does not match', 400)); return
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)
})

// Update User Profile
export const updateProfile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id)

    const imageId = user.avatar.public_id

    await cloudinary.v2.uploader.destroy(imageId)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    })

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})

// Get all users (admin)
export const getAllUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

// Get single user (admin)
export const getSingleUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)

  if (user == null) {
    next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, HttpStatus.BAD_REQUEST)
    ); return
  }

  res.status(200).json({
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

  res.status(200).json({
    success: true,
  })
})

// Delete User -- Admin
export const deleteUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)

  if (user == null) {
    next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    ); return
  }

  const imageId = user.avatar.public_id

  await cloudinary.v2.uploader.destroy(imageId)

  await user.deleteOne({ _id: user._id })

  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  })
})
