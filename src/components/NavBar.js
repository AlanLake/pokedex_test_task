import React from 'react'
import {Link} from 'react-router-dom'
export default function NavBar() {


    return (
      <div className="navbar">
        <div className='navbar__links'>
          <Link to="/">Home</Link>
          <Link to="/pokemonList">PokeList</Link>
        </div>
      </div>
    );
}
