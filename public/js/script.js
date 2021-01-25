
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
        window.location.href = `/starter/recipie-content/${i}`
    })
}
