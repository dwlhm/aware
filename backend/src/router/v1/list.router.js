const list = require('express').Router()
const { read } = require('../../controllers/list.controller')

list.get('/', read)

module.exports = list