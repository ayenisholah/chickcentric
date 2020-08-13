import React from "react";
import { Switch, Route } from "react-router-dom";
import AddProducts from "./components/AddProducts";
import Login from "./components/authentication/Login";
import "./App.scss";
import Navbar from "./components/header/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/dashboard" component={AddProducts} />
      </Switch>
    </div>
  );
}

export default App;
