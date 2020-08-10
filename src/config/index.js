import { merge } from 'lodash'
import { config } from 'dotenv'

config()
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  case 'production':
    envConfig = require('./prod').config
    break
  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)
