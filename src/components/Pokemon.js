import React from "react";
import { Link } from "react-router-dom";

export default function Pokemon({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="card">
      <img src={pokemon.sprites.front_default} alt="" />
      <p>{pokemon.name}</p>
    </Link>
  );
}
