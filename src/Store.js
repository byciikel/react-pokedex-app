import { decorate, observable } from 'mobx'

class Store {
  fetchAllPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`, {
      method: 'GET'
    }).then(
      res => res.json()
    ).then(
      (result) => {
        this.setDataAllPokemon(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  setDataAllPokemon(datas) {
    this.dataAllPokemon = datas
  }
}

decorate(Store, {
  fetchAllPokemon: observable,
  dataAllPokemon: observable
})

const NewStore = new Store()

export default NewStore