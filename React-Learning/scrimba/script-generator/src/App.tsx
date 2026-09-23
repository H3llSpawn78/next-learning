import dwarf from "./assets/dwarf.png";
import Header from "./components/Header";

import "./App.css";
import Main from "./components/Main";
//import FormFieldExamples from "./components/FormFieldExamples";

function App() {
  return (
    <>
      <Header title="Scenes from the DWARF" logoSrc={dwarf} />
      <Main />
      {/*<FormFieldExamples /> */}
    </>
  );
}

export default App;
