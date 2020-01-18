import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from '../Store'

export class Filter extends Component {
  state = {
    tagCLick: 'all',
  }

  activatedTag = async (e) => {
    let stringType = e.target.innerHTML.replace('#', '')
    this.setState({ tagCLick: stringType })
    await Store.setPokemonType(stringType)
    await Store.resetDataAllPokemon()
    Store.fetchAllPokemon(`https://pokeapi.co/api/v2/pokemon?limit=30`)
  }

  render() {
    return (
      <nav className="flex justify-center flex-wrap mt-4 mb-4 w-5/6 sm:w-2/4 lg:w-2/3 mx-auto text-white">
        {Store.pokeType.map((type, index) => (
          <div
            key={index}
            className={`w-auto focus:outline-none ${this.state.tagCLick === type.name ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold m-1 cursor-pointer`}
            onClick={this.activatedTag}
          >
            #{type.name}
          </div>
        ))}
      </nav>
    )
  }
}

export default observer(Filter)
