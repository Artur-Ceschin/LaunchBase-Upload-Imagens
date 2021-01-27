
var buttons = document.querySelectorAll('.btn');


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        document.querySelector('.content' + i).classList.toggle('hide');
            if (document.querySelector('.content' + i).classList.contains('hide')) {
                buttons[i].innerHTML = 'mostrar'
                console.log(buttons)
            }
            else{
                buttons[i].innerHTML = 'esconder'
            }
    })
    
}

const cards = document.querySelectorAll('.card')
for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
        window.location.href = `/admin/recipe/details/{{recipes.id}}`
    })
}


function paginate(selectedPage, totalPage) {
	let page = [],
		oldPage

	for (let currentPages = 1; currentPages <= totalPage; currentPages++) {
		const FirstAndLastPages = currentPages == 1 || currentPages == totalPage
		const pageAfterSelectedPages = currentPages <= selectedPage + 2
		const pageBeforeSelectedPages = currentPages >= selectedPage - 2

		if (FirstAndLastPages || pageAfterSelectedPages && pageBeforeSelectedPages) {
			if (oldPage && currentPages - oldPage > 2) {
				page.push('...')
			}
			if (oldPage && currentPages - oldPage == 2) {
				page.push(oldPage + 1)
			}

			page.push(currentPages)
			oldPage = currentPages
		}
	}
	return page
}

function createPaginate(pagination) {
	const page = +pagination.dataset.page
	const total = +pagination.dataset.total

	const pages = paginate(page, total)
	let elements = ""

	for (let page of pages) {
		if (String(page).includes('...')) {
			elements += `<span>${page}</span>`
		} else {
			elements += `<a href="?page=${page}">${page}</a>`
		}
	}
	pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
	createPaginate(pagination)
}