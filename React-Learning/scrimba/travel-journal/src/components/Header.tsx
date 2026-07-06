export default function Header(props) {
  return (
    <header className="header">
      <div className="header__heading-wrapper">
        <img
          src="/src/assets/globe.svg"
          alt="test logo"
          className="header__heading-logo"
        />
        <h1 className="header__heading-text">{props.text}</h1>
      </div>
    </header>
  );
}
