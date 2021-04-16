const Recipe = require('../model/Recipe')
const Chef = require('../model/Chef')

module.exports = {
    async index(req, res) {

        const {
            filter
        } = req.query

        if (filter) {
            let results = await Recipe.findBy()
            const recipes = results.rows
            return res.render('site/index', { recipes, filter })

        } else {
            results = await Recipe.all()
            const recipes = results.rows

            // results = await Recipe.find(req.params.id)
            // const recipies = results.rows[0]

            // results = await Recipe.files(recipies.id)
            // let files = results.rows.map(file => ({
            //     ...file,
            //     src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            // }))
            return res.render('site/index', { recipes })
        }

    },
    about(req, res) {
        return res.render('site/about')
    },
    async show(req, res) {

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

        await Recipe.paginate(params)

    },
    async chef(req, res) {

        let results = await Chef.all()
        const chefs = results.rows

        return res.render('site/chef', { chefs })

        // Chef.all(function (chefs) {
        //     return res.render('site/chef', {
        //         chefs
        //     })
        // })
    }
}