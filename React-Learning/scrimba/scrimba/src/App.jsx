import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";

function App() {
  console.log("Loaded");
  return (
    <>
      <Header headerText="Some text coming from a prop" />
    </>
  );
}

export default App;
