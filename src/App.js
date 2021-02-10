import logo from "./logo.svg";
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";



function App() {
  

  return (
    <>
      <h1>Pokedex</h1>

      <Pokemon/>
    </>
  );
}

export default App;
