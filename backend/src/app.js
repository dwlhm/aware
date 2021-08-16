require('dotenv').config()

const app = require('express')()
const helmet = require('helmet')
const cors = require('cors')

// keperluan untuk view engine markdown
const fs = require('fs')
const escapeHtml = require('escape-html')
const marked = require('marked')
const path = require('path')
const web = require('./router/web')

const logMiddleware = require('./middleware/log.middleware')
const resultMiddleware = require('./middleware/result.middleware')
const v1 = require('./router/v1')

app.use(cors())
app.use(require('express').json());
app.use(helmet())
app.options('*', cors())

app.use(logMiddleware)

app.use('/v1', v1)

app.use(resultMiddleware)

module.exports = app