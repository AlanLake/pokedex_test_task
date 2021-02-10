import React, { useState, useEffect, Fragment } from "react";

const url = `https://pokeapi.co/api/v2/pokemon/`;

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
    async function getData() {
    await getAllPokemons()
    await getPokemon();
    }
  getData()}, []);

  const getAllPokemons = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  };
  const getPokemon = async () => {
    let data = await getAllPokemons();
    let myArr = []
    await data.map((elem) =>
      fetch(elem.url)
        .then((data) => data.json()).then(result => myArr.push(result))
    );
    console.log(myArr);
    setPokemon(myArr)
  };
  
  // function getPokeType(pokemonState) {
  //   console.log(pokemonState);
  //   let type;
  //   if (!pokemonState) {
  //     type = <span>Loading...</span>;
  //     return type;
  //   } else {
  //     type = pokemonState.types[0].type.name;
  //     return type;
  //   }
  // }
  return pokemon.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div>
      {pokemon.map((elem) => (
        <>
          <p>{elem.name}</p>
          <p>{elem.height}</p>
        </>
      ))}
    </div>
  );
}
