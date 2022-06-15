//Chamando a API
let id = 1;

//Funções Assíncronas

async function getTypes(){
  try {
    const types = await fetch(
      `https://pokeapi.co/api/v2/type/`
    ).then(response => {
      return response.json()
    })
    return types.results;
  } catch (error) {
    console.error(error)
  }
}

//Chamando a API pela Geração
async function getPokemonIdByGeneretion() {
  try {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=9&offset=2`
    ).then(response => {
      return response.json()
    })
    return pokemon.results
  } catch (error) {
    console.error(error)
  }
}

async function getAllPokemon(pokemonId) {
  try {
    const responsePokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    ).then(response => {
      return response.json()
    })
    return responsePokemon
  } catch (error) {
    console.error(error)
  }
}

//fuctions
function getTypePokemon(pokemonTypes) {
  let acc;
  pokemonTypes.forEach( (typeInfo) => { 
    acc == null ?(
      acc = `<div class="type-pokemon ${typeInfo.type.name}">${typeInfo.type.name}</div>`
    ) :
    (
      acc += `<div class="type-pokemon ${typeInfo.type.name}">${typeInfo.type.name}</div>`
    )
  });
  return acc;
}

function getAllTypes(types){

 
  
  Promise.resolve(types).then(typeList =>{

    const run = document.querySelector('.check-type-pokemon');
    const type =
    typeList.reduce((acc, type) =>{
        acc += `
        <div class="check-container">
        <input type="checkbox" name="${type.name}" value="${type.name}" />
        <label>${type.name}</label>
        </div>`;

        return acc;
    }, '');

    run.innerHTML = type
  })
    
}

function getAbilitiesPokemon(abilities) {
  return abilities.reduce((acc, abilityInfo) => {
    acc += `<span class="ability"> ${abilityInfo.ability.name}</span>`
    return acc
  }, '')
}

function getStatsPokemon(stats) {
  return stats.reduce((acc, statsInfo) => {
    if(statsInfo.stat.name == 'attack' || statsInfo.stat.name == 'defense' )
    acc += ` <div>
                <div class="stat-base">
                  <span>${statsInfo.base_stat}</span>
                </div>
                <div class="stat-name">
                  <span>${statsInfo.stat.name}</span>
                </div>  
              </div>`
    return acc
  }, '')
}

function getImage(id) {
  let image
  if (id > 99) {
    image = id
  } else if (id > 9) {
    image = '0' + id
  } else {
    image = '00' + id
  }

  return image
}

async function createPokemon(PokemonId) {
  try {
    await PokemonId.then(values => {
      let pokemons = values.map(pokemonsID => {
        let pokemon = pokemonsID.name
        return getAllPokemon(pokemon)
      })

      Promise.all(pokemons).then(pokemonList => {
        const run = document.querySelector('.pokemon-grid');
        const pokemon = pokemonList.reduce((accumulator, pokemon) => {
          accumulator += `
        <div class="pokemon-card">  
          <div class="pokemon-image ${pokemon.types[0].type.name}">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImage(pokemon.id)}.png" alt="Foto do pokemons ${pokemon.name}">
          </div>
          <div class="pokemons-data">
            <h5 class="pokemon-title">${pokemon.name}</h5>
            <div class="pokemon-stats">${getStatsPokemon(pokemon.stats)}</div>
            <div class="pokemon-types">${getTypePokemon(pokemon.types)}</div>
          </div>
        </div>
        `
          return accumulator
        }, '')
        
        
        run.innerHTML = pokemon
      })
    })
  } catch (error) {
    console.error(error)
  }
}
const PokemonId = getPokemonIdByGeneretion()

const filterTypes = getTypes()
getAllTypes(filterTypes)
createPokemon(PokemonId)
