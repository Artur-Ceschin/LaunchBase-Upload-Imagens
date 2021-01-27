const Chef = require('../model/Chef')
module.exports = {
    index(req, res) {
        Chef.all(function (chefs) {
            return res.render('admin/chef/index', {
                chefs
            })
        })
    },
    create(req, res) {
        return res.render('admin/chef/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        Chef.create(req.body, function (chef) {
            return res.redirect(`admin/chef/details/${chef.id}`)
        })
    },
    show(req, res) {
        Chef.find(req.params.id, function (chefs) {
            if (!chefs) {
                return res.send('Chef not found')
            }
            Chef.findChefRecipes(req.params.id, function (recipes) {
                return res.render('admin/chef/details', {
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

            return res.render('admin/chef/edit', {
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
            return res.redirect(`admin/chef/details/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chef.delete(req.body.id, function () {
            return res.redirect('chef/')
        })
    }

}