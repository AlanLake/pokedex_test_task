import React, {useState, useEffect, Fragment} from 'react'

export default function SinglePage(props) {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState([])

     useEffect(() => {
       async function getData() {
         let response = await getPokemon(url);
         console.log(response);
         setLoading(false);
       }
       getData();
     }, []);

    const pokemonData = props.match.params.pokemon;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonData}`


    const getPokemon = async (url) => {
           const response = await fetch(url);
           const data = await response.json();
           console.log(data);
           setPokemon(data)
           return data;
    }

    return loading ? (
      <p>Loading...</p>
    ) : (
      <Fragment>
        <img src={pokemon.sprites.front_default} alt="" />
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Type: {pokemon.types[0].type.name}</p>
        {pokemon.stats.map((elem, i) => (
          <div key={i}>
            <p>
              {elem.stat.name} : {elem.base_stat}
            </p>
          </div>
        ))}
        <h2>Abilities: </h2>
        {pokemon.abilities.map((elem, i) => (
          <div key={i}>
            <p>{elem.ability.name}</p>
          </div>
        ))}
      </Fragment>
    );

}
