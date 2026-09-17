import React from "react";
import ReactMarkdown from "react-markdown";
type ScriptSectionProps = {
  script: string | null;
};

const ScriptSection = React.forwardRef<HTMLElement, ScriptSectionProps>(
  ({ script }, ref) => (
    <section style={{ marginTop: "20px" }} ref={ref}>
      <h2>Here's your script:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown>{script || "No script generated yet."}</ReactMarkdown>
      </article>
    </section>
  ),
);
export default ScriptSection;
