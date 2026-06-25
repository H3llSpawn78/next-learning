export default function Entry() {
  return (
    <article className="journal-entry">
      <div className="journal-entry__image-wrapper">
        <img
          src="https://scrimba.com/links/travel-journal-japan-image-url"
          alt="test image"
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
            <h2 className="journal-entry__header-location-name">Japan</h2>
            <a
              href="https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu
"
              className="journal-entry__header-location-link"
            >
              View on Google Maps
            </a>
          </span>
        </div>
        <div className="journal-entry__body">
          <h3 className="journal-entry__body-title">Mount Fuji</h3>
          <span className="journal-entry__body-dates">
            Date: 12 Jan, 2021 - 24 Jan, 2021
          </span>
          <p className="journal-entry__body-text">
            Mount Fuji is the tallest mountain in Japan, standing at 3,776
            meters (12,380 feet). Mount Fuji is the single most popular tourist
            site in Japan, for both Japanese and foreign tourists.
          </p>
        </div>
      </div>
    </article>
  );
}
