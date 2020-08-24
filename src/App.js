import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Landing from "./components/home/Landing";
import Cart from "./components/Cart/Cart";
import Footer from "./components/home/Footer";
import Details from "./components/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/details/:id" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="*" component={Landing} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
