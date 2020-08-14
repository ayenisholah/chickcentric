import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Landing from "./components/home/Landing";
import Footer from "./components/home/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Cart from "./components/Cart/Cart";
import Details from "./components/Details";
import Default from "./components/Default";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
