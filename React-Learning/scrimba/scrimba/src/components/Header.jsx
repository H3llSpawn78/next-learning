const Header = (props) => {
  return (
    <header className="header">
      <div>
        <h1>{props.headerText}</h1>
      </div>
      <div>
        {props.headerLogo && <img src={props?.headerLogo} alt="test logo" />}
      </div>
    </header>
  );
};

export default Header;
