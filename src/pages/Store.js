import { decorate, action, observable } from 'mobx'

class Store {
  pokeType = [
    { name: 'all', color: 'EDf2f7' },
    { name: 'normal', color: '#a8a878' },
    { name: 'fire', color: '#f08030' },
    { name: 'water', color: '#6890f0' },
    { name: 'grass', color: '#78c850' },
    { name: 'flying', color: '#a890f0' },
    { name: 'fighting', color: '#c03028' },
    { name: 'poison', color: '#a040a0' },
    { name: 'electric', color: '#f8d030' },
    { name: 'ground', color: '#e0c068' },
    { name: 'rock', color: '#b8a038' },
    { name: 'psychic', color: '#f85888' },
    { name: 'ice', color: '#98d8d8' },
    { name: 'bug', color: '#a8b820' },
    { name: 'ghost', color: '#705898' },
    { name: 'steel', color: '#b8b8d0' },
    { name: 'dragon', color: '#7038f8' },
    { name: 'dark', color: '#705848' },
    { name: 'fairy', color: '#ee99ac' },
  ]

  fetchAllPokemon(url) {
    return fetch(url, {
      method: 'GET'
    }).then(
      res => res.json()
    ).then(
      (result) => {
        if (result.next) {
          this.getPokemonData(result.results)
          this.setNextGet(result.next)
          this.setEndScroll(true)
        } else {
          this.getPokemonData(result)
          this.setEndScroll(false)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async getPokemonData(data) {
    let resultAllPokemon = []
    let AllPokemon = await data
    let stringType = this.pokemonType

    for (let i=0; i<AllPokemon.length; i++) {          
      let pokemon = await this.fetchPokemonByUrl(AllPokemon[i].url)
      resultAllPokemon.push({
        id: pokemon.id,
        name: pokemon.name,
        weight: pokemon.weight,
        height: pokemon.height,
        sprites: pokemon.sprites,
        types: pokemon.types,
        abilities: pokemon.abilities,
      })
    }

    if (stringType === 'all') {
      this.setDataAllPokemon(resultAllPokemon)
    } else {
      this.setPokemonType(stringType)
      let filteredPokemon = resultAllPokemon.filter(a =>
        a.types.some(b =>
          b.type.name === stringType
        )
      )

      this.setTempDataPokemon(filteredPokemon)

      if (filteredPokemon.length !== 0) {
        if (this.tempDataPokemon.length < 4) {
          this.fetchAllPokemon(this.urlNextGet)
        } else {
          this.setFilteredPokemon(this.tempDataPokemon)
        }
      } else {
        this.fetchAllPokemon(this.urlNextGet)
      }
    }
  }

  setEndScroll(bool) {
    this.endScroll = bool
  }

  endScrool = true

  setDataAllPokemon(datas) {
    this.dataAllPokemon = this.dataAllPokemon.concat(datas)
  }

  setFilteredPokemon(datas) {
    this.dataAllPokemon = datas
  }

  setTempDataPokemon(datas) {
    this.tempDataPokemon = this.tempDataPokemon.concat(datas)
  }

  resetDataAllPokemon() {
    this.dataAllPokemon = []
    this.tempDataPokemon = []
  }

  dataAllPokemon = []
  tempDataPokemon = []

  setNextGet(url) {
    this.urlNextGet = url
  }

  setPokemonType(type) {
    this.pokemonType = type
  }

  urlNextGet = []

  pokemonType = 'all'

  fetchPokemonByUrl(url) {
    return fetch(url, {
      method: 'GET'
    }).then(
      res => res.json()
    ).then(
      (result) => {
        return result
      },
      (error) => {
        console.log(error)
      }
    )
  }

  setDetailPokemon(datas) {
    this.detailPokemon = datas
  }

  detailPokemon = []

  setStatusModal(e) {
    this.statusModal = e
  }

  statusModal = false
}

decorate(Store, {
  pokeType: observable,
  fetchAllPokemon: observable,
  setEndScroll: action,
  endScroll: observable,
  setDataAllPokemon: action,
  resetDataAllPokemon: action,
  dataAllPokemon: observable,
  urlNextGet: observable,
  setPokemonType: action,
  pokemonType: observable,
  setDetailPokemon: action,
  detailPokemon: observable,
  setStatusModal: action,
  statusModal: observable,
})

const NewStore = new Store()

export default NewStore