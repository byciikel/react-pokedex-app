import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'
import InfiniteScroll from "react-infinite-scroll-component"
import ContentLoader from "react-content-loader" 
import { css } from "emotion"

import Modal from './Modal'

class PokemonCard extends Component {
  state = {
    pokemonType: [
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
    ],
    tagCLick: 'all',
  }

  activatedTag = async (e) => {
    let stringType = e.target.innerHTML.replace('#', '')
    this.setState({ tagCLick: stringType })
    await Store.setPokemonType(stringType)
    await Store.resetDataAllPokemon()
    Store.fetchAllPokemon(`https://pokeapi.co/api/v2/pokemon?limit=30`)
  }

  loadDetailPokemon = (pokemon) => {
    let abilities = []
    let types = []
    let form = [
      { name: pokemon.name },
      { weight: pokemon.weight/10 + ' Kilogram' },
      { height: pokemon.height/10 + ' Meter' },
      { pic: pokemon.sprites.front_default },
    ]
    let evolve = []

    Store.fetchPokemonByUrl(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`).then(async species => {
      pokemon.types.map(e =>
        types.push(e.type.name)  
      )

      pokemon.abilities.map(e =>
        Store.fetchPokemonByUrl(e.ability.url).then(ability =>
          abilities.push({
            name: e.ability.name,
            effect: ability.flavor_text_entries[2].flavor_text
          })
        )
      )

      await Store.fetchPokemonByUrl(species.evolution_chain.url).then(evo => {
        evolve = evo.chain
      })

      let detail = {
        form: form,
        description: species.flavor_text_entries[1].flavor_text,
        types: types,
        abilities: abilities,
        evolve: evolve,
      }

      Store.setDetailPokemon(detail)
    })
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

        <Modal/>

        <nav className="flex justify-center flex-wrap mt-4 mb-4 w-5/6 sm:w-2/4 lg:w-2/3 mx-auto text-white">
          {this.state.pokemonType.map((type, index) => (
            <div
              key={index}
              className={`w-auto focus:outline-none ${this.state.tagCLick === type.name ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold m-1 cursor-pointer`}
              onClick={this.activatedTag}
            >
              #{type.name}
            </div>
          ))}
        </nav>

        <div className="flex justify-center flex-wrap lg:w-5/6 mx-auto p-10 py-0">
          {Store.dataAllPokemon ? 
            Store.dataAllPokemon.map((pokemon, index) => (
              <div
                key={index}
                className="flex-initial w-64 sm:w-48 focus:outline-none rounded-lg overflow-hidden shadow-lg bg-white hover:bg-gray-200 m-5 cursor-pointer"
                onClick={() => this.loadDetailPokemon(pokemon)}
              >
                <div
                  className={css`
                    background-image: url(${pokemon.sprites.front_default});
                    background-repeat: no-repeat;
                    background-position: center; `
                    + " w-48 h-32 mx-auto pt-3"
                  }
                />
                <div className="px-4 py-0">
                <div className="font-bold text-sm mb-2 text-center capitalize">
                  {pokemon.name.replace('-', ' ')}
                </div>
                </div>
                <div className="px-4 py-3 pt-0 text-center">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={css`
                        background-color: ${this.state.pokemonType.find(e => e.name === type.type.name).color};`
                        + " inline-block bg-fairy rounded-full px-3 py-1 text-xs font-semibold text-white m-1"
                      }
                    >
                      #{type.type.name}
                    </span>
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
  state = {
    screenSize: []
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
    this.resize()
  }

  resize = () => {
    this.setState({
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.screenSize.width <= 655 ?
          <ContentLoader height={480} width={480} speed={1}>
            <rect x="0" y="0" width="480" height="200" />
            <rect x="65" y="230" rx="3" ry="3" width="350" height="40" /> 
            <rect x="140" y="290" rx="20" ry="20" width="200" height="40" /> 
          </ContentLoader>
        :
          <ContentLoader height={500} width={480} speed={1}>
            <rect x="0" y="0" width="480" height="250" />
            <rect x="65" y="280" rx="3" ry="3" width="350" height="60" /> 
            <rect x="140" y="380" rx="30" ry="30" width="200" height="60" /> 
          </ContentLoader>
        }
      </div>
    )
  }
}

class Body extends Component {
  componentDidMount = () => {
    Store.fetchAllPokemon(`https://pokeapi.co/api/v2/pokemon?limit=12`)
  }

  fetchMorePokemon = () => {
    Store.fetchAllPokemon(Store.urlNextGet)
  }

  render() {
    let numberLoading = [1, 2, 3, 4]

    return (
      <InfiniteScroll
        dataLength={Store.dataAllPokemon.length}
        next={this.fetchMorePokemon}
        hasMore={Store.endScroll}
        loader={
          <div className="flex justify-center flex-wrap p-10 pt-0">
            {numberLoading.map(key => (
              <div key={key} className="flex-initial w-48 h-48 w-64 sm:w-48 rounded-lg overflow-hidden shadow-lg bg-white m-5">
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