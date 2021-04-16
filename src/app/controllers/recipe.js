const Recipe = require('../model/Recipe')
const File = require('../model/File')
const { render } = require('nunjucks')

module.exports = {
    async index(req, res) {

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
                    pagination,
                })
            }
        }
        await Recipe.paginate(params)



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
        if (req.files.length == 0) {
            return res.send("Please send at least one image")
        }

        let results = await Recipe.create(req.body)
        const productId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({ ...file, product_id: productId }))
        await Promise.all(filesPromise)

        return res.redirect('admin/recipe')

    },
    async show(req, res) {

        let results = await Recipe.find(req.params.id)
        const recipies = results.rows[0]
        if (!recipies) return res.send('Recipie not found')

        results = await Recipe.files(recipies.id)
        let files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('admin/recipe/details', { recipies, files })

    },
    async edit(req, res) {

        let results = await Recipe.find(req.params.id)
        const recipies = results.rows[0]
        if (!recipies) return res.send('Recipie not found')

        //get Images
        results = await Recipe.files(recipies.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render(`admin/recipe/edit`, { recipies, files })

    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != 'removed_files') {
                return res.send("Please, fill this fild " + key)
            }

        }
        if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file =>
                File.create({ ...file, product_id: req.body.id }))
            await Promise.all(newFilesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(',')
            const lasIndex = removedFiles.length - 1
            removedFiles.splice(lasIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Recipe.update(req.body)
        return res.redirect(`/admin/recipe/details/${req.body.id}`)


    },
    async delete(req, res) {

        await Recipe.delete(req.body.id)

        return res.redirect(`/admin/recipe/`)
        // Recipe.delete(req.body.id, function () {
        //     return res.redirect(`/admin/recipe/`)
        // })
    }
}