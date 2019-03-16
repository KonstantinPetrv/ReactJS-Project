const authRoutes = require('../routes/auth')
const ordersRoutes = require('../routes/order')
const productRoutes = require('../routes/product')
const reviewRoutes = require('../routes/review')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/orders', ordersRoutes)
  app.use('/product', productRoutes)
  app.use('/review', reviewRoutes)
}
