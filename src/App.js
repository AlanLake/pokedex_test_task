import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import SinglePage from './pages/SinglePage'
import NavBar from './components/NavBar'
import PokeList from "./pages/PokeList";

function App() {
 return (
     <Router>
       <NavBar/>
       <Route exact path='/' component={Home}/>
       <Route exact path='/pokemon/:pokemon' component={SinglePage}/>
       <Route exact path='/pokemonList' component={PokeList}/>
     </Router>

 );
}

export default App;
