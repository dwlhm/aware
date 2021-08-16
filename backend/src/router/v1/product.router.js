const product = require('express').Router()
const { write, read, recognition, deletes } = require('../../controllers/product.controller')

product.post('/', write, (req, res, next) => {
	
				console.log(res.body)
	next()
})

product.post('/recognition', recognition, (req, res, next) => {
	
				console.log(res.body)
	next()
})

product.get('/', read)

product.delete('/', deletes)

module.exports = product