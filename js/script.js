const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonLimitPath = "?limit=";
let pokemonLimit = 20;
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
let filteredPokemon = [];
const dialogRef = document.getElementById("dialog");

dialogRef.addEventListener("click", (event) => {
  if (event.target === dialogRef) {
    closeDialog();
  }
});

async function init() {
  await catchBase();
}

async function catchBase() {
  const pokemonUrl =
    pokemonBaseUrl +
    pokemonLimitPath +
    pokemonLimit +
    pokemonOffsetPath +
    pokemonOffset;
  let response = await fetch(pokemonUrl);
  let responseToJson = await response.json();
  let baseResults = responseToJson.results;
  showLoadingSpinner();
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
    catchAll(responseToJson, pokemon);
    pokemonList.push(pokemon);
  }
  disableLoadingSpinner();
  renderPokemon();
}

function catchAll(responseToJson, pokemon) {
  catchTypes(responseToJson, pokemon);
  catchStats(responseToJson, pokemon);
  catchSpecies(responseToJson, pokemon);
  catchAbilities(responseToJson, pokemon);
  catchCries(responseToJson, pokemon);
}

function catchCries(responseToJson, pokemon) {
  pokemon.cry = responseToJson.cries.latest;
}

function catchAbilities(responseToJson, pokemon) {
  pokemon.abilities = [];
  for (let i = 0; i < responseToJson.abilities.length; i++) {
    pokemon.abilities.push(responseToJson.abilities[i].ability.name);
  }
}

function catchTypes(responseToJson, pokemon) {
  pokemon.types = [];
  pokemon.types = responseToJson.types;
  pokemon.types = [];
  for (let i = 0; i < responseToJson.types.length; i++) {
    pokemon.types.push(responseToJson.types[i].type.name);
  }
}

function catchStats(responseToJson, pokemon) {
  pokemon.stats = [];

  for (let i = 0; i < responseToJson.stats.length; i++) {
    pokemon.stats.push({
      name: responseToJson.stats[i].stat.name,
      value: responseToJson.stats[i].base_stat,
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
  cardRef.innerHTML = "";

  let currentList = pokemonList;

  if (filteredPokemon.length > 0) {
    currentList = filteredPokemon;
  }

  for (let i = 0; i < currentList.length; i++) {
    const pokemonIndex = currentList[i].id;

    cardRef.innerHTML += getcardHtml(currentList, i, pokemonIndex);

    const pokemon = currentList[i];
    backgrounds(pokemon, i);
  }
}

function openDialog(i) {
  document.body.style.overflow = "hidden";
  dialogRef.showModal();
  renderDialog(i);
}

function renderDialog(i) {
  backgroundImage(i);

  let currentList = pokemonList;

  if (filteredPokemon.length > 0) {
    currentList = filteredPokemon;
  }

  dialog.innerHTML = getDialogHtml(currentList, i);
}

function closeDialog() {
  document.body.style.overflow = "auto";
  dialogRef.close();
}

function backgroundImage(i) {
  const cls = [
    "grass-dialog",
    "fire-dialog",
    "aqua-dialog",
    "stone-dialog",
    "electric-dialog",
  ];
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

function nextPokemon(i) {
  if (i + 1 < pokemonList.length) {
    i++;
  } else {
    i = 0;
  }

  renderDialog(i);
}

function prePokemon(i) {
  if (i === 0) {
    i = pokemonList.length - 1;
  } else {
    i--;
  }

  renderDialog(i);
}

async function loadMore() {
  pokemonOffset += 20;
  await catchBase();
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

async function showLoadingSpinner() {
  const loadingBtn = document.querySelector(".loading-ani");
  loadingBtn.style.display = "block";
}

function disableLoadingSpinner() {
  const loadingBtn = document.querySelector(".loading-ani");
  loadingBtn.style.display = "none";
}

function filterAndShowNames() {
  const filterWord = document.getElementById("searchbar").value.toLowerCase();
  if (filterWord.length >= 3) {
    filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.includes(filterWord),
    );

    console.log(filteredPokemon);
    renderPokemon();
  } else {
    const cardRef = document.getElementById("cards");
    cardRef.innerHTML = /*html*/ `
    <h3>Keine Pokemon gefunden</h3>
    <button class="loadmore" onclick="renderPokemon()" data-id="load-more-button">
                    
                    <p class="more">neu laden</p>
                </button>
  `;
  }
}

function playCry(i) {
  const audio = new Audio(pokemonList[i].cry);
  audio.play();
}
