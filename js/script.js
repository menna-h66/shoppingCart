let products = [
    {
        id : 1,
        img : './images/img1.png',
        name : 'Product1',
        description : 'Orange leather bag',
        price : 1000
    },
    {
        id : 2,
        img : './images/img2.png',
        name : 'Product2',
        description : 'Orange leather bag',
        price : 1200
    },
    {
        id : 3,
        img : './images/img3.png',
        name : 'Product3',
        description : 'Orange leather bag',
        price : 900
    },
    {
        id : 4,
        img : './images/img4.png',
        name : 'Product4',
        description : 'Orange leather bag',
        price : 700
    },
    {
        id : 5,
        img : './images/img4.png',
        name : 'Product5',
        description : 'Orange leather bag',
        price : 1700
    },
    {
        id : 6,
        img : './images/img3.png',
        name : 'Product3',
        description : 'Orange leather bag',
        price : 900
    },
    {
        id : 7,
        img : './images/img2.png',
        name : 'Product2',
        description : 'Orange leather bag',
        price : 1200
    },{
        id : 8,
        img : './images/img1.png',
        name : 'Product1',
        description : 'Orange leather bag',
        price : 1000
    }
];

let arr = [];
let container = document.querySelector(".container")
let listItem = document.querySelector('.listItem');
let listItems = document.querySelector(".listItems")
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total");
let openList = document.querySelector(".fa-cart-shopping")
let logOut = document.querySelector(".fa-right-from-bracket")

localStorage.setItem('Product' , JSON.stringify(products));
const storedProducts = JSON.parse(localStorage.getItem('Product'));

const arrProducts = JSON.parse(localStorage.getItem('arr')) || [];
localStorage.setItem('arr' , JSON.stringify(arrProducts));
const check = JSON.parse(localStorage.getItem('userName'))

function createCards() {
    if(storedProducts){

        storedProducts.forEach((product, index) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('cart');
            newDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p class="fw-bolder">${product.price}$</p>
                <button type="button" class="btn btn-dark" onclick="addToArr(${index})">Add To Cart</button>
            `;
            container.appendChild(newDiv);
    });
    
}
}
createCards();

function addToArr(index) {
    if(check){
    if (!arrProducts[index]) {
        arrProducts[index] = { ...storedProducts[index], quantity: 1 };
    } else {
        arrProducts[index].quantity += 1; // Increment quantity if already in cart
    }

    localStorage.setItem('arr' , JSON.stringify(arrProducts));

    reloadCard();
}else{
    alert('Please login First')
    setTimeout(()=>{
        window.location='./login.html'

    },1500)
}
}

function reloadCard() {
    listItem.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    arrProducts.forEach((item) => {
        if (item) { 
            totalPrice += item.price * item.quantity; 
            count += item.quantity; 
            
            listItem.innerHTML += `
                <div class="item mb-3">
                    <div class="listItem-img h-100 d-flex justify-content-center align-items-center">
                        <img src="${item.img}" alt="">
                        <h4 class="mt-2">${item.name}</h4>
                    </div>
                    <p class="fw-bolder mt-3">${item.price}$</p>
                    <div class="btns">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span class="ms-1 me-1">${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
            `;
        }
    });

    total.innerText = `Total Price : ${totalPrice}$`;
    quantity.innerText = count;
    
    if(count == 0){
        listItems.style.display = 'none';
    }

    return count;
}

openList.addEventListener('click', function() {
        const currentCount = arrProducts.reduce((acc, item) => acc + (item ? item.quantity : 0), 0);
    
        if (currentCount > 0) {
            listItems.style.display = listItems.style.display === 'none' || listItems.style.display === '' ? 'block' : 'none';
        } else {
            listItems.style.display = 'none';
        }
    });


function decreaseQuantity(id) {
    const index = arrProducts.findIndex(item => item && item.id === id);
    if (index !== -1) {
        arrProducts[index].quantity--;
        if (arrProducts[index].quantity <= 0) {
            arrProducts[index] = null;
        }
        localStorage.setItem('arr' , JSON.stringify(arrProducts));
        reloadCard();
    }
}

function increaseQuantity(id) {
    const index = arrProducts.findIndex(item => item && item.id === id); 
    if (index !== -1) {
        arrProducts[index].quantity++;
        reloadCard();
    }
     localStorage.setItem('arr' , JSON.stringify(arrProducts));
}
reloadCard();

logOut.addEventListener("click", function(){
       localStorage.removeItem("userName")
       setTimeout(()=>{
        window.location='./login.html'
       },1500)
})