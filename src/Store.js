import { decorate, action, observable } from 'mobx'

class Store {
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
      resultAllPokemon.push(pokemon)
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

      if (filteredPokemon.length !== 0) {
        this.setDataAllPokemon(filteredPokemon)
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

  resetDataAllPokemon() {
    this.dataAllPokemon = []
  }

  dataAllPokemon = []

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
}

decorate(Store, {
  fetchAllPokemon: observable,
  setEndScroll: action,
  endScroll: observable,
  setDataAllPokemon: action,
  resetDataAllPokemon: action,
  dataAllPokemon: observable,
  urlNextGet: observable,
  setPokemonType: action,
  pokemonType: observable,
})

const NewStore = new Store()

export default NewStore