const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const recipe = require('./app/controllers/recipe')
const chef = require('./app/controllers/chef')
const site = require('./app/controllers/site')
// const starter = require('./app/controllers/starter')

routes.get('/', site.index)

routes.get('/site/index', site.index)

routes.get('/site/about', site.about)

routes.get('/site/recipe', site.show)

routes.get('/site', site.show)

routes.get('/site/chefs', site.chef)

routes.get('/site/details/:id', recipe.show)

//RECIPE
routes.get('/admin', recipe.index)
routes.get('/admin/recipe', recipe.index)
routes.get('/admin/recipe/details/:id', recipe.show)
routes.get('/admin/recipe/create', recipe.create)
routes.get('/admin/recipe/:id/edit', recipe.edit)


routes.post('/recipe', multer.array('photos', 5), recipe.post)
routes.put('/recipe', multer.array('photos', 5), recipe.put)
routes.delete('/recipe', recipe.delete)


// CHEF
routes.get('/chef', chef.index)
routes.get('/admin/chef', chef.index)
routes.get('/admin/chef/create', chef.create)
routes.get('/admin/chef/details/:id', chef.show)
routes.get('/admin/chef/:id/edit', chef.edit)

routes.post('/chef', chef.post)
routes.put('/chef', chef.put)
routes.delete('/chef', chef.delete)

module.exports = routes