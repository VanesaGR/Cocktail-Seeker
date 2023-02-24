'use strict';

//Declaración de constantes y variables

const input = document.querySelector('.js-input');
const btnSearch  = document.querySelector('.js-search-btn');
const btnReset = document.querySelector('.js-reset-btn');
const listCocktails = document.querySelector('.js-cocktails');
const listFavorites = document.querySelector('.js-favorites');

const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

let listCocktailsData = []; //array para guardar los cocteles que se muestran por defecto
let listFavoritesData = []; //array para guardar los cocteles del listado de favoritos

fetchFunction('margarita');

//Pintar cocteles
function renderCocktails(cocktails) {
  listCocktails.innerHTML='';
  for (const eachCocktail of cocktails) {
    if (eachCocktail.photo) {
      listCocktails.innerHTML += `<li class="js-li-cocktail" id="${eachCocktail.id}"><h3>${eachCocktail.name}</h3> <img src="${eachCocktail.photo}" title="${eachCocktail.name}" class="imgCocktail"/></li>`;
    } else {
      listCocktails.innerHTML += `<li class="js-li-cocktail" id="${eachCocktail.id}"><h3>${eachCocktail.name}</h3> <img src="
./assets/images/default.png" title="${eachCocktail.name}" class="imgCocktail"/></li>`; //si no tiene foto te pone la seleccionada por defecto
    }
  }
  addEventToCocktail();
}

function fetchFunction(cocktailName){
//Pintar lista de margaritas al abrir la pagina
  fetch(url+cocktailName) //url es la direccion de la api que nos lleva a las margaritas
    .then(response => response.json())
    .then(data =>{
      listCocktailsData = data.drinks.map((drink) => ({//margaritas es el nombre que le ponemos por defecto ya que son solo margaritas lo que vamos a mostrar al iniciar la pagina
        name: drink.strDrink, //strDrink es el nombre del coctel dentro de la API
        photo: drink.strDrinkThumb, //strDrikThum es la foto del coctel dentro de la API
        id: drink.idDrink //idDrink es el id del coctel dentro de la API
      }));
      // console.log(listCocktailsData);
      renderCocktails(listCocktailsData);
    });
}

//función para el botón de búsqueda
function handleClickBtn(ev) {
  ev.preventDefault(); //previene que se refresque la página en automatico
  const inputValue = input.value.toLowerCase(); //input es el valor que se introduce en el campo de búsqueda y toLowerCase para que iguale tipografías a la hora de buscar
  fetchFunction(inputValue);//aprovechamos la funcion anterior
}

//funcion para el boton de reset
function handleResetBtn(ev){
  ev.preventDefault();
  input.value='';
}

//función para pintar favoritos (es igual que la de por defecto solo que cambia el array que la recibe)
function renderFavorites(cocktails) {
  listCocktails.innerHTML='';
  for (const eachCocktail of cocktails) {
    if (eachCocktail.photo) {
      listFavorites.innerHTML += `<liclass="js-li-cocktail" id="${eachCocktail.idDrink}"><h3>${eachCocktail.name}</h3> <img src="${eachCocktail.photo}" title="${eachCocktail.name}" class="imgCocktail"/></li>`;
    } else {
      listFavorites.innerHTML += `<li class="js-li-cocktail" id="${eachCocktail.idDrink}"><h3>${eachCocktail.name}</h3> <img src="
./assets/images/default.png" title="${eachCocktail.name}" class="imgCocktail"/></li>`; //si no tiene foto te pone la seleccionada por defecto
    }
  }
  addEventToCocktail();
}

//almacenamiento en el local storage
const cocktailStorage=JSON.parse(localStorage.getItem('listCocktails'));
if(cocktailStorage!==null){
  listFavoritesData = cocktailStorage;
  renderFavorites(listFavoritesData);
}

//guardar los favoritos
function handleClick(ev){

  ev.currentTarget.classList.toggle('selected');//si tiene esa clase, se la quitas y si no, se la pones
  //busca ese id en el listado de cocteles el coctel que tiene el id del current Target
  const idSelected = ev.currentTarget.id;
  //find devuelve el primer elemento que cumple una condición
  const selectedCocktail = listCocktailsData.find(cocktail=> cocktail.id===idSelected);

  //findIndex devuelve la posición donde está un elemento o -1 si es que no está
  const indexCocktail = listFavoritesData.findIndex(eachCocktail=> eachCocktail.id===idSelected);

  //comprobación de existencia del favorito
  if(indexCocktail===-1){
    listFavoritesData.push(selectedCocktail); //guardado en el listado con push
  }else{
    listFavoritesData.splice(indexCocktail, 1); //elimina un elemento a partir de una posicion
  }

  renderFavorites(listFavoritesData); //pinta favoritos
  renderCocktails(listCocktailsData);
}

//funcion para que funcione el clic de favoritos

function addEventToCocktail(){
  const liElemenstList = document.querySelectorAll('.js-li-cocktail'); //todos los elementos con esa clase
  for(const li of liElemenstList){//para todos los elementos de la lista
    li.addEventListener('click', handleClick);
  }
}

//EVENTOS

//escucha del botón de búsqueda
btnSearch.addEventListener('click', handleClickBtn);
//escucha del botón reset
btnReset.addEventListener('click', handleResetBtn);