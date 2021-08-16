const web = require('express').Router()

web.get('/', (req, res) => res.render(
			'index', 
			{ 
				'title': 'Beranda'	
			} 	
		))

module.exports = web