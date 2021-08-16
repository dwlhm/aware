const { write, read, deletes } = require('../services/product.service')
const cocoSsd = require('@tensorflow-models/coco-ssd')
const tfjs = require('@tensorflow/tfjs')
const base64ToImage = require('base64-to-image')
const randomString = require('random-string')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

module.exports = {
	write: async (req, res, next) => {

		console.log(req.body)

		if (!req.body.code || !req.body.cart) {
			req.body = undefined
		}

		res.body = {
			status: undefined,
			data: undefined
		}
		
		await write(req.body).then(result => {

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
	},
	read: async (req, res, next) => {
		
		res.body = {
			status: undefined,
			data: undefined
		}

		if (!req.query.qr) {
			res.body.status = 400
			next()
			return ''
		}

		await read(req.query.qr).then(result => {

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
	},
	recognition: async (req, res, next) => {
		console.log('hai')
		
		res.body = {
			status: undefined,
			data: undefined
		}

		if (!req.body.product) {
			res.body.status = 400
			next()
			return ''
		}


		let base64Data = req.body.product.replace(/^data:image\/png;base64,/, "")
		let fileName = uuidv4()
		
		try {

			let img = new Image(960, 480)
			img.src = req.body.product

			await cocoSsd.load()
				  .then(model => model.detect(img))
				  .then(predictions => console.log(predictions))

			console.log(info)
			res.body.status = 200
			res.body.data = info
		} catch(error) {
			console.log(error)
			res.body.status = 500
			next()
			return ''
		}

	},
	deletes: async (req, res, next) => {

		console.log('delete')

		res.body = {
			status: undefined,
			data: undefined
		}

		if (!req.query.qr || !req.query.cart) {
			console.log(req.query)
			res.body.status = 400
			next()
			return ''
		}

		let docs = {
			qr: req.query.qr,
			cart: req.query.cart
		}

		await deletes(docs).then(result => {

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
	},
}