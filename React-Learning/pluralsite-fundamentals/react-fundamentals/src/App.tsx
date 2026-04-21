import { Children, useState } from "react";
import reactLogo from "/src/assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header.js";
import HouseList from "./components/HouseList.js";

function App() {
  return (
    <>
      <Header
        logoUrl={reactLogo}
        headerText="React fundamentals"
        ctaText="Click me"
        ctaUrl="https://www.google.com"
      />
      <HouseList />
    </>
  );
}

export default App;
