import React from 'react'
import { css } from 'emotion'

import '@/css/tailwind.css'

function App() {
  return (
    <div>
      <div class="w-1/6 mx-auto pt-6 border-b-2 border-red-600 text-center text-2xl text-orange-300 font-black subpixel-antialiased">POKODEX APP</div>
      <div class="p-2 text-center text-lg text-gray-700">Select your favorite pokemon partner.</div>
  
      <nav class="flex justify-center flex-wrap mt-4 mb-8 text-white">
        <div class="inline-block bg-gray-200 hover:bg-red-600 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">#grass</div>
      </nav>

    </div>
  )
}

export default App;
