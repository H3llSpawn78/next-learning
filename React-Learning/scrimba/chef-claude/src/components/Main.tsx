import { useState } from "react";

export default function Main() {
  //---------
  // useState
  //---------
  /**
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
        setIsGoingOut(prev => !prev)
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

  const [keywords, setKeywords] = useState<string[]>([]);

  const keywordsListItems = keywords.map((keyword) => (
    <li key={keyword}>{keyword}</li>
  ));

  function handleClick() {
    console.log("Clicked!");
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

  function formSubmit(formData: FormData) {
    // construct an object with all form data - then can retrive using dot notation e.g. allData.keyword.
    const allData = Object.fromEntries(formData.entries());
    console.log(allData);

    const keyword = formData.get("keyword");

    if (typeof keyword === "string" && keyword.trim()) {
      setKeywords((prevKeywords) => [...prevKeywords, keyword]);
    }
  }

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
          <button onClick={() => setKeywords([])}>Clear</button>
        </form>
        <ul>{keywordsListItems}</ul>
      </div>
    </main>
  );
}
