import { decorate, observable } from 'mobx'

class Store {
  fetchAllPokemon(url) {
    fetch(url, {
      method: 'GET'
    }).then(
      res => res.json()
    ).then(
      async (result) => {
        let resultAllPokemon = []
        let AllPokemon = await result.results
        for (let i=0; i<AllPokemon.length; i++) {          
          let pokemon = await this.fetchPokemonByUrl(AllPokemon[i].url)
          resultAllPokemon.push(pokemon)
        }
        console.log(resultAllPokemon)
        this.setNextGet(result.next)
        this.setDataAllPokemon(resultAllPokemon)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  setDataAllPokemon(datas) {
    this.dataAllPokemon = datas
  }

  setNextGet(url) {
    this.urlNextGet = url
  }

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
  dataAllPokemon: observable,
  urlNextGet: observable,
})

const NewStore = new Store()

export default NewStore