'use strict';

//Declaración de constantes y variables

const input = document.querySelector('.js-input');
const btnSearch  = document.querySelector('.js-search-btn');
const btnReset = document.querySelector('.js-reset-btn');
const listCocktails = document.querySelector('.js-cocktails');
const favoritesUl = document.querySelector('.js-favorites');

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




//EVENTOS

//escucha del botón de búsqueda
btnSearch.addEventListener('click', handleClickBtn);