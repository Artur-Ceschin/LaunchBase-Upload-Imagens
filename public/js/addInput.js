function addIngredient() {
    const ingredients = document.querySelector(".ingredientsEditInputAll")
    const fieldContainer = document.querySelectorAll(".ingredientsEditInput")

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "")
        return false

    // Deixa o valor do input vazio
    newField
        .children[0]
        .value = ""
    ingredients.appendChild(newField)
}



function addPreparation(){
    const preparation = document.querySelector('.preparationAll')
    const prepararionField = document.querySelectorAll('.preparationInput')

    // Realiza um clone do último ingrediente adicionado
    const newField = prepararionField[prepararionField.length-1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if(newField.children[0].value == ""){ return false}

    // Deixa o valor do input vazio
    newField.children[0].value=""

    preparation.appendChild(newField)
}

document.querySelector("#addIngredients").addEventListener("click", addIngredient)
document.querySelector("#addPreparation").addEventListener("click", addPreparation)


