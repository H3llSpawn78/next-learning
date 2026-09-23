export default function KeywordsList({
  keywords,
  getScript,
  loading,
}: {
  keywords: string[];
  getScript: () => void;
  loading: boolean;
}) {
  const keywordsListItems = keywords.map((keyword) => (
    <li key={keyword}>{keyword}</li>
  ));
  return (
    <section>
      <h2>Keywords on hand:</h2>
      <ul className="keywords-list" aria-live="polite">
        {keywordsListItems}
      </ul>
      {keywords.length > 3 && (
        <div className="get-script-container">
          <div>
            <h3>Ready for a script?</h3>
            <p>Generate a script from your list of keywords.</p>
          </div>
          <button type="button" onClick={getScript} disabled={loading}>
            {loading ? "Generating..." : "Create a script"}
          </button>
        </div>
      )}
    </section>
  );
}
