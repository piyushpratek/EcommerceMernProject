import logger from './config/logger'
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME, PORT } from './config/config'
import connectDB from './config/database'
import app from './src/app'
import { v2 as cloudinary } from 'cloudinary'
// import cloudinary from 'cloudinary'

// Handling uncaught Exception
process.on('uncaughtException', (err: Error) => {
    logger.error(`Error: ${err.message}`)
    logger.info('Shutting down the server due to Uncaught Exception')
    process.exit(1)
})
void connectDB.connect()

// cloudinary.config({
//     cloud_name: CLOUDINARY_NAME,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET,
// })

const server = app.listen(PORT, () => {
    logger.success(`SERVER STARTED ON PORT ${PORT}`)
    logger.success(`HEALTH: http://localhost:${PORT}/api/health \n`)
})

// Unhandled Promise Rejection

process.on('unhandledRejection', (err: Error) => {
    logger.error(`Error: ${err.message}`)
    logger.info('Shutting down the server due to Unhandled Promise Rejection')

    server.close(() => {
        process.exit(1)
    })
})
