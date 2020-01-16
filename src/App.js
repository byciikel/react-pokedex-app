import React from 'react'
import { css } from 'emotion'

import '@/css/tailwind.css'

function App() {
  return (
    <div>
      <div class={css`
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #283593;`
        + 
        " w-1/3 mx-auto pt-6 border-b-2 border-red-600 text-center text-5xl text-yellow-500 font-black subpixel-antialiased"}
      >
        POKODEX APP
      </div>
      <div class="p-2 text-center text-lg text-gray-700 antialiased">
        Select your favorite pokemon partner.
      </div>
  
      <nav class="flex justify-center flex-wrap mt-4 mb-8 text-white">
        <div class="inline-block bg-gray-200 hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">
          #grass
        </div>
        <div class="inline-block bg-gray-200 hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">
          #fire
        </div>
      </nav>

    </div>
  )
}

export default App;
