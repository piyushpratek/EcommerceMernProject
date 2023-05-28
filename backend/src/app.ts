import express from 'express'
import type { Application } from 'express'
import productRoute from '../routes/productRoute'
import { errorHandler } from '../middleware/error'
import userRoute from '../routes/userRoute'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(express.json()) // to accept json data
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})

// Route Imports
app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)

// middleware for errors
app.use(errorHandler)

export default app
