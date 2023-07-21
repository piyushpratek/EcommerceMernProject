import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth'

const router = express.Router()

router.route('/products').get(getAllProducts)

router.route('admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)

router.route('admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/product/:id').get(getProductDetails)

export default router
