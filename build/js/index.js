const burger = document.querySelector('#burger');
const menu = document.querySelector('#menu');

burger.addEventListener('click', () => {
    if(menu.classList.contains('hidden'))
        menu.classList.remove('hidden');
    else
        menu.classList.add('hidden');
});

function renderCartItemsAmount(){
    const qty = document.querySelectorAll('.qty');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const amount = cartItems.length;
    qty.forEach((quantity) => quantity.innerHTML = amount);
 }
 renderCartItemsAmount();