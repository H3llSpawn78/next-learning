import styles from "./scss/Header.module.scss";

const Header = (props: any) => {
  return (
    <>
      <div className={styles.progress}></div>
      <header className={styles.header}>
        <div>
          {props.logoUrl && <img src={props.logoUrl} alt="React Logo" />}
        </div>
        <div>{props.headerText && <h1>{props.headerText}</h1>}</div>
        <div>{props.ctaText && <a href={props.ctaUrl}>{props.ctaText}</a>}</div>
      </header>
    </>
  );
};

export default Header;
