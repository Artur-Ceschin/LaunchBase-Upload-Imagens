const fs = require('fs');
const data = require('../data.json');
const {ingredients, preparation} = require('../utils')

//INDEX
exports.index = function (req, res) {

    let recipies = data.infos.map(function (info) {
        const createField = {
            ...info
        }
        return createField
    })

    return res.render('admin/index', {items:recipies} )
}

//CREATE
exports.create =  function (req, res){
    return res.render('admin/create')
}

//POST
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill this fild " + key)
        }

    }


    let id = 1

    const lastData = data.infos[data.infos.length - 1]

    if (lastData) {
        id = lastData.id + 1
    }

    let {
        url_image,
        name,
        author,
        ingredients,
        preparation,
        aditional_info
    } = req.body

    id = Number(data.infos.length + 1)

    data.infos.push({
        id,
        url_image,
        name,
        author,
        ingredients,
        preparation,
        aditional_info

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("An error has occurred: " + err.message)
        }
        return res.redirect("/admin")
    })
}

//SHOW
exports.show = function (req, res){

    let { id } = req.params

    const foundRecipie = data.infos.find(function (recipie){
        return recipie.id == id
    })
    if(!foundRecipie) {
        return res.send("recipie not found")
    }

    const recipies = {
        ...foundRecipie,
        // ingredients: foundRecipie.ingredients.split(","),
        // preparation: foundRecipie.preparation.split(","),
        //recipieInfo: foundRecipie.ingredients.split(","),
    }


    return res.render(`admin/details`, { recipies})
}

//PUT
exports.put =function (req, res){

    let { id } = req.body

    let index = 0 

    const foundRecipes = data.infos.find(function(info, foundIndex) {
        if (id == info.id) {
            index = foundIndex
            return true
        } 
    })
 

    if (!foundRecipes) return res.send('info not found!')

    const info = {
        // ...foundRecipes,
        ...req.body,
        id: Number(req.body.id),
        ingredients: ingredients(req.body.ingredients),
        preparation: preparation(req.body.preparation),
    }


    data.infos[index] = info
    
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write error!')

        return res.redirect(`/admin/details/${id}`)
    })
}

//EDIT
exports.edit = function (req, res) {
    let {id} = req.params

    const foundRecipie = data.infos.find(function (recipie){
        return recipie.id == id
    })
    if(!foundRecipie) {
        return res.send("recipie not found")
    }

    const recipies = {
        ...foundRecipie,
        //recipieInfo: foundRecipie.ingredients.split(","),
    }

    return res.render("admin/edit", { recipies })

}

//DELETE
exports.delete = function(req, res){
    const { id } = req.body

    const filteredRecipie = data.infos.filter(function(recipie){

        return recipie.id != id
    }) 

    data.infos = filteredRecipie

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){

        if(err)  return res.send('Found an error' + err)

        return res.re('/admin')
    })
}