const Chef = require('../model/Chef')
module.exports = {
    async index(req, res) {

        const results = await Chef.all()
        const chefs = results.rows
        return res.render('admin/chef/index.njk', { chefs })

        // Chef.all(function (chefs) {
        //     return res.render('admin/chef/index', {
        //         chefs
        //     })
        // })
    },
    create(req, res) {
        return res.render('admin/chef/create')
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        const results = await Chef.create(req.body)
        // const chefId = results.rows[0].id

        return res.redirect(`admin/chef`)

        // Chef.create(req.body, function (chef) {
        //     return res.redirect(`admin/chef/details/${chef.id}`)
        // })
    },
    async show(req, res) {

        let results = await Chef.find(req.params.id)

        const chefs = results.rows[0]
        if (!chefs) return res.send('Chef not found')
        results = await Chef.findChefRecipes(req.params.id)
        const recipes = results.rows

        return res.render(`admin/chef/details`, { chefs, recipes })

        // Chef.find(req.params.id, function (chefs) {
        //     if (!chefs) {
        //         return res.send('Chef not found')
        //     }
        //     Chef.findChefRecipes(req.params.id, function (recipes) {
        //         return res.render('admin/chef/details', {
        //             chefs,
        //             recipes
        //         })
        //     })

        // })
    },
    async edit(req, res) {

        let results = await Chef.find(req.params.id)
        const chefsId = results.rows[0].id

        results = await Chef.findChef(req.params.id)
        const chefs = results.rows[0]

        if (!chefs) return res.send('Chef not found')

        return res.render(`admin/chef/edit`, { chefs, chefsId })

        // Chef.find(req.params.id, function (chefs) {
        //     if (!chefs) {
        //         return res.send('Chef not found')
        //     }

        //     return res.render('admin/chef/edit', {
        //         chefs
        //     })
        // })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }


        await Chef.update(req.body)

        return res.redirect(`admin/chef/details/${req.body.id}`)


        // Chef.update(req.body, function () {
        //     return res.redirect(`admin/chef/details/${req.body.id}`)
        // })
    },
    async delete(req, res) {

        await Chef.delete(req.body.id)

        return res.redirect('chef/')

        // Chef.delete(req.body.id, function () {
        //     return res.redirect('chef/')
        // })
    }

}