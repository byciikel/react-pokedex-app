import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'

import '@/css/tailwind.css'
import '@/css/style.css'

class App extends Component {
  componentDidMount = () => {
    Store.fetchAllPokemon()
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
              <div key={index} className="flex-initial w-48 rounded overflow-hidden shadow-lg bg-white hover:bg-gray-200 m-5 cursor-pointer">
                <img className="w-auto mx-auto" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className="px-4 py-2 pb-0">
                <div className="font-bold text-sm mb-2 text-center">{pokemon.name}</div>
                </div>
                <div className="px-4 py-2 pt-0 text-center">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 m-1">#ground</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 m-1">#grass</span>
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

export default observer(App)