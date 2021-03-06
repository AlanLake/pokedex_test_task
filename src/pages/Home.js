import React, { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [loading, setLoading] = useState(true);
  const mainUrl = `https://pokeapi.co/api/v2/pokemon/`;
  useEffect(() => {
    async function getData() {
      let response = await getAllPokemons(mainUrl);
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
    <p className="loading">
      <b>Loading...</b>
    </p>
  ) : (
    <div>
      <div className="cards">
        {pokemon.map((pokemon, i) => {
          return <Pokemon key={i} pokemon={pokemon} />;
        })}
      </div>
      <div className="nav-buttons">
        <button onClick={prev}>Previous page</button>
        <button onClick={next}>Next page</button>
      </div>
    </div>
  );
}
