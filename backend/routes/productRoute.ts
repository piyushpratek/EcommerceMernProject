import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth'

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct).get(getProductDetails)

export default router
