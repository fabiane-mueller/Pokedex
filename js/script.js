const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonLimitPath = "?limit=";
const pokemonLimit = 12;
const pokemonOffsetPath = "&offset=";
const pokemonOffset = 0;
const pokemonImagePath =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const pokemonUrl =
  pokemonBaseUrl +
  pokemonLimitPath +
  pokemonLimit +
  pokemonOffsetPath +
  pokemonOffset;

function init() {
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
     cardRef.innerHTML += getcardHtml(i, singlePokemon, pokemonImage);

    catchPokemonDetails(singlePokemon);
  }
}

async function catchPokemonDetails(singlePokemon) {
  const pokemonDetailUrl = singlePokemon.url;

  const response = await fetch(pokemonDetailUrl);
  let responseToJson = await response.json();
  let pokemonArray = [];

  catchAbilities(responseToJson);
  catchBasics(responseToJson);
  catchPokemonSpecies(responseToJson);
  catchTypes(responseToJson)
}

async function catchPokemonSpecies(responseToJson) {
  const speciesUrl = responseToJson.species.url;

  const response = await fetch(speciesUrl);
  let speciesResponse = await response.json();

  console.log(speciesResponse);
}

function catchAbilities(responseToJson) {
  let abilitiesRef = responseToJson;
  let abilityNames = [];
  for (let i = 0; i < responseToJson.abilities.length; i++) {
    abilityNames.push(responseToJson.abilities[i].ability.name);
  }
  console.log(abilityNames);
}

function catchBasics(responseToJson) {
  let basicsRef = responseToJson;
  let basics = [];
  basics.push(responseToJson.height);
  basics.push(responseToJson.weight);
  basics.push(responseToJson.base_experience);
  console.log(basics);
}


function catchTypes(responseToJson) {
  let typesRef = responseToJson;
  let types = [];
  for (let i = 0; i < typesRef.types.length; i++) {
    types.push(responseToJson.types[i].type.name);
  }
  
  console.log(types);
}


function catchFurtherInfos() {}















function openDialogTab(tab) {
  let i;
  const dialogNavRef = document.getElementsByClassName("dialogTab");
  for (i = 0; i < dialogNavRef.length; i++) {
    dialogNavRef[i].style.display = "none";
  }
  const dialogContentRef = document.getElementById(tab);
  dialogContentRef.style.display = "block";
}
