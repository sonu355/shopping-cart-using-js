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
    let addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for(let i = 0; i < addToCartButtons.length; i++){
            let button = addToCartButtons[i]
            button.addEventListener('click', addToCart)
    }
}

function removeItemFromCart(e){
    let buttonClick = e.target
    buttonClick.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChange(e){
    let input = e.target
    // console.log(e.target.value)
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    } 
    updateCartTotal;
}

function addToCart(e){
    let button = e.target
    let shopItem = button.parentElement.parentElement
    let titleName = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let itemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(titleName, itemPrice, imageSrc)
    addItemToCart(titleName, itemPrice, imageSrc)
}

function addItemToCart(titleName, itemPrice, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    // cartRow.innerHTML = imageSrc
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = document.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == titleName){
            alert('this item is already in the cart')
            return
        }
    }
    let cartItemContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100">
            <span class="cart-item-title">${titleName}</span>
        </div>
        <span class="cart-price cart-column">${itemPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartItemContents
    cartItems.append(cartRow)
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
        console.log(total)
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}