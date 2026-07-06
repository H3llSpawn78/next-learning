import "./App.css";
import Header from "./components/Header";
import Entry from "./components/Entry";
import data from "./data";

function App() {
  const entries = data.map((entry) => (
    <Entry
      key={entry.id}
      // Passing in individual object props
      // img={entry.img}
      // title={entry.title}
      // country={entry.country}
      // googleMapsLink={entry.googleMapsLink}
      // dates={entry.dates}
      // text={entry.text}

      // Passing in the entiore object -
      // must append the prop decs in the component to use 'props.entry.img etc
      //entry={entry}

      // Pass in the entire object using the spread operator -
      // no need to append the dec props on the component with 'props.entry.img' etc
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
