import { isAuthenticatedUser } from '../middleware/auth'
import express from 'express'
import { processPayment, sendStripeApiKey } from '../controllers/paymentController'

const router = express.Router()

router.route('/payment/process').post(isAuthenticatedUser, processPayment)

router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey)

export default router
