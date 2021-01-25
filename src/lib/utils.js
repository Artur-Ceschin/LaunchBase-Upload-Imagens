
module.exports = {
    ingredients: function (validationInputs) {
        
        function filterIngredients(ingredients) {
            return ingredients != ""
        }

        let ingredients = validationInputs.filter(filterIngredients)    

        return ingredients
    },
    preparation: function (validationInputs) {

        function filterPreparation(preparation) {
            return preparation != ""
        }

        let preparation = validationInputs.filter(filterPreparation)    

        return preparation
    },
    date(timestap){
        const data = new Date(timestap)

          const year = data.getUTCFullYear()

          const month = `0${ data.getUTCMonth() + 1 }`.slice(-2)

          const day = `0${ data.getUTCDate() }`.slice(-2)

          return {
              iso:`${ year }-${ month }-${ day }`,
              birthDate: `${ day }/${ month }/${ year }`
          }
    }
}