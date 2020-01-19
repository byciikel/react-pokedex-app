import React from 'react'

export default function Header() {
  return (
    <div>
      <div className="custom-title w-5/6 sm:w-2/4 lg:w-1/3 mx-auto pt-6 border-b-2 border-red-600 text-center text-5xl text-yellow-500 font-black subpixel-antialiased">
        Pokédex App
      </div>
      <div className="p-2 text-center w-5/6 sm:w-2/4 lg:w-2/3 mx-auto text-lg text-gray-700 antialiased">
        The name Pokédex is a portmanteau of Pokémon and index. In the video games, whenever a Pokémon is first caught, its height, weight, species type, and a short description will be added to a player's Pokédex.
      </div>
    </div>
  )
}
