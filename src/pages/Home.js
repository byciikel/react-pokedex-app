import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'
import InfiniteScroll from "react-infinite-scroll-component"

import Modal from './component/Modal'
import PokemonCard from './component/PokemonCard'
import Header from './component/Header'
import Filter from './component/Filter'
import CardLoader from './component/CardLoader'

export class Home extends Component {
  componentDidMount = () => {
    Store.fetchAllPokemon(`https://pokeapi.co/api/v2/pokemon?limit=12`)
  }

  fetchMorePokemon = () => {
    Store.fetchAllPokemon(Store.urlNextGet)
  }

  render() {
    let numberLoading = [1, 2, 3, 4]

    return (
      <div>
        {Store.statusModal ? <Modal/> : <div/>}
        <Header/>
        <Filter/>
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
      </div>
    )
  }
}

export default observer(Home)