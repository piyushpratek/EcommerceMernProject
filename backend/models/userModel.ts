import mongoose, { Schema, Document, Model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  avatar: {
    public_id: string
    url: string
  }
  role: string
  createdAt: Date
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  getJWTToken: () => string
  comparePassword: (password: string) => Promise<boolean>
  getResetPasswordToken: () => string
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE!,
  })
}

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  return resetToken
}

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export default User
