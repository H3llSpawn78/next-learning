import "./App.css";
import Header from "./components/Header";
import Entry from "./components/Entry";
import data from "./data";

function App() {
  const entries = data.map((entry) => (
    <Entry
      key={entry.id}
      img={{
        src: entry.img.src,
        alt: entry.img.alt,
      }}
      title={entry.title}
      country={entry.country}
      googleMapsLink={entry.googleMapsLink}
      dates={entry.dates}
      text={entry.text}
    />
  ));

  //console.log(data);
  return (
    <>
      <Header />
      <div className="container">{entries}</div>
    </>
  );
}
export default App;
