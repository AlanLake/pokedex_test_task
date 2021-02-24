import React, { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [loading, setLoading] = useState(true);
  const mainUrl = `https://pokeapi.co/api/v2/pokemon/`;
  useEffect(() => {
    async function getData() {
      let response = await getAllPokemons(mainUrl);
      console.log(response);
      setNextPage(response.next);
      setPrevPage(response.previous);
      await getPokemon(response.results);
      setLoading(false);
    }
    getData();
  }, []);

  const getAllPokemons = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const loadPokemon = async (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  const getPokemon = async (data) => {
    let pokeArr = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonData = await loadPokemon(pokemon.url);
        return pokemonData;
      })
    );

    setPokemon(pokeArr);
  };

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemons(nextPage);
    await getPokemon(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevPage) return;
    setLoading(true);
    let data = await getAllPokemons(prevPage);
    await getPokemon(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setLoading(false);
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cards">
        {pokemon.map((pokemon, i) => {
          return <Pokemon key={i} pokemon={pokemon} />;
        })}
      </div>
      <div className='nav-buttons'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
