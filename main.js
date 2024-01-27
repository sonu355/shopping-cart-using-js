if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
const API_URL = 'https://fakestoreapi.com/products'

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

    document.querySelector('.products').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('shop-item-btn')) {
            addToCart(e);
            updateCartTotal();
        }
    });

    let purchaseButton = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('Thanks for purchasing')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
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
    
    updateCartTotal();
}

function addToCart(e){
    let button = e.target
    let shopItem = button.parentElement.parentElement
    let titleName = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let itemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(titleName, itemPrice, imageSrc)
    addItemToCart(titleName, itemPrice, imageSrc)
    updateCartTotal()
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
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItemFromCart)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}

let spinner  = document.getElementById('loadingSpinner')
function showSpinner() {
    spinner.style.display = 'block';
}
function hideSpinner() {
    spinner.style.display = 'none';
}
async function fetchProducts(url){
    try {
        let response = await fetch(url);
        console.log(response)
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return[];
    }
}

document.addEventListener('DOMContentLoaded',async function(){
        let products = document.querySelector('.products')
   
        async function displayProducts(){
            try{
                showSpinner()
                let productsData = await fetchProducts(API_URL) 

                const itemsPerPage = 6;
                const totalPages = Math.ceil(productsData.length / itemsPerPage);
        
                const paginationContainer = document.getElementById('paginationContainer');
                const paginationList = document.getElementById('paginationList');
        
                paginationList.innerHTML = '';

                for (let page = 1; page <= totalPages; page++) {
                    const li = document.createElement('li');
                    li.classList.add('page-item');
        
                    const a = document.createElement('a');
                    a.classList.add('page-link');
                    a.href = '#';
                    a.innerText = page;
        
                    a.addEventListener('click', () => {
                        displayPage(page, itemsPerPage, productsData);
                    });
        
                    li.appendChild(a);
                    paginationList.appendChild(li);
                }
        
                displayPage(1, itemsPerPage, productsData);
                hideSpinner()
            }
            catch(error){
                console.log(error)
                hideSpinner()
            }
        } 
        

function displayPage(page, itemsPerPage, productsData) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = productsData.slice(startIndex, endIndex);

    products.innerHTML = '';

    for (let i = 0; i < currentProducts.length; i++) {
        let description = currentProducts[i].description;
        let title = currentProducts[i].title;
        products.innerHTML += `
            <div class="shop-item">
                <img src="${currentProducts[i].image}" alt="" class="shop-item-image">
                <h2 class="shop-item-title">${title.length > 15 ? title.substring(0, 15).concat('...') : title}</h2>
                <h4 class="product-category">${currentProducts[i].category}</h4>
                <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat('...more') : description}</p>
                <div class="shop-item-details">
                    <h4 class="shop-item-price">$${currentProducts[i].price}</h4>
                    <button class="btn btn-primary shop-item-btn">Add To Cart</button>
                </div>
            </div>`;
    }
}
        await displayProducts()
})

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