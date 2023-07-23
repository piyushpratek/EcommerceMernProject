import express from 'express'
import { createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductDetails, getProductReviews, updateProduct } from '../controllers/productController'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth'

const router = express.Router()

router.route('/products').get(getAllProducts)

router
    .route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router
    .route('/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview)

export default router
