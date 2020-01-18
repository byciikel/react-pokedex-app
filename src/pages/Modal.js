import React, { Component } from 'react'

export class Modal extends Component {
  render() {
    return (
      <div className="modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Simple Modal!</p>
            </div>

            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>

            <div className="flex justify-end pt-2">
              <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
