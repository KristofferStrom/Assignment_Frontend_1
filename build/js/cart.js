function renderCartItems(){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let output = document.querySelector('#cartDisplay');
    output.innerHTML = '';
    
    if(emptyCartCheck())
        return;
        
    cartItems.forEach(movieItem => {
        output.innerHTML += 
            `
            <li class="cartItem mb-2">
                <div class="title">
                    <h3 class="font-bold">${movieItem.title}</h3>
                </div>
                <div>
                    <span class="cost">${movieItem.cost} kr</span>
                    <button class=" btn hover:scale-105 duration-300 ml-2" onclick="removeFromLocalStorage(${movieItem.id})">X</button>
                </div>
            </li>
            `
    });
}
renderCartItems();

function displayOrderDetails(){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const amountOfMovies = document.querySelector('#movieAmount');
    const totalSum = document.querySelector('#totalSum');
    totalSum.innerHTML = cartItems.reduce((sum, {cost}) => sum + cost, 0);
    amountOfMovies.innerHTML = cartItems.length;
    
}
displayOrderDetails();

function removeFromLocalStorage(movieId){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].id == movieId){
            cartItems.splice(i,1);
        }
    }

    localStorage.clear();

    if(cartItems.length > 0){
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } 
    updatePage();
}

function emptyCartCheck(){
    let emptyCardMessage = document.querySelector('#emptyCartMessage');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
   
    if(cartItems.length > 0){
        emptyCardMessage.classList.add('hidden');
        return false;
    } else{
        emptyCardMessage.classList.remove('hidden');
        return true;
    }
   
}

const orderBtn = document.querySelector('#orderBtn');

orderBtn.addEventListener('click', function () {
    localStorage.clear();
    updatePage();
});

function updatePage(){
    renderCartItems();
    displayOrderDetails();
    renderCartItemsAmount();
}