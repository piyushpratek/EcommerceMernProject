import express from 'express'
import { createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductDetails, getProductReviews, updateProduct } from '../controllers/productController'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth'
import { uploadMulter } from '../utils/multerUtils'

const router = express.Router()

router.route('/products').get(getAllProducts)

router
    .route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
const maxAllowedImages = 10
router.route('/admin/product/new')
    .post(
        isAuthenticatedUser,
        uploadMulter.array('images', maxAllowedImages),
        authorizeRoles('admin'),
        createProduct
    )

router.route('/admin/product/:id').put(isAuthenticatedUser, uploadMulter.array('images', maxAllowedImages), authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router
    .route('/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview)

export default router
