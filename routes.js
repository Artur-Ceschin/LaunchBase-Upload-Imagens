const express = require('express')
const routes = express.Router()
const data = require('./data')
const admin = require('./controllers/admin')
const starter = require('./controllers/starter')

routes.get('/', starter.redirect)

routes.get('/starter/index', starter.index)

routes.get('/starter/about', starter.about)

routes.get('/starter/recipies', starter.recipies)

routes.get('/starter/recipie-content/:id', starter.recipieContent)

// routes.get('/', function (req, res) {
//     return res.redirect('/admin')
// })
routes.get('/admin', admin.index)
routes.get('/admin/details/:id', admin.show)
routes.get('/admin/create', admin.create)
routes.get('/admin/:id/edit', admin.edit)


routes.post('/admin', admin.post)
routes.put('/admin', admin.put)
routes.delete('/admin', admin.delete)

module.exports = routes