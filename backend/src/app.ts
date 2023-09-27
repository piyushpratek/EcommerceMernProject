import express from 'express'
import type { Application } from 'express'
import productRoute from '../routes/productRoute'
import { errorHandler } from '../middleware/error'
import userRoute from '../routes/userRoute'
import cookieParser from 'cookie-parser'
import orderRoute from '../routes/orderRoute'
import bodyParser from 'body-parser'
import paymentRoute from '../routes/paymentRoute'
import path from 'path'

const app: Application = express()

app.use(express.json()) // to accept json data
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})

// Route Imports
app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', orderRoute)
app.use('/api/v1', paymentRoute)

// middleware for errors
app.use(errorHandler)

// Render Code
if (process.env.USE_STATIC_BUILD === 'true') {
  const reactBuildPath = path.join('./react-static')
  const staticMiddleware = express.static(reactBuildPath)
  app.use(staticMiddleware)
  app.use('*', staticMiddleware)

  const assetsPath = path.join('./react-static/assets')
  app.use('/assets', express.static(assetsPath))
} else {
  // Redirect to /api/health
  app.use('*', (req, res) => {
    res.redirect('/api/health')
  })
}

export default app
