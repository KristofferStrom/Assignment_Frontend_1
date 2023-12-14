let _amount = 6;
let allMovies = [];

function fetchMovies(){

    fetch('https://dummyapi.online/api/movies')
                 .then((resp) => resp.json())
                 .then((json) => {
                json.forEach(mov =>{
                   const movie = {
                      id: mov.id,
                      title: mov.movie,
                      img: mov.image,
                      rating: mov.rating,
                      cost: Math.floor(Math.random() * 15) + 40
                   };
                   allMovies.push(movie);
             });
             renderMovies();
             });
 
 };
 fetchMovies();

 const loadBtn = document.querySelector('#loadMoreMovies');
    loadBtn.addEventListener('click', function(){
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        _amount = allMovies.length - cartItems.length;
        renderMovies();
});


 function renderMovies(){
    const output = document.querySelector('#movieDisplay');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const movies = [];
    allMovies.forEach(mov => {
        if(!cartItems.some(m => m.id === mov.id))
            movies.push(mov);
    });
    output.innerHTML = '';
    for (let i = 0; i < (_amount < movies.length ? _amount : movies.length); i++) {
        output.innerHTML += 
       `<div class="movieCard" onclick="addToLocalStorage(${movies[i].id})">
          <img src="${movies[i].img}" alt="${movies[i].title}" class="movieImg">
          <div class="p-4">
             <p class="text-red-700 font-bold">${movies[i].title}</p>
             <p class="block text-gray-500 text-sm">Betyg: ${movies[i].rating}</p>
          </div>
       </div>`
    }
      
       loadMoreBtnCheck(movies.length);
}

function loadMoreBtnCheck(movieCount){
    const loadBtn = document.querySelector('#loadMoreMovies');
    if(_amount < movieCount)
        loadBtn.classList.remove('hidden');
    else
        loadBtn.classList.add('hidden');
}

function addToLocalStorage(movieId){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
 
    allMovies.forEach(movie => {
        if(movie.id == movieId){
            cartItems.push(movie);
        }
 
    });
 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItemsAmount();
  
    renderMovies();
 }
