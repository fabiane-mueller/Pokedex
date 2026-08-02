function getcardHtml(pokemonList,i,pokemonIndex){

    return `
     <button id="card${i}" class="card-box" aria-haspopup="dialog" type="button" tabindex="0">
                    <div class="card-header">
                        <h3 id="cardPokemonName${i}" class="card-title">${pokemonList[i].name}</h3>
                        <ul class="type-box" id="type">
                            ${getTypesHtml(pokemonList[i].types)}
                        </ul>
                    </div>
                    <div class="card-footer">
                        <div class="card-number" id="pokemonCardNumber">
                            <p>${pokemonList[i].id}</p>
                        </div>
                        <div class="card-image" id="pokemonCardImage">
                            <img src="${pokemonImagePath + pokemonIndex + ".png"}" alt="Pokemon:">
                        </div>
                    </div>
                </button>
    `
}


function getTypesHtml(types) {
    let html = "";

    for (let i = 0; i < types.length; i++) {
        html += /*html*/`
            <li class="type">${types[i]}</li>
        `;
    }
    return html;
}