import React from 'react'

export default function Header() {
  return (
    <div>
      <div className="custom-title w-5/6 sm:w-2/4 lg:w-1/3 mx-auto pt-6 border-b-2 border-red-600 text-center text-5xl text-yellow-500 font-black subpixel-antialiased">
        POKEDEX APP
      </div>
      <div className="p-2 text-center text-lg text-gray-700 antialiased">
        Select your favorite pokemon partner.
      </div>
    </div>
  )
}
