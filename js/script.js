const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonLimitPath = "?limit=";
const pokemonLimit = "12";
const pokemonOffsetPath = "&offset=";
const pokemonOffset = "0";
const pokemonImagePath =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const pokemonUrl =
  pokemonBaseUrl +
  pokemonLimitPath +
  pokemonLimit +
  pokemonOffsetPath +
  pokemonOffset;


  function init(){
catchThemAll(pokemonLimit);
  }
    




async function catchThemAll(path = "") {
  let response = await fetch(pokemonUrl);

  let responseToJson = await response.json();
  const pokemonData = responseToJson.results;
  renderPokemon(pokemonData);
}








function renderPokemon(pokemonData) {
  let pokemon = pokemonData;
  console.log(pokemon);

  const cardRef = document.getElementById("cards");

  for (let i = 0; i < pokemon.length; i++) {
    const pokemonIndex = i + 1;
    const singlePokemon = pokemon[i];
    const pokemonImage = pokemonImagePath + pokemonIndex + ".png";
    cardRef.innerHTML += /*html*/ `
    <button id="card${-[i]}" class="card-box grass-card" aria-haspopup="dialog" type="button" tabindex="0">
                    <div class="card-header">
                        <h3 id="cardPokemonName" class="card-title">${singlePokemon.name}</h3>
                        <ul class="type-box">
                            <li class="type"></li>
                            <li class="type">Poison</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <div class="card-number" id="pokemonCardNumber">
                            <p>${singlePokemon.id}</p>
                        </div>
                        <div class="card-image" id="pokemonCardImage">
                            <img src="${pokemonImage}" alt="Pokemon: ${singlePokemon.name}">
                        </div>
                    </div>
                </button>
  `;
catchPokemonDetails(pokemonIndex, singlePokemon);
  }
}


async function catchPokemonDetails(pokemonIndex, singlePokemon) {
  const pokemonDetailUrl = singlePokemon.url;

  const response = await fetch(pokemonDetailUrl);
  let responseToJson = await response.json();
  let abilitiesOne = responseToJson.abilities[0].ability.name;
  let abilitiesTwo = responseToJson.abilities[1].ability.name;
  let abilities = [];
  abilities.push(abilitiesOne, abilitiesTwo);
  console.log(abilities);
  
  
}




function openDialogTab(tab) {
  let i;
  const dialogNavRef = document.getElementsByClassName("dialogTab");
  for (i = 0; i < dialogNavRef.length; i++) {
    dialogNavRef[i].style.display = "none";
  }
  const dialogContentRef = document.getElementById(tab);
  dialogContentRef.style.display = "block";
}
