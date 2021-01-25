

const Recipe = require('../model/Recipe')

module.exports = {
    index(req, res) {

        Recipe.all(function(recipes){
            return res.render('admin/index', {recipes})
        })

    },
    create(req, res) {
        return res.render('admin/create')
    },
    post(req, res) {    
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        Recipe.create(req.body, function (item) {
            return res.redirect(`/admin/details/${item.id}`)
        })
    
        return
    },
    show(req, res) {
        Recipe.find(req.params.id, function (recipies) {
            if(!recipies) {
                return res.send('Recipe not found')
            }

            return res.render('admin/details', {recipies})
        })
    },
    edit(req, res) {
        Recipe.find(req.params.id, function (recipies) {
            if(!recipies) {
                return res.send('Recipe not found')
            }

            return res.render(`admin/edit`, {recipies})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }
        Recipe.update(req.body, function(){
            return res.redirect(`/admin/details/${req.body.id}`)
        })
    },
    delete(req, res) {
        Recipe.delete(req.body.id, function(){
            return res.redirect(`/admin/`)
        })
    }
}