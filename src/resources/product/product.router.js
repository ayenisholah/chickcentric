import { Router } from 'express'
import controllers from './product.controllers'

const router = Router()
const getManyRouter = Router()

getManyRouter.route('/').get(controllers.getMany)

// /api/product
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/product/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export { router, getManyRouter }
