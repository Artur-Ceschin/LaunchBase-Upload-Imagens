const Chef = require('../model/Chef')
module.exports = {
    index(req, res) {
        Chef.all(function (chefs) {
            return res.render('chef/index', {
                chefs
            })
        })
    },
    create(req, res) {
        return res.render('chef/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        Chef.create(req.body, function (chef) {
            return res.redirect(`chef/details/${chef.id}`)
        })
    },
    show(req, res) {
        Chef.find(req.params.id, function (chefs) {
            if (!chefs) {
                return res.send('Chef not found')
            }
            Chef.findChefRecipes(req.params.id, function (recipes) {
                return res.render('chef/details', {
                    chefs,
                    recipes
                })
            })

        })
    },
    edit(req, res) {
        Chef.find(req.params.id, function (chefs) {
            if (!chefs) {
                return res.send('Chef not found')
            }

            return res.render('chef/edit', {
                chefs
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

        Chef.update(req.body, function () {
            return res.redirect(`chef/details/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chef.delete(req.body.id, function () {
            return res.redirect('chef/')
        })
    }

}