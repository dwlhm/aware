const { read } = require('../services/list.service')

module.exports = {
	read: async (req, res, next) => {

		res.body = {
			status: undefined,
			data: undefined
		}

		if (!req.query.type && req.query.type !== 'product') {
			res.body.status = 400
			next()
			return ''
		}

		await read().then(result => {

				console.log(result + 'i')
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