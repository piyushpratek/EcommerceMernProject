import express from 'express'
import type { Application } from 'express'
import productRoutes from '../routes/productRoute'
import { errorHandler } from '../middleware/error'

const app: Application = express()

app.use(express.json()) // to accept json data

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})

// Route Imports
app.use('/api/v1', productRoutes)

// middleware for errors
app.use(errorHandler)

export default app
