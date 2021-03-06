import express from 'express'
import * as Sentry from '@sentry/node'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import {
  getAllProductsRouter,
  productRouter,
} from './resources/product/product.router'

export const app = express()

Sentry.init({
  dsn:
    'https://b13b038bd62b4136ae0bcc5649dc1064@o434421.ingest.sentry.io/5391464',
})

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (_, res) =>
  res
    .status(200)
    .json({ status: 200, message: 'Welcome, the chick centric app awaits!' })
)

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api/products', getAllProductsRouter)

app.use('/api', protect)
app.use('/api/products', productRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(
        '\x1b[35m%s\x1b[0m',
        `Magic happening on http://localhost:${config.port}`
      )
    })
  } catch (e) {
    console.error(e)
  }
}
