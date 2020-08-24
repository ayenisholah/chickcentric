import { Router } from 'express'
import controllers from './product.controllers'

const productRouter = Router()
const getAllProductsRouter = Router()

getAllProductsRouter.route('/').get(controllers.getMany)

// /api/product
productRouter.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/product/:id
productRouter
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export { productRouter, getAllProductsRouter }
