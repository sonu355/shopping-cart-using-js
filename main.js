var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for(let i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function(e){
        let buttonClick = e.target
        buttonClick.parentElement.parentElement.remove()
    })
}