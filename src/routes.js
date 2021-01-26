const express = require('express')
const routes = express.Router()
const recipe = require('./app/controllers/recipe')
const chef = require('./app/controllers/chef')
// const starter = require('./app/controllers/starter')

// routes.get('/', starter.redirect)

// routes.get('/starter/index', starter.index)

// routes.get('/starter/about', starter.about)

// routes.get('/starter/recipies', starter.recipies)

// routes.get('/starter/recipie-content/:id', starter.recipieContent)

routes.get('/', function (req, res) {
    return res.redirect('/recipe')
})
routes.get('/recipe', recipe.index)
routes.get('/recipe/details/:id', recipe.show)
routes.get('/recipe/create', recipe.create)
routes.get('/recipe/:id/edit', recipe.edit)


routes.post('/recipe', recipe.post)
routes.put('/recipe', recipe.put)
routes.delete('/recipe', recipe.delete)


// CHEF

routes.get('/chef', chef.index)
routes.get('/chef/create', chef.create)
routes.get('/chef/details/:id', chef.show)
routes.get('/chef/:id/edit', chef.edit)

routes.post('/chef', chef.post)
routes.put('/chef', chef.put)
routes.delete('/chef', chef.delete)

module.exports = routes