import { useState, useRef } from "react";
import KeywordsList from "./KeywordsList";
import ScriptSection from "./ScriptSection";
import { getScriptFromClaude } from "./ai";

export default function Main() {
  //---------
  // useState
  //---------
  /**
   * 
     * Note: if you ever need the old value of state
     * to help you determine the new value of state,
     * you should pass a callback function to your
     * state setter function instead of using
     * state directly. This callback function will
     * receive the old value of state as its parameter,
     * which you can then use to determine your new
     * value of state.
     e.g.

     // Primitive
    
     const [isGoingOut, setIsGoingOut] = React.useState(false)
    
    function changeMind() {
        setIsGoingOut(isGoingOut => !isGoingOut)
    }
    <button>{isGoingOut ? "Yes" : "No"}</button>

    // Complex state: Arrays
    const [myFavoriteThings, setMyFavoriteThings] = React.useState([])

    const allFavoriteThings = ["💦🌹", "😺", "💡🫖", "🔥🧤", "🟤🎁",
        "🐴", "🍎🥧", "🚪🔔", "🛷🔔", "🥩🍝"]
    const thingsElements = myFavoriteThings.map(thing => <p key={thing}>{thing}</p>)

    function addFavoriteThing() {
        setMyFavoriteThings(
            prevFavThings => [
                ...prevFavThings,
                "Test"
            ]
        )
    }
 // Complex state: Objects
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (212) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })
    
    let starIcon = contact.isFavorite ? starFilled : starEmpty

  
    function toggleFavorite() {
      // Explicit return
        setContact(prevContact => {
            return {
                ...prevContact,
                isFavorite: !prevContact.isFavorite
            }
        })

      // Implicit return
      setContact(prevContact => ({
        ...prevContact,
        isFavorite: !prevContact.isFavorite
      }))
    }
    */

  const [script, setScript] = useState<string | null>(null);

  const scriptSectionRef = useRef<HTMLElement>(null);
  const [scriptShown, setScriptShown] = useState(false);
  async function handleShowScriptClick() {
    const generatedScript = await getScriptFromClaude(keywords);
    setScript(generatedScript);
    setScriptShown(true);
    setTimeout(() => {
      scriptSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  // useEffect(() => {
  //   if (scriptShown) {
  //     scriptSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [scriptShown]);

  const [keywords, setKeywords] = useState<string[]>([]);

  function handleClick() {
    console.log("Clicked!");
  }

  function handleFormClear() {
    setKeywords([]);
    setScriptShown(false);
  }

  // function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log("submitted!", e.currentTarget, e);

  //   const formData = new FormData(e.currentTarget);
  //   // construct an object with all form data - then can retrive using dot notation e.g. allData.keyword.
  //   const allData = Object.fromEntries(formData.entries());
  //   console.log(allData);

  //   const keyword = formData.get("keyword");

  //   if (typeof keyword === "string" && keyword.trim()) {
  //     setKeywords((prevKeywords) => [...prevKeywords, keyword]);
  //   }

  //   e.currentTarget.reset();
  //   console.log(allData.keyword);
  // }

  // This function is the same as the above, however when using the 'action'
  // form attribute we already have access to the formData, so we can achieve the same with less code

  // Example of a function to return various lines of text:
  //  const [messages, setMessages] = React.useState(["a"])
  //  function determineText() {
  //         if (messages.length === 0) {
  //             return "You're all caught up!"
  //         } else if (messages.length === 1) {
  //             return "You have 1 unread message"
  //         } else {
  //             return `You have ${messages.length} unread messages`
  //         }
  //     }

  function formSubmit(formData: FormData) {
    // construct an object with all form data - then can retrive using dot notation e.g. allData.keyword.
    const allData = Object.fromEntries(formData.entries());
    console.log(allData);

    const keyword = formData.get("keyword");

    if (typeof keyword === "string" && keyword.trim()) {
      setKeywords((prevKeywords) => [...prevKeywords, keyword]);
    }
  }
  console.log(import.meta.env.VITE_ANTHROPIC_API_KEY);
  return (
    <main>
      <div className="form-wrapper">
        <h2>
          Enter some keywords to generate a script for a new RED DWARF scene
        </h2>
        <form className="add-ingredient-form" action={formSubmit}>
          <label htmlFor="keyword"></label>
          <input
            type="text"
            aria-label="Add keyword"
            placeholder="e.g. Smeg head"
            id="keyword"
            name="keyword"
          />
          <button onClick={handleClick}>
            <span>&#43;</span> Add keyword
          </button>
          <button type="button" onClick={handleFormClear}>
            Clear
          </button>
        </form>
        {keywords.length > 0 && (
          <KeywordsList
            handleShowScriptClick={handleShowScriptClick}
            keywords={keywords}
          />
        )}
        {scriptShown && (
          <ScriptSection ref={scriptSectionRef} script={script} />
        )}
      </div>
    </main>
  );
}
