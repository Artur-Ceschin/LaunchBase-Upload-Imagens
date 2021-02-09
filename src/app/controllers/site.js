const Recipe = require('../model/Recipe')
const Chef = require('../model/Chef')

module.exports = {
    index(req, res) {

        const {
            filter
        } = req.query

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return res.render('site/index', {
                    recipes,
                    filter
                })
            })
        } else {
            Recipe.all(function (recipes) {
                return res.render('site/index', {
                    recipes
                })
            })
        }

        


    },
    about(req, res) {
        return res.render('site/about')
    },
    show(req, res) {

        let {
            filter,
            page,
            limit
        } = req.query

        page = page || 1
        limit = limit || 6

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
                let pagination = {
                    page,
                    total: Math.ceil(recipes[0].total / limit)
                }
                return res.render('site/recipe', {
                    recipes,
                    filter,
                    pagination
                })
            }
        }

        Recipe.paginate(params)

    },
    chef(req, res) {
        Chef.all(function (chefs) {
            return res.render('site/chef', {
                chefs
            })
        })
    }
}