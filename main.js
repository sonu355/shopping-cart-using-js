if(document.readyState == 'readyState') {
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready() {
    const removeCartButtons = document.getElementsByClassName('btn-danger');
    // console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', function(e){
            var targetButton = e.target
            targetButton.parentElement.parentElement.remove()
            updateCartTotal()
        })
    }
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // console.log(cartItemContainer)
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = priceElement.innerText.replace('$', '')
        console.log(price)
        var quantity = cartQuantity.value
        console.log(quantity)
        console.log(price * quantity)
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}