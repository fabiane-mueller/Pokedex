function getcardHtml(i,singlePokemon,pokemonImage){

    return `
     <button id="card${i}" class="card-box grass-card" aria-haspopup="dialog" type="button" tabindex="0">
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
    `
}