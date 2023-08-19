import { Request, Response, NextFunction } from 'express'
import { catchAsyncErrors } from '../middleware/catchAsyncErrors'
import Stripe from 'stripe'
import { STRIPE_API_KEY, STRIPE_SECRET_KEY } from '../config/config'
import { HttpStatus } from '../http-status.enum'

const stripeSecretKey = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

export const processPayment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripeSecretKey.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: {
          company: 'Ecommerce',
        },
      })

      res.status(HttpStatus.OK).json({ success: true, client_secret: myPayment.client_secret })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Payment processing error' })
    }
  }
)

export const sendStripeApiKey = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(HttpStatus.OK).json({ stripeApiKey: STRIPE_API_KEY })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Stripe API key retrieval error' })
    }
  }
)
