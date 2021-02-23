import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import SinglePage from './pages/SinglePage'

function App() {
 return (
     <Router>
       <Route exact path='/' component={Home}/>
       <Route exact path='/pokemon/:pokemon' component={SinglePage}/>
     </Router>

 );
}

export default App;
