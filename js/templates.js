function getcardHtml(pokemonList,i,pokemonIndex){

    return `
     <button data-id="card" id="card${i}" class="card-box" aria-haspopup="dialog" type="button" tabindex="0" onclick="openDialog(${i})">
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
                            <img data-id="card-image" src="${pokemonImagePath + pokemonIndex + ".png"}" alt="Pokemon:${pokemonList[i].name}">
                        </div>
                    </div>
                </button>
    `
}

function getDialogHtml(i){
    const pokemonIndex = i + 1;
    return /*html*/`
        
        <div class="dialog-head">
                    <button role=”button” data-id="close-dialog-button" onclick="closeDialog()" class="back-btn" id="backToAllButton"><img src="./assets/icons/back-arrow.png"
                            alt="Back Arrow"></button>
                </div>
                <div class="dialog-header">
                    <h3 id="dialogPokemonName"  class="dialog-title">${pokemonList[i].name}</h3>
                    <ul class="type-box" id="type">
                            ${getTypesHtml(pokemonList[i].types)}
                    </ul>
                </div>
                <div class="dialog-hero">
                    <button class="sound-btn" id="pokemonCry"><img src="./assets/icons/grass-cry-button.png"
                            alt="Sound Icon"></button>
                            <img data-id="dialog-image" src="${pokemonImagePath + pokemonIndex + ".png"}" alt="Pokemon:${pokemonList[i].name}"  id="pokemonDialogImage" class="dialog-image">
                </div>
                <div class="dialog-content">
                    <div class="dialog-navigation">
                        <button class="" onclick="openDialogTab('about')">About</button>
                        <button class="" onclick="openDialogTab('baseStats')">Base stats</button>
                        <button class="" onclick="openDialogTab('evolution')">Evolution</button>
                    </div>
                    <div id="about" class="dialogTab">
                        <div class="basics-box">
                            <div class="basic-box">
                                <img src="./assets/icons/species.png" alt="Icon Species">
                                <div class="basic-content">
                                    <p id="species">Seed</p>
                                    <p class="basic-desc">Species </p>
                                </div>
                            </div>
                            <div class="basic-box">
                                <img src="./assets/icons/messen.png" alt="Icon Species">
                                <div class="basic-content">
                                    <p id="species">${pokemonList[i].height}"</p>
                                    <p class="basic-desc">Height</p>
                                </div>
                            </div>
                            <div class="basic-box">
                                <img src="./assets/icons/gewicht.png" alt="Icon Species">
                                <div class="basic-content">
                                    <p id="species">${pokemonList[i].weight} lbs</p>
                                    <p class="basic-desc">Weight</p>
                                </div>
                            </div>
                        </div>
                        <div class="star-box">
                            <div class="star-box-content">
                                <img src="./assets/icons/stars.png" alt="Stars Icon">
                                <ul id="abilities" class="abilities-list">
                                    ${getAbilitiesHtml(pokemonList[i].abilities)}
                                </ul>
                                
                            </div>
                            <p>Abilities</p>
                        </div>
                        
                    </div>

                    <div id="baseStats" class="dialogTab active" style="display:none">
                        <div class="stats-box">
                            ${getStatsHtml(pokemonList[i].stats)}
                        </div>
                    </div>

                    <div id="evolution" class="dialogTab" style="display:none">
                        <div class="evolution-box">
                            <div class="evolution-item">
                                <div class="evolution-content">
                                    <h4>Bulbasaur</h4>
                                    <p><span>Nr.</span> 0001</p>
                                </div>
                                <img src="./assets/img/2.png" alt="Bulbasaur">
                            </div>

                            <div class="next-evolution">
                                <div class="evolution-content">
                                    <p class="level-box">@ Level 16</p>
                                </div>
                                <div class="evolution-arrow"><img src="./assets/icons/arrow-down.png"
                                        alt="Arrow Down Icon"></div>
                            </div>
                        </div>
                    </div>
                    

                </div>

                <div class="dialog-bottom-nav" id="dialogBottomNav">
                    <ul>
                        <li><button data-id="prev-button" onclick="prePokemon(${i})"><img src="./assets/icons/prev-btn.png" alt="Previous Icon"></button></li>
                        <li><button data-id="next-button" onclick="nextPokemon(${i})"><img src="./assets/icons/next-btn.png" alt="Next Icon"></button></li>
                    </ul>
                </div>
            
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


function getAbilitiesHtml(abilities){
    let html = "";
    for (let i = 0; i < abilities.length; i++) {
        html += /*html*/`
            <li>${abilities[i]}</li>
        `;
    }
    return html;
}


function getStatsHtml(stats){
    let html = "";
    for (let i = 0; i < stats.length; i++) {
        html += /*html*/`
        <div class="stats-item">
            <label for="file">${stats[i].name}</label>
            <span class="stat-value">${stats[i].value}</span>
            <div class="stat-bar">
                <div class="stat-fill" style="width:${stats[i].value}%"></div>
            </div>
        </div>
        `
        
    }
    return html;
}