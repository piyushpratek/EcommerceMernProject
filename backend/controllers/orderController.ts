import { Request, Response, NextFunction } from 'express'

import ErrorHandler from '../utils/errorHandler'

import Order, { IOrder } from '../models/orderModel'
import mongoose from 'mongoose'
import { catchAsyncErrors } from '../middleware/catchAsyncErrors'
import Product from '../models/productModel'
import { HttpStatus } from '../http-status.enum'

// Create new Order
export const newOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const order: IOrder = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: (req as any).user._id,
    })

    res.status(HttpStatus.CREATED).json({
        success: true,
        order,
    })
})

// get Single Order
export const getSingleOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const order: IOrder | null = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (!order) {
        next(new ErrorHandler('Order not found with this Id', HttpStatus.NOT_FOUND)); return
    }

    res.status(HttpStatus.OK).json({
        success: true,
        order,
    })
})

// get logged in user  Orders
export const myOrders = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const orders: IOrder[] = await Order.find({ user: (req as any).user._id })

    res.status(HttpStatus.OK).json({
        success: true,
        orders,
    })
})

// get all Orders -- Admin
export const getAllOrders = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const orders: IOrder[] = await Order.find()

    let totalAmount = 0

    orders.forEach((order: IOrder) => {
        totalAmount += order.totalPrice
    })

    res.status(HttpStatus.OK).json({
        success: true,
        totalAmount,
        orders,
    })
})

// update Order Status -- Admin
export const updateOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const order: IOrder | null = await Order.findById(req.params.id)

    if (!order) {
        next(new ErrorHandler('Order not found with this Id', HttpStatus.NOT_FOUND)); return
    }

    if (order.orderStatus === 'Delivered') {
        next(new ErrorHandler('You have already delivered this order', HttpStatus.BAD_REQUEST)); return
    }

    if (req.body.status === 'Shipped') {
        for (const o of order.orderItems) {
            await updateStock(o.product, o.quantity)
        }
    }
    order.orderStatus = req.body.status

    if (req.body.status === 'Delivered') {
        order.deliveredAt = new Date()
    }

    await order.save({ validateBeforeSave: false })
    res.status(HttpStatus.OK).json({
        success: true,
    })
})

async function updateStock(id: mongoose.Schema.Types.ObjectId, quantity: number): Promise<void> {
    const product = await Product.findById(id)

    if (!product) {
        throw new ErrorHandler('Product not found with this Id', HttpStatus.NOT_FOUND)
    }

    product.Stock -= quantity

    await product.save({ validateBeforeSave: false })
}

// delete Order -- Admin
export const deleteOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const order: IOrder | null = await Order.findById(req.params.id)

    if (!order) {
        next(new ErrorHandler('Order not found with this Id', HttpStatus.NOT_FOUND)); return
    }

    await order.deleteOne({ _id: req.params.id })

    res.status(HttpStatus.OK).json({
        success: true,
    })
})
