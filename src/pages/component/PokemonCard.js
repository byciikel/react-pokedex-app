import React, { Component } from 'react'
import { css } from "emotion"
import { observer } from 'mobx-react'
import Store from '../Store'

export class PokemonCard extends Component {
  loadDetailPokemon = (pokemon) => {
    let abilities = []
    let types = []
    let form = {
      name: pokemon.name,
      weight: pokemon.weight/10 + ' Kilogram',
      height: pokemon.height/10 + ' Meter',
      pic: pokemon.sprites.front_default,
    }

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

      Store.fetchPokemonByUrl(species.evolution_chain.url).then(evo => {
        let dataChain_1 = []
        let dataChain_2 = []
        let dataChain_3 = []
        if (evo.chain) {
          Store.fetchPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${evo.chain.species.name}/`).then(chain_1 => {
            dataChain_1.push({
              name: chain_1.name,
              pic: chain_1.sprites.front_default
            })
          })
  
          if (evo.chain.evolves_to.length > 0) {
            evo.chain.evolves_to.map(e =>
              Store.fetchPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${e.species.name}/`).then(chain_2 => {
                dataChain_2.push({
                  name: chain_2.name,
                  pic: chain_2.sprites.front_default
                })
  
                if (e.evolves_to.length > 0) {
                  e.evolves_to.map(y =>
                    Store.fetchPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${y.species.name}/`).then(chain_3 => {
                      dataChain_3.push({
                        name: chain_3.name,
                        pic: chain_3.sprites.front_default
                      })
  
                      loadDetail({
                        chain_1: dataChain_1,
                        chain_2: dataChain_2,
                        chain_3: dataChain_3,
                      })
                    })
                  )
                } else {
                  loadDetail({
                    chain_1: dataChain_1,
                    chain_2: dataChain_2,
                    chain_3: [],
                  })
                }
              })
            )
          } else {
            loadDetail({
              chain_1: dataChain_1,
              chain_2: [],
              chain_3: [],
            })
          }
        } else {
          loadDetail({
            chain_1: [],
            chain_2: [],
            chain_3: [],
          })
        }
      })

      function loadDetail(evolve) {
        Store.setDetailPokemon({
          form: form,
          description: species.flavor_text_entries.find(e => e.language.name === 'en').flavor_text,
          types: types,
          abilities: abilities,
          evolve: evolve,
        })
        Store.setStatusModal(true)
        document.body.style.overflow = 'hidden';
      }
    })
  }

  render() {
    return (
      <div className="flex justify-center flex-wrap lg:w-5/6 mx-auto p-10 py-0">
        {Store.dataAllPokemon ? 
          Store.dataAllPokemon.map((pokemon, index) => (
            <div
              to="/detail"
              key={index}
              className="flex-initial w-64 sm:w-48 focus:outline-none rounded-lg overflow-hidden shadow-lg bg-white hover:bg-gray-200 m-5 cursor-pointer"
              onClick={() => this.loadDetailPokemon(pokemon)}
            >
              <div className={css`
                background-image: url(${pokemon.sprites.front_default});
                background-repeat: no-repeat;
                background-position: center;`
                + " w-48 h-32 mx-auto pt-3"
              }/>
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
                      background-color: ${Store.pokeType.find(e => e.name === type.type.name).color};`
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
    )
  }
}

export default observer(PokemonCard)
