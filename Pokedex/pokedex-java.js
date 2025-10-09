const pokemonInput = document.getElementById('pokemon'); // El ID 'ciudad' se mantiene del HTML previo para el input
const buscarBtn = document.getElementById('buscar');
const pokemonInfoDiv = document.getElementById('pokemon-info');

buscarBtn.addEventListener('click',()=>{
    const pokemonName = pokemonInput.value.trim();
    if (pokemonName){
        obtenerDatosPokemon(pokemonName);
    } else {
        mostrarError('Por favor, introduce el nombre de un Pokémon')
    }
});

function obtenerDatosPokemon(pokemonName){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

pokemonInfoDiv.innerHTML = '<p> Buscando el Pokémon...</p>';

fetch(url)

.then(response=>{
    if(!response.ok){
        if(response.status === 404){
            throw new Error('Lo sentimos no pudimos encontrar el Pokémon ¿estas seguro de que esta bien escrito su nombre?');
        }
        throw new Error('Error: ${response.status}');
    }
    return response.json();
})

.then(data => mostrarDatosPokemon(data))
.catch(error => mostrarError(error.message));
}

function mostrarDatosPokemon(data){
    const nombrePkmn = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const pokedexId = data.id;
    const imagenSprite = data.sprites.front_default
    const imagenHTML = imagenSprite ? `<img src="${imagenSprite}" alt="${nombrePkmn}">` : '';
    const altura = (data.height/10).toFixed(1);
    const peso = (data.weight/10).toFixed(1);
    let tipos = data.types.map(typeInfo => `<p class = "${typeInfo.type.name} tipo"> ${typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}</p>`);
    const habilidades = data.abilities.map(abilityInfo => abilityInfo.ability.name.replace('-',' ').split('').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''));

    pokemonInfoDiv.innerHTML = `
    <div class = pokedex-card >
        <div class = pokedex-pantalla>
            <h2>${nombrePkmn} #${pokedexId}</h2>
            <div class = pokesprite>${imagenHTML}</div>
            <p class = pokemon-id-backgrnd>#${pokedexId}</p>
            <p><strong>Altura:</strong> ${altura} mts</p>
            <p><strong>Peso:</strong> ${peso} Kg</p>
            <div class =pokemon-types> <p><strong>Tipo(s):</strong></p> ${tipos.join('')}</div>
            <p class = pkmn-habilidades><strong>Habilidades:</strong> ${habilidades.join(', ')}</p>
        </div>
        <div class = pokedex-imag> 
            <img src=https://e1.pxfuel.com/desktop-wallpaper/694/543/desktop-wallpaper-pokedex-template-by-hatirem-pokemon-pokedex-background.jpg alt="imagen pokedex" width="400" height="600"> 
        </div>
    </div>
`;

}

function mostrarError(mensaje) {
    pokemonInfoDiv.innerHTML = `<p style="color: red;">${mensaje}</p>`;
}