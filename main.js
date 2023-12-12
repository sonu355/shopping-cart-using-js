var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for(let i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function(e){
        let buttonClick = e.target
        buttonClick.parentElement.parentElement.remove()
        updateCartTotal()
    })
}

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let cartItemPrice = cartRow.getElementsByClassName('cart-price')[0]
        let cartItemQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // console.log(cartItemPrice)
        // console.log(cartItemQuantity)
        let price =  parseFloat(cartItemPrice.innerText.replace('$', ''))
        let quantity = cartItemQuantity.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}