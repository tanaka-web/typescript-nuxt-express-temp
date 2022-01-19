import express from 'express'
import router from './router'

const app: express.Express = express()

// see:
// https://github.com/expressjs/session/blob/master/readme.md#cookiesecure
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true)
}

/*
do not setup also app.use(...) here
setup serverMiddleware in nuxt.config.js
https://github.com/nuxt/nuxt.js/issues/5119
*/
app.use('/', router)

module.exports = {
  path: '/api',
  handler: app
}
