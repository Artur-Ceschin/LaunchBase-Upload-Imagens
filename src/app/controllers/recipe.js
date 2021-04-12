const Recipe = require('../model/Recipe')

module.exports = {
    index(req, res) {
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
                return res.render('admin/recipe/index', {
                    recipes,
                    filter,
                    pagination
                })
            }
        }

        Recipe.paginate(params)

    },
    create(req, res) {
        Recipe.chefsSelectOptions(function (options) {
            return res.render('admin/recipe/create', {
                chefOptions: options
            })
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        // Recipe.create(req.body, function (item) {
        //     return res.redirect(`/admin/recipe/details/${item.id}`)
        // })

        const results = await Recipe.create(req.body)
        // const recipeId = results.rows[0].id

        return res.redirect('admin/recipe')

    },
    show(req, res) {
        Recipe.find(req.params.id, function (recipies) {
            if (!recipies) {
                return res.send('Recipe not found')
            }

            return res.render('admin/recipe/details', {
                recipies
            })
        })
    },
    edit(req, res) {
        Recipe.find(req.params.id, function (recipies) {
            if (!recipies) {
                return res.send('Recipe not found')
            }

            return res.render(`admin/recipe/edit`, {
                recipies
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }
        Recipe.update(req.body, function () {
            return res.redirect(`/admin/recipe/details/${req.body.id}`)
        })
    },
    delete(req, res) {
        Recipe.delete(req.body.id, function () {
            return res.redirect(`/admin/recipe/`)
        })
    }
}