const cart = require('express').Router()
const { read } = require('../../controllers/cart.controller')

cart.get('/', read, (req, res, next) => {
	console.log('get')
	next()
})

module.exports = cart