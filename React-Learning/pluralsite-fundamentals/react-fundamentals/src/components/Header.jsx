import styles from "./css/Header.module.scss";

const Header = (props) => {
  return (
    <header>
      <div>{props.logo && <img src={props.logo} alt="React Logo" />}</div>
      <div>{props.headerText && <h1>{props.headerText}</h1>}</div>
    </header>
  );
};

export default Header;
