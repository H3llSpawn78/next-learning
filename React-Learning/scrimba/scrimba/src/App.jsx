import { useState } from "react";
import reactLogo from "/src/assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  console.log(<h1>Testing</h1>); // jsx compiles to React.createElement()... and outputs an object
  return (
    <>
      <Header
        headerLogo={reactLogo}
        headerText="This header test is being passed in as a prop"
      />

      <Footer copyrightText="This footer test is being passed in as a prop" />
    </>
  );
}

export default App;
