const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonLimitPath = "?limit=";
let pokemonLimit = 12;
const pokemonOffsetPath = "&offset=";
let pokemonOffset = 0;
const pokemonImagePath =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const pokemonUrl =
  pokemonBaseUrl +
  pokemonLimitPath +
  pokemonLimit +
  pokemonOffsetPath +
  pokemonOffset;

let pokemonList = [];

async function init() {
  await catchBase();
}

async function catchBase() {
  let response = await fetch(pokemonUrl);
  let responseToJson = await response.json();
  let baseResults = responseToJson.results;
  catchDetails(baseResults);
}

async function catchDetails(baseResults) {
  for (let i = 0; i < baseResults.length; i++) {
    const pokemonDetailUrl = baseResults[i].url;
    let response = await fetch(pokemonDetailUrl);
    let responseToJson = await response.json();
    let pokemon = {};
    pokemon.name = [];
    pokemon.name = responseToJson.name;
    pokemon.id = responseToJson.id;
    pokemon.height = responseToJson.height;
    pokemon.weight = responseToJson.weight;
    catchTypes(responseToJson, i, pokemon);
    catchStats(responseToJson, i, pokemon);
    catchSpecies(responseToJson, pokemon);
    catchAbilities(responseToJson, i, pokemon)
    pokemonList.push(pokemon);
  }
  renderPokemon();
}

function catchAbilities(responseToJson, i, pokemon){
   pokemon.abilities = [];
    for (let i = 0; i < responseToJson.abilities.length; i++) {
      pokemon.abilities.push(responseToJson.abilities[i].ability.name);
    }
}

function catchTypes(responseToJson, i, pokemon){
   pokemon.types = [];
    pokemon.types = responseToJson.types;
    pokemon.types = [];
    for (let i = 0; i < responseToJson.types.length; i++) {
      pokemon.types.push(responseToJson.types[i].type.name);
    }
}

function catchStats(responseToJson, i, pokemon) {
    pokemon.stats = [];

    for (let i = 0; i < responseToJson.stats.length; i++) {
        pokemon.stats.push({
            name: responseToJson.stats[i].stat.name,
            value: responseToJson.stats[i].base_stat
        });
    }
}

async function catchSpecies(responseToJson, pokemon) {
  let speciesUrl = responseToJson.species.url;
  let response = await fetch(speciesUrl);
  let responseToJsonSpecies = await response.json();
  pokemon.eggGroup = [];
  for (let i = 0; i < responseToJsonSpecies.egg_groups.length; i++) {
    pokemon.eggGroup.push(responseToJsonSpecies.egg_groups[i].name);
  }
}


function backgrounds(pokemon, i) {
  const background = document.getElementById(`card${i}`);
 
  if (pokemon.types.includes("fire")) {
    background.classList.add("fire-card");
  }
  if (pokemon.types.includes("water")) {
    background.classList.add("aqua-card");
  }
  if (pokemon.types.includes("electric")) {
    background.classList.add("electric-card");
  }
  if (pokemon.types.includes("grass")) {
    background.classList.add("grass-card");
  }
  if (pokemon.types.includes("bug")) {
    background.classList.add("grass-card");
  }
  if (pokemon.types.includes("stone")) {
    background.classList.add("stone-card");
  }
}


function renderPokemon() {
  const cardRef = document.getElementById("cards");
  for (let i = 0; i < pokemonList.length; i++) {
    const pokemonIndex = i + 1;
    const pokemonImage = pokemonImagePath + pokemonIndex + ".png";
    cardRef.innerHTML += getcardHtml(pokemonList, i, pokemonIndex);
    const pokemon = pokemonList[i];
    backgrounds(pokemon, i);
  }
}

const dialogRef = document.getElementById("dialog");

function openDialog(i) {
  dialogRef.showModal();
  renderDialog(i);
}

function renderDialog(i) {
  console.log(pokemonList);
  backgroundImage(i);
  
  dialog.innerHTML = getDialogHtml(i);
  console.log(pokemonList);
}

function closeDialog() {
  dialogRef.close();
}



function backgroundImage(i){
  const cls = ["grass-dialog", "fire-dialog", "aqua-dialog", "stone-dialog", "electric-dialog"]
 if (pokemonList[i].types.includes("fire")) {
    dialogRef.classList.remove(...cls);
    dialogRef.classList.add("fire-dialog");
  }
  if (pokemonList[i].types.includes("grass")) {
    dialogRef.classList.remove(...cls);
    dialogRef.classList.add("grass-dialog");
  }
   if (pokemonList[i].types.includes("bug")) {
    dialogRef.classList.remove(...cls);
    dialogRef.classList.add("grass-dialog");
  }
  if (pokemonList[i].types.includes("water")) {
    dialogRef.classList.remove(...cls);
    dialogRef.classList.add("aqua-dialog");
  }
  if (pokemonList[i].types.includes("stone")) {
    dialogRef.classList.remove(...cls);
    dialogRef.classList.add("stone-dialog");
  }
   if (pokemonList[i].types.includes("electric")) {
    dialogRef.classList.remove(...cls);
    dialogRef.classList.add("electric-dialog");
  }
}

function nextPokemon(i){
 

  if(i +1 < pokemonList.length){
     i++;
  }
  else{
    i =0;
  }

renderDialog(i);
}

function loadMore(){
  pokemonLimit += 12;
  pokemonOffset += 12;
  renderPokemon();
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
