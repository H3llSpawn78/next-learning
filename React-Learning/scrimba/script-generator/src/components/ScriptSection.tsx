import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

type ScriptSectionProps = {
  script: string | null;
};

const ScriptSection = React.forwardRef<HTMLElement, ScriptSectionProps>(
  ({ script }, ref) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [script]);

    return (
      <section style={{ marginTop: "20px" }} ref={ref}>
        <h2>Here's your script:</h2>
        <article className="suggested-recipe-container" aria-live="polite">
          <ReactMarkdown>{script || "No script generated yet."}</ReactMarkdown>
          <div ref={bottomRef} />
        </article>
      </section>
    );
  },
);

export default ScriptSection;
