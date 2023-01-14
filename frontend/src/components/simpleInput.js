import { Fragment, useState } from "react";
import Tile from "./tile";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [songs, setSongs] = useState([]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    console.log(enteredName);
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify({ query: enteredName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data.hits);
    setSongs(data.hits);
  };

  
  const tiles = songs.map((song) => {
    return (
      <div key={song._id}>
        <Tile songTitle={song._source.songTitle} singer={song._source.singer} />
      </div>
    );
  });

  return (
    <Fragment>
      <div className="app">
        <form onSubmit={formSubmissionHandler}>
          <div className="form-control">
            <label htmlFor="name">Enter Search Query</label>
            <input
              type="text"
              id="name"
              onChange={nameInputChangeHandler}
              value={enteredName}
            />
          </div>
          <div className="form-actions">
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div>{tiles}</div>;
    </Fragment>
  );
};

export default SimpleInput;
