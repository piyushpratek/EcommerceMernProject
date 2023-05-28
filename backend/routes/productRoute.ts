import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController'
import { isAuthenticatedUser } from '../middleware/auth'

const router = express.Router()

router.route('/products').get(isAuthenticatedUser, getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

export default router
