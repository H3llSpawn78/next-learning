export default function Header(props: any) {
  return (
    <header className="header">
      <img src={props.logoSrc} alt="logo" />
      <h1>{props.title}</h1>
    </header>
  );
}
