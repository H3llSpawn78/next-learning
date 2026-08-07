import dwarf from "./assets/dwarf.png";
import Header from "./components/Header";

import "./App.css";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Header title="Scenes from the DWARF" logoSrc={dwarf} />
      <Main />
    </>
  );
}

export default App;
