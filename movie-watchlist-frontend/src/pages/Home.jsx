import React from 'react'

function Home() {
  return (
     <header className="bg-white shadow-sm">
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex items-center justify-between h-16">
         <div className="flex-shrink-0">
           <h1 className="text-xl font-bold text-gray-900">
             🎬 Movie Watchlist
           </h1>
         </div>
         <nav className="flex space-x-4">
           <NavLink to="/">Movie List</NavLink>
           {location.pathname !== "/" && (
             <NavLink
               to="/add-movie"
               className="text-blue-500 hover:underline"
             >
               Add Movie
             </NavLink>
           )}
         </nav>
       </div>
     </div>
   </header>
  )
}

export default Home