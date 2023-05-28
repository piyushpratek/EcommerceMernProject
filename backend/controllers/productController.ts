import { HttpStatus } from '../http-status.enum'
import { Request, Response, NextFunction } from 'express'
import Product from '../models/productModel'
import ErrorHandler from '../utils/errorHandler'
import { catchAsyncErrors } from '../middleware/catchAsyncErrors'
import ApiFeatures from '../utils/apifeatures'

// Create Product -- Admin
export const createProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)

    res.status(HttpStatus.CREATED).json({
        success: true,
        product
    })
})
// Get All Product
export const getAllProducts = catchAsyncErrors(async (req: Request, res: Response) => {
    const resultPerPage = 5
    // const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query as any).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query
    res.status(HttpStatus.OK).json({
        success: true,
        products
    })
})

// Get Single Product Details
export const getProductDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)

    if (product == null) {
        next(new ErrorHandler('Product not found', HttpStatus.NOT_FOUND)); return
    }
    res.status(HttpStatus.OK).json({
        success: true,
        product,
        // productCount,
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
