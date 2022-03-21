//Chamando a API
var id = 1

//Funções Assíncronas
//Chamando a API pela Geração
async function getPokemonIdByGeneretion(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}`)
    const data = await response.json()
    return data.pokemon_species
  } catch (error) {
    console.error(error)
  }
}

async function getAllPokemon(pokemon) {
  try {
    const responsePokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    )
    var data = responsePokemon.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

//fuctions
function getTypePokemon(pokemonTypes) {
  return pokemonTypes
    .map(typeInfo => {
      let type = typeInfo.type.name
      return type
    })
    .join(' | ')
}

function getAbilitiesPokemon(abilities) {
  return abilities.reduce((acc, abilityInfo) => {
    acc += `<li> ${abilityInfo.ability.name}</li>`
    return acc
  }, '')
}

function getStatsPokemon(stats) {
  return stats.reduce((acc, statsInfo) => {
    acc += `<li>${statsInfo.stat.name}: ${statsInfo.base_stat}</li>`
    return acc
  }, '')
}
const PokemonId = getPokemonIdByGeneretion(id)

PokemonId.then(values => {
  var pokemons = values.map(pokemonsID => {
    let pokemon = pokemonsID.name
    return getAllPokemon(pokemon)
  })

  Promise.all(pokemons).then(pokemonList => {
    const main = document.querySelector('main')
    const pokemon = pokemonList.reduce((accumulator, pokemon) => {
      accumulator += `
      <img src="${pokemon.sprites.front_default}" alt="">
      <p>ID: ${pokemon.id} </p>
      <p>Pokemon: ${pokemon.name} </p>
      <p>Type: ${getTypePokemon(pokemon.types)} </p>
      <p>Habilidades: </p>
      <ul>${getAbilitiesPokemon(pokemon.abilities)}</ul>
      <p>Stats</p>
      <ul>${getStatsPokemon(pokemon.stats)}</ul>
      <br/>`
      return accumulator
    }, '')

    main.innerHTML = pokemon
  })
})
