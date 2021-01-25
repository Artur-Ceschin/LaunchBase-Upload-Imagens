
const dataJs = require('../data')

exports.redirect = function (req, res) {
    return res.redirect('starter/index')
}

exports.index = function (req, res) {
    return res.render('starter/index', {items : dataJs})
}

exports.about =  function (req, res) {
    return res.render('starter/about')
}

exports.recipies = function (req, res) {
    return res.render('starter/recipies', {items : dataJs})
}

exports.recipieContent =  function (req, res) {
    const recipeIndex = req.params.id;
    return res.render('starter/recipie-content', {recipie : dataJs[recipeIndex]})
}