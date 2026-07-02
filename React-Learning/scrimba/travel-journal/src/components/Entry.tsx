const currentDate = new Date();
const time = currentDate.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

export default function Entry(props: any) {
  return (
    <article className="journal-entry">
      <div className="journal-entry__image-wrapper">
        <img
          src={props.img.src}
          alt={props.img.alt}
          className="journal-entry__image"
        />
      </div>
      <div className="journal-entry__info-wrapper">
        <div className="journal-entry__header">
          <span className="journal-entry__header-location">
            <img
              className="journal-entry__header-location-icon"
              src="./src/assets/marker.svg"
              alt="marker icon"
            />
            <h2 className="journal-entry__header-location-name">
              {props.country}
            </h2>
            <a
              href={props.googleMapsLink}
              className="journal-entry__header-location-link"
            >
              View on Google Maps
            </a>
          </span>
        </div>
        <div className="journal-entry__body">
          <h3 className="journal-entry__body-title">{props.title}</h3>
          <span className="journal-entry__body-dates">
            {props.dates} - {time}
          </span>
          <p className="journal-entry__body-text">{props.text}</p>
        </div>
      </div>
    </article>
  );
}
