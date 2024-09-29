let arrOfItems = JSON.parse(localStorage.getItem('arr')) || [];

localStorage.setItem('arr' , JSON.stringify(arrOfItems));
let cartShoppingItems = document.querySelector(".cartShoppingItems");
let totalPrice = document.querySelector(".total-price");
let quantity = document.querySelector(".quantity")
let emptyP = document.querySelector(".empty")
let logOut = document.querySelector(".fa-right-from-bracket")
const check = JSON.parse(localStorage.getItem('userName'))
function createCards() {
    let total = 0;
    let count = 0;
    
    cartShoppingItems.innerHTML = '';

    if (arrOfItems.length === 0) {
        emptyP.style.display = 'block'; 
    } else {
        emptyP.style.display = 'none'; 

    arrOfItems.forEach((product) => {
        if (product) {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="name ms-2 text-start">
                    <h4 class="fw-bolder">${product.name}</h4>
                    <p>${product.description}</p>
                    <p class="fw-bolder">${product.price}$</p>
                </div>
                <div class="ShoppingBtns text-center">
                    <button class="mb-2" onclick="decreaseQuantity(${product.id})">-</button>
                    <span>${product.quantity}</span>
                    <button class="mt-2" onclick="increaseQuantity(${product.id})">+</button>
                </div>
            `;
            cartShoppingItems.appendChild(newItem);
            total += product.price * product.quantity; 
            count += product.quantity;
        }
    });
    }
    totalPrice.innerText = `Total Price: ${total}$`;
    quantity.innerHTML = count;
}

createCards();

function decreaseQuantity(id) {
    let findItem = arrOfItems.findIndex(item => item && item.id === id)
    if( findItem !== -1){
       arrOfItems[findItem].quantity--;
       if(arrOfItems[findItem].quantity <= 0){
        arrOfItems[findItem] = null;
       }
       localStorage.setItem('arr' , JSON.stringify(arrOfItems));
       createCards();
    }
}

function increaseQuantity(id) {
    let findItem = arrOfItems.findIndex(item => item && item.id === id);
    if(findItem !== -1){
        arrOfItems[findItem].quantity++;
        createCards();
    }
    localStorage.setItem('arr' , JSON.stringify(arrOfItems));

}

logOut.addEventListener("click", function(){
    localStorage.removeItem("userName")
    setTimeout(()=>{
     window.location='./login.html'
    },1500)
})