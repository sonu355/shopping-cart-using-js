if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready(){
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for(let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
        button.addEventListener('click', removeItemFromCart)
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChange)
    }
}

function removeItemFromCart(e){
    let buttonClick = e.target
    buttonClick.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChange(e){
    var input = e.target
    console.log(e.target.value)
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    } 
    updateCartTotal;
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
        // console.log(price, quantity)
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}