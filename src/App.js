import React from "react";
import Navbar from "./components/header/Navbar";
import Landing from "./components/home/Landing";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
