import { HttpStatus } from '../http-status.enum'
import { Request, Response, NextFunction } from 'express'
import Product from '../models/productModel'
import ErrorHandler from '../utils/errorHandler'
import { catchAsyncErrors } from '../middleware/catchAsyncErrors'
import ApiFeatures from '../utils/apifeatures'

// Create Product -- Admin
export const createProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    req.body.user = (req as any)?.user.id
    const product = await Product.create(req.body)

    res.status(HttpStatus.CREATED).json({
        success: true,
        product
    })
})
// Get All Product
export const getAllProducts = catchAsyncErrors(async (req: Request, res: Response) => {
    const resultPerPage = 8
    const productsCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query as any).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query
    const filteredProductsCount = products.length
    res.status(HttpStatus.OK).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
})

// Get All Product (Admin)
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()

    res.status(HttpStatus.OK).json({
        success: true,
        products,
    })
})

// Get Product Details
export const getProductDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)

    if (product == null) {
        next(new ErrorHandler('Product not found', HttpStatus.NOT_FOUND)); return
    }
    res.status(HttpStatus.OK).json({
        success: true,
        product,
    })
})

// update Product -- Admin
export const updateProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    let product = await Product.findById(req.params.id)
    if (product == null) {
        next(new ErrorHandler('Product not found', HttpStatus.NOT_FOUND)); return
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(HttpStatus.OK).json({
        success: true,
        product
    })
})

// Delete Product
export const deleteProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)

    if (product == null) {
        next(new ErrorHandler('Product not found', HttpStatus.NOT_FOUND)); return
    }
    await product.deleteOne()

    res.status(HttpStatus.OK).json({
        success: true,
        message: 'Product Deleted Successfully'
    })
})

// Create New Review or Update the review

export const createProductReview = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment, productId } = req.body

    interface Review {
        user: string
        name: string
        rating: number
        comment: string
    }

    const review: Review = {
        user: (req as any).user._id,
        name: (req as any).user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    if (product == null) {
        return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: 'Product not found',
        })
    }

    const isReviewed = product?.reviews.find(
        (rev) => (rev as any).user.toString() === (req as any).user._id.toString()
    )

    if (isReviewed != null) {
        product?.reviews.forEach((rev) => {
            if ((rev as any).user.toString() === (req as any).user._id.toString()) {
                rev.rating = rating
                rev.comment = comment
            }
        })
    } else {
        product?.reviews.push(review as any)
        product.numofReviews = product?.reviews.length
    }

    let avg = 0

    product?.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product?.save({ validateBeforeSave: false })

    res.status(HttpStatus.OK).json({
        success: true,
    })
})

// Get All Reviews of a product
export const getProductReviews = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.id)

    if (product == null) {
        next(new ErrorHandler('Product not found', HttpStatus.NOT_FOUND)); return
    }

    res.status(HttpStatus.OK).json({
        success: true,
        reviews: product.reviews,
    })
})

// Delete Review
export const deleteReview = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.productId)

    if (product == null) {
        next(new ErrorHandler('Product not found', HttpStatus.NOT_FOUND)); return
    }

    const reviews = product.reviews.filter(
        (rev) => (rev as any)._id.toString() !== (req as any).query.id.toString()
    )

    let avg = 0

    reviews.forEach((rev) => {
        avg += rev.rating
    })

    let ratings = 0

    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = avg / reviews.length
    }

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(HttpStatus.OK).json({
        success: true,
    })
})
