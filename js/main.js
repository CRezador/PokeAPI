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

const PokemonId = getPokemonIdByGeneretion(id)

PokemonId.then(values => {
  var pokemons = values.map(pokemonsID => {
    let pokemon = pokemonsID.name
    return getAllPokemon(pokemon)
  })

  Promise.all(pokemons).then(pokemonList => {
    const main = document.querySelector('main')
    const pokemon = pokemonList.reduce((accumulator, pokemon) => {
      accumulator += `<p> ID: ${pokemon.id} </p>
      <p>Pokemon: ${pokemon.name} </p>
      <p>Type: ${getTypePokemon(pokemon.types)} </p>`
      return accumulator
    }, '')

    main.innerHTML = pokemon
  })
})
