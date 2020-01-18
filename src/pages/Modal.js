import React, { Component } from 'react'
import { css } from "emotion"
import Store from './Store'

export class Modal extends Component {
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

  closeModal = () => {
    Store.setStatusModal(false)
    document.body.style.overflow = 'unset';
  }

  render() {
    return (
      <div className={`${Store.statusModal ? 'overflow-hidden' : 'opacity-0 pointer-events-none'} fixed w-full h-full top-0 left-0 flex items-center justify-center`}>
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        
        <div className="modal-container bg-white w-full lg:w-3/4 lg:h-auto h-screen mx-auto rounded shadow-lg z-50 overflow-y-auto">

          <div className="modal-content p-8 text-center">
            <div className="sm:flex sm:w-11/12 sm:mx-auto">
              <div className="sm:flex-initial">
                <div className={css`
                  background-image: url(${Store.detailPokemon.form.pic});
                  background-repeat: no-repeat;
                  background-position: center;`
                  + " w-24 h-24 rounded-full mx-auto mb-2"
                }/>
              </div>

              <div className="sm:flex-initial sm:text-left sm:px-4">
                <div className="text-2xl capitalize">{Store.detailPokemon.form.name.replace('-', ' ')}</div>
                <div className="text-gray-600 antialiased">{Store.detailPokemon.description}</div>
              </div>
              
            </div>

            {Store.detailPokemon.types.map((type, index) => (
              <span key={index} className={css`
                background-color: ${Store.pokeType.find(e => e.name === type).color};`
                + " inline-block bg-fairy rounded-full px-3 py-1 mt-2 mb-3 text-xs font-semibold text-white m-1"
              }>
                #{type}
              </span>
            ))}

            <div className="w-full h-auto bg-gray-200 my-3 p-2">
              {Store.detailPokemon.abilities.map((ability, index) => (
                <div key={index}>
                  <div className="text-sm text-gray-600 pb-1 capitalize">Ability {index+1}: {ability.name}</div>
                  <div className="text-sm text-gray-600 pb-1">{ability.effect}</div>
                </div>
              ))}
              <div className="text-sm text-gray-600 pb-1">Weight: {Store.detailPokemon.form.weight}</div>
              <div className="text-sm text-gray-600 pb-1">Height: {Store.detailPokemon.form.height}</div>
            </div>

            {this.state.screenSize.width < 640 ?
              <div className="text-1xl antialiased text-red-600">Evolution Pokemon (Top to Bottom)</div>
            :
              <div className="text-1xl antialiased text-red-600">Evolution Pokemon (Left to Right)</div>
            }

            <div className="sm:flex">
              <div className={css`
                background-image: url(});
                background-repeat: no-repeat;
                background-position: center;
                background-color: #000`
                + " w-24 h-24 rounded-full mx-auto my-4 sm:flex-initial"
              }/>
              <div className={css`
                background-image: url(});
                background-repeat: no-repeat;
                background-position: center;
                background-color: #000`
                + " w-24 h-24 rounded-full mx-auto my-4 sm:flex-initial"
              }/>
              <div className={css`
                background-image: url(});
                background-repeat: no-repeat;
                background-position: center;
                background-color: #000`
                + " w-24 h-24 rounded-full mx-auto my-4 sm:flex-initial"
              }/>
            </div>

            <div
              className="md:bottom-0 w-12 mx-auto bg-transparent border-2 border-gray-500 hover:border-red-600 rounded-full p-3 mt-8 cursor-pointer text-gray-600 hover:text-red-600"
              onClick={this.closeModal}
            >
              <svg className="fill-current mx-auto text-center" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
