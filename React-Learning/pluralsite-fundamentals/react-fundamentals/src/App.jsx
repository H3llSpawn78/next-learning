import { useState } from "react";
import reactLogo from "/src/assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header
        logo={reactLogo}
        headerText="This header test is being passed in as a prop"
      >
        {/* <div>
          <img src={reactLogo} alt="React Logo" />
          <h1>This a header with child items being passed in as props</h1>
        </div> */}
      </Header>
    </>
  );
}

export default App;
