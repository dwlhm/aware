const v1 = require('express').Router()
const cart = require('./cart.router')
const list = require('./list.router')
const product = require('./product.router')
const room = require('./room.router')

v1.use('/cart', cart)
v1.use('/product', product)
v1.use('/list', list)
v1.use('/room', room)

module.exports = v1