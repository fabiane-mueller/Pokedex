const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonLimitPath = "?limit=";
const pokemonLimit = 12;
const pokemonOffsetPath = "&offset=";
const pokemonOffset = 0;
const pokemonImagePath =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const pokemonUrl =   pokemonBaseUrl +  pokemonLimitPath +  pokemonLimit +  pokemonOffsetPath +  pokemonOffset;

let pokemonList = [];



async function init(){
  await catchBase();
}


async function catchBase(){
  let response = await fetch(pokemonUrl);
  let responseToJson = await response.json();
  let baseResults = responseToJson.results;
  console.log(baseResults);
  catchDetails(baseResults);
  
}

async function catchDetails(baseResults){
  for (let i = 0; i < baseResults.length; i++) {
     const pokemonDetailUrl = baseResults[i].url;
     let response = await fetch(pokemonDetailUrl);
     let responseToJson = await response.json();
     console.log(responseToJson);
     let pokemon = {};
     pokemon.name = [];
     pokemon.name = responseToJson.name;
     pokemon.id = responseToJson.id;
     pokemon.types = [];
     pokemon.types = responseToJson.types;
pokemon.types = [];
     for (let i = 0; i < responseToJson.types.length; i++) {
      pokemon.types.push(responseToJson.types[i].type.name);
     }
catchSpecies(responseToJson, pokemon);
     pokemon.height = responseToJson.height;
     pokemon.weight = responseToJson.weight;
     pokemon.abilities = [];
     for (let i = 0; i < responseToJson.abilities.length; i++) {
      pokemon.abilities.push(responseToJson.abilities[i].ability.name);
     }
     pokemon.stats = [];
     for (let i = 0; i < responseToJson.stats.length; i++) {
      pokemon.stats.push(responseToJson.stats[i].base_stat);
      pokemon.stats.push(responseToJson.stats[i].stat.name);
     }
pokemonList.push(pokemon);

  }
renderPokemon()
    console.log(pokemonList);
}

async function catchSpecies(responseToJson,pokemon){
  let speciesUrl = responseToJson.species.url;
  let response = await fetch(speciesUrl);
  let responseToJsonSpecies = await response.json();
console.log(responseToJsonSpecies);
pokemon.eggGroup = [];
     for (let i = 0; i < responseToJsonSpecies.egg_groups.length; i++) {
      pokemon.eggGroup.push(responseToJsonSpecies.egg_groups[i].name);
     }
}



function renderPokemon() {
  const cardRef = document.getElementById("cards");
  for (let i = 0; i < pokemonList.length; i++) {
    const pokemonIndex = i + 1;
    const pokemonImage = pokemonImagePath + pokemonIndex + ".png";
     cardRef.innerHTML += getcardHtml(pokemonList,i,pokemonIndex);
     const pokemon = pokemonList[i];
      backgrounds(pokemon,i);
     }
}

function backgrounds(pokemon, i){
const background = document.getElementById(`card${i}`);
if(pokemon.types.includes("fire")){
  background.classList.add("fire-card")
}
if(pokemon.types.includes("water")){
  background.classList.add("aqua-card")
}
if(pokemon.types.includes("electric")){
  background.classList.add("electric-card")
}
if(pokemon.types.includes("grass")){
  background.classList.add("grass-card")
}
if(pokemon.types.includes("bug")){
  background.classList.add("grass-card")
}
if(pokemon.types.includes("stone")){
  background.classList.add("stone-card")
}

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
