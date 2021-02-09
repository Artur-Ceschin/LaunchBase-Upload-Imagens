
const cards = document.querySelectorAll('.card');

for (let card of cards){
    card.addEventListener("click", function(){
        const id = card.getAttribute("id");
        window.location.href=`/admin/recipe/details/${id}`
    })
}

//DELETAR
const formDelete = document.querySelector("#form-delete")

formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja deletar ?")

    if (!confirmation) {
        event.preventDefault()
    }
})

//ACTIVE
// const currentPage = location.pathname

// const menuItems = document.querySelectorAll(".container-header a")

// for (item of menuItems) {
//     if (currentPage.includes(item.getAttribute("href"))) {
//         item
//             .classList
//             .add("active")
//     }
// }