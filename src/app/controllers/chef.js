const Chef = require('../model/Chef')
module.exports = {
    index(req, res) {
        Chef.all(function(chefs){
            return res.render('chef/index', {chefs})
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

        Chef.create(req.body, function(chef) {
            return res.redirect(`chef/details/${chef.id}`)
        })
    }

}