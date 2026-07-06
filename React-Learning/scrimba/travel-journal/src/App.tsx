import "./App.css";
import Header from "./components/Header";
import Entry from "./components/Entry";
import data from "./data";

function App() {
  const entries = data.map((entry) => (
    <Entry
      key={entry.id}
      // img={entry.img}
      // title={entry.title}
      // country={entry.country}
      // googleMapsLink={entry.googleMapsLink}
      // dates={entry.dates}
      // text={entry.text}
      //entry={entry}
      {...entry}
    />
  ));

  //console.log(data);
  return (
    <>
      <Header text="travel journal" />
      <div className="container">{entries}</div>
    </>
  );
}
export default App;
