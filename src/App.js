import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'
import InfiniteScroll from "react-infinite-scroll-component"

import '@/css/tailwind.css'
import '@/css/style.css'

class PokemonCard extends Component {
  render() {
    return (
      <div>
        <div className="custom-title w-5/6 sm:w-2/4 lg:w-1/3 mx-auto pt-6 border-b-2 border-red-600 text-center text-5xl text-yellow-500 font-black subpixel-antialiased">
          POKEDEX APP
        </div>
        <div className="p-2 text-center text-lg text-gray-700 antialiased">
          Select your favorite pokemon partner.
        </div>
    
        <nav className="flex justify-center flex-wrap mt-4 mb-8 text-white">
          <div className="inline-block bg-gray-200 hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">
            #grass
          </div>
          <div className="inline-block bg-gray-200 hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">
            #fire
          </div>
        </nav>

        <div className="flex justify-center flex-wrap p-10">
          {Store.dataAllPokemon ? 
            Store.dataAllPokemon.map((pokemon, index) => (
              <div key={index} className="flex-initial w-48 rounded-lg overflow-hidden shadow-lg bg-white hover:bg-gray-200 m-5 cursor-pointer">
                <img className="w-auto mx-auto pt-3" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className="px-4 py-0">
                <div className="font-bold text-sm mb-2 text-center capitalize">{pokemon.name}</div>
                </div>
                <div className="px-4 py-3 pt-0 text-center">
                  {pokemon.types.map((type, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 m-1">#{type.type.name}</span>
                  ))}
                </div>
              </div>
            ))
            : <div/>
          }
        </div>
      </div>
    )
  }
}

class Body extends Component {
  componentDidMount = () => {
    Store.fetchAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')
  }

  fetchMorePokemon = () => {
    Store.fetchAllPokemon(Store.urlNextGet)
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={Store.dataAllPokemon.length}
        next={this.fetchMorePokemon}
        hasMore={true}
        loader={
          <div className="bg-none text-center py-4 lg:px-4">
            <div className="p-2 bg-red-600 items-center leading-none text-white text-center lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex uppercase px-2 py-1 text-xs font-bold">load pokemon ...</span>
            </div>
          </div>
        }
        endMessage={
          <div className="bg-none text-center py-4 lg:px-4">
            <div className="p-2 bg-red-600 items-center leading-none text-white text-center lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex capitalize px-2 py-1 text-xs font-bold">it's all pokemon we have</span>
            </div>
          </div>
        }
      >
        <PokemonCard/>
      </InfiniteScroll>
    )
  }
}

export default observer(Body)