import dotenv from 'dotenv'
import logger from './logger'

// NOTE: Always check if `NODE_ENV` before anything else
if (typeof process.env.NODE_ENV === 'undefined') {
  logger.error(
    'Please define Your `NODE_ENV` variable using `cross-env` in package.json file'
  )
  process.exit(1)
}

logger.success('NODE_ENV:', process.env.NODE_ENV)

let envPath: string | undefined

if (process.env.NODE_ENV === 'production') {
  envPath = '.env'
}

if (process.env.NODE_ENV === 'development') {
  envPath = '.env.development'
}

if (typeof envPath === 'undefined') {
  logger.error('Please use a valid value of NODE_ENV variable.')
  process.exit(1)
}

dotenv.config({ path: envPath })
if (typeof process.env.MONGO_URI === 'undefined') {
  logger.error('Please define MONGO_URI in your .env file.')
  process.exit(1)
}
if (typeof process.env.JWT_SECRET === 'undefined') {
  logger.error('Please define JWT_SECRET in your .env file.')
  process.exit(1)
}

if (typeof process.env.PORT === 'undefined') {
  logger.error('Please define PORT in your .env file.')
  process.exit(1)
}

if (typeof process.env.JWT_EXPIRE === 'undefined') {
  logger.error('Please define JWT EXPIRATION in your .env file.')
  process.exit(1)
}

if (typeof process.env.CLOUDINARY_NAME === 'undefined') {
  logger.error('Please define CLOUDINARY_NAME in your .env file.')
  process.exit(1)
}

if (typeof process.env.CLOUDINARY_API_KEY === 'undefined') {
  logger.error('Please define CLOUDINARY_API_KEY in your .env file.')
  process.exit(1)
}

if (typeof process.env.CLOUDINARY_API_SECRET === 'undefined') {
  logger.error('Please define CLOUDINARY_API_SECRET in your .env file.')
  process.exit(1)
}

if (typeof process.env.FRONTEND_URL === 'undefined') {
  logger.error('Please define FRONTEND_URL in your .env file.')
  process.exit(1)
}

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const NODE_ENV = process.env.NODE_ENV
export const PORT = Number(process.env.PORT)
export const JWT_EXPIRE = process.env.JWT_EXPIRE
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const FRONTEND_URL = process.env.FRONTEND_URL
