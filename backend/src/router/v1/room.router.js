const room = require('express').Router()
const { read } = require('../../controllers/room.controller')

room.get('/', read)

module.exports = room