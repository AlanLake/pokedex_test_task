import React, { useState, useEffect } from "react";

export default function SinglePage(props) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getData() {
      await getPokemon(url);
      setLoading(false);
    }
    getData();
  }, []);

  const pokemonData = props.match.params.pokemon;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonData}`;

  const getPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
    return data;
  };

  return loading ? (
    <p className="loading">
      <b>Loading...</b>
    </p>
  ) : (
    <div className="pokemon">
      <img src={pokemon.sprites.front_default} alt="" />
      <p>
        <b>Name</b>: {pokemon.name}
      </p>
      <p>
        <b>Height</b>: {pokemon.height / 10} m
      </p>
      <p>
        <b>Weight</b>: {pokemon.weight / 10} kg
      </p>
      <p>
        <b>Type</b>: {pokemon.types[0].type.name}
      </p>
      {pokemon.stats.map((elem, i) => (
        <div key={i}>
          <p>
            <b>{elem.stat.name}</b> : {elem.base_stat}
          </p>
        </div>
      ))}
      <h2>Abilities: </h2>
      {pokemon.abilities.map((elem, i) => (
        <div key={i}>
          <p>{elem.ability.name}</p>
        </div>
      ))}
    </div>
  );
}
