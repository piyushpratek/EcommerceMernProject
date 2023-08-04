import express from 'express'
import type { Application } from 'express'
import productRoute from '../routes/productRoute'
import { errorHandler } from '../middleware/error'
import userRoute from '../routes/userRoute'
import cookieParser from 'cookie-parser'
import orderRoute from '../routes/orderRoute'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

const app: Application = express()

app.use(express.json()) // to accept json data
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(fileUpload)

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})

// Route Imports
app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', orderRoute)

// middleware for errors
app.use(errorHandler)

export default app
