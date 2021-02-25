import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PokeList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118`;

  useEffect(() => {
    async function getData() {
      let response = await getAllPokemons(mainUrl);
      setPokemon(response);
      setLoading(false);
    }
    getData();
  }, []);

  const getAllPokemons = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  };
  console.log(pokemon.map((elem) => elem.name));
  return loading ? (
    <p>Loading..</p>
  ) : (
    <div className="list">
      {pokemon.map((elem, i) => {
        return (
          <Link key={i} to={`/pokemon/${elem.name}`}>
            {elem.name}
          </Link>
        );
      })}
    </div>
  );
}
