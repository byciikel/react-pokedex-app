import React, { Component } from 'react'
import { css } from "emotion"

export class Modal extends Component {
  render() {
    return (
      <div className="modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        
        <div className="modal-container bg-white w-full lg:w-3/4 lg:h-auto h-screen mx-auto rounded shadow-lg z-50 overflow-y-auto">

          <div className="modal-content p-8 text-center">
            <div class="md:flex md:w-11/12 md:mx-auto">
              <div className="md:flex-initial">
                <div className={css`
                  background-image: url(});
                  background-repeat: no-repeat;
                  background-position: center;
                  background-color: #000`
                  + " w-32 h-32 rounded-full mx-auto mb-2"
                }/>
              </div>

              <div className="md:flex-initial md:text-left md:p-4">
                <div className="text-2xl">Pikachu</div>
                <div className="text-gray-600 antialiased">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
              </div>
              
            </div>

            <span className={css`
              background-color: #000;`
              + " inline-block bg-fairy rounded-full px-3 py-1 mt-2 mb-3 text-xs font-semibold text-white m-1"
            }>
              #fire
            </span>

            <div className="w-full h-auto bg-gray-200 my-3 p-2">
              <div className="text-sm text-gray-600 pb-1">Ability: Overglow</div>
              <div className="text-sm text-gray-600 pb-1">Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
              <div className="text-sm text-gray-600 pb-1">Width: 3 meter</div>
              <div className="text-sm text-gray-600 pb-1">Width: 3 kilogram</div>
            </div>

            <div className="md:flex">
              <div className={css`
                background-image: url(});
                background-repeat: no-repeat;
                background-position: center;
                background-color: #000`
                + " w-32 h-32 rounded-full mx-auto my-4 md:flex-initial"
              }/>
              <div className="uppercase my-auto text-red-600 md:flex-initial align-middle">
                evolve to
              </div>
              <div className={css`
                background-image: url(});
                background-repeat: no-repeat;
                background-position: center;
                background-color: #000`
                + " w-32 h-32 rounded-full mx-auto my-4 md:flex-initial"
              }/>
              <div className="uppercase my-auto text-red-600 md:flex-initial align-middle">
                evolve to
              </div>
              <div className={css`
                background-image: url(});
                background-repeat: no-repeat;
                background-position: center;
                background-color: #000`
                + " w-32 h-32 rounded-full mx-auto my-4 md:flex-initial"
              }/>
            </div>

            <div className="md:bottom-0 w-12 mx-auto bg-transparent border-2 border-gray-500 hover:border-red-600 rounded-full p-3 mt-8 cursor-pointer text-gray-600 hover:text-red-600">
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
