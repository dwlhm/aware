const { read } = require('../services/cart.service')

module.exports = {
	read: async (req, res, next) => {

		console.log('cart')

		res.body = {
			status: undefined,
			data: undefined
		}
		
		await read(req.query.id).then(result => {
			console.log(result)

			if (result) {
				res.body.status = 200
				res.body.data = result
				next()
				return ''
			}

			res.body.status = 400
			next()

		})
	}
}