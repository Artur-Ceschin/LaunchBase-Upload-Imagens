const Recipe = require('../model/Recipe')
const Chef = require('../model/Chef')

module.exports = {
    index(req, res) {

        let {
            filter
        } = req.query

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return res.render('admin/index', {
                    recipes,
                    filter
                })
            })
        } else {
            Recipe.all(function (recipes) {
                return res.render('admin/index', {
                    recipes
                })
            })
        }

    },
    about(req, res) {
        return res.render('admin/about')
    },
    show(req, res) {
        let {
            filter
        } = req.query

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return res.render('admin/recipe', {
                    recipes,
                    filter
                })
            })
        } else {
            Recipe.all(function (recipes) {
                return res.render('admin/recipe', {
                    recipes
                })
            })
        }
    },
    chef(req, res) {
        Chef.all(function (chefs) {
            return res.render('admin/chef', {chefs})
        })
    }
}