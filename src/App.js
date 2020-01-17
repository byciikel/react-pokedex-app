import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'
import InfiniteScroll from "react-infinite-scroll-component"
import ContentLoader from "react-content-loader" 
import { css } from "emotion"

import '@/assets/css/tailwind.css'
import '@/assets/css/style.css'

class PokemonCard extends Component {
  state = {
    pokemonType: ['all', 'normal', 'fire', 'water', 'grass', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy'],
    tagCLick: 'all',
    loadImg: 'loading',
  }

  activatedTag = async (e) => {
    let stringType = e.target.innerHTML.replace('#', '')
    this.setState({ tagCLick: stringType })
    await Store.setPokemonType(stringType)
    await Store.resetDataAllPokemon()
    Store.fetchAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=15')
  }

  render() {
    return (
      <div>
        <div className="custom-title w-5/6 sm:w-2/4 lg:w-1/3 mx-auto pt-6 border-b-2 border-red-600 text-center text-5xl text-yellow-500 font-black subpixel-antialiased">
          POKEDEX APP
        </div>
        <div className="p-2 text-center text-lg text-gray-700 antialiased">
          Select your favorite pokemon partner.
        </div>
    
        <nav className="flex justify-center flex-wrap mt-4 mb-4 w-5/6 sm:w-2/4 lg:w-2/3 mx-auto text-white">
          {this.state.pokemonType.map((type, index) => (
            <div
              key={index}
              className={`w-auto ${this.state.tagCLick === type ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold m-1 cursor-pointer`}
              onClick={this.activatedTag}
            >
              #{type}
            </div>
          ))}
        </nav>

        <div className="flex justify-center flex-wrap p-10 py-0">
          {Store.dataAllPokemon ? 
            Store.dataAllPokemon.map((pokemon, index) => (
              <div key={index} className="flex-initial w-48 rounded-lg overflow-hidden shadow-lg bg-white hover:bg-gray-200 m-5 cursor-pointer">
                <div
                  className={css`
                    background-image: url(${pokemon.sprites.front_default});
                    background-repeat: no-repeat;
                    background-position: center; `
                    + " w-48 h-32 mx-auto pt-3"
                  }
                />
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

class CardLoader extends Component {
  render() {
    return (
      <ContentLoader height={500} width={480} speed={1}>
        <rect x="0" y="0" width="480" height="250" />
        <rect x="65" y="280" rx="3" ry="3" width="350" height="60" /> 
        <rect x="140" y="380" rx="30" ry="30" width="200" height="60" /> 
      </ContentLoader>
    )
  }
}

class Body extends Component {
  componentDidMount = () => {
    Store.fetchAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=15')
  }

  fetchMorePokemon = () => {
    Store.fetchAllPokemon(Store.urlNextGet)
  }

  render() {
    let numberLoading = [1, 2, 3, 4, 5]

    return (
      <InfiniteScroll
        dataLength={Store.dataAllPokemon.length}
        next={this.fetchMorePokemon}
        hasMore={true}
        loader={
          <div className="flex justify-center flex-wrap p-10 pt-0">
            {numberLoading.map(key => (
              <div key={key} className="flex-initial w-48 h-62 rounded-lg overflow-hidden shadow-lg bg-white m-5">
                <CardLoader/>
              </div>
            ))}
          </div>
        }
        endMessage={
          <div className="bg-none text-center py-4 lg:px-4">
            <div className="p-2 bg-red-600 items-center leading-none text-white text-center rounded-full flex inline-flex" role="alert">
              <span className="capitalize px-2 py-1 text-xs font-bold">it's all pokemon we have</span>
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