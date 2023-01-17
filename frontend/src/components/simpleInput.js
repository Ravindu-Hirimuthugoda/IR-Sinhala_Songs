import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import Tile from "./tile";
import DropDown from "./dropDown";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [modelId, setModelId] = useState("");
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [singers, setSingers] = useState([]);
  const [composers, setComposers] = useState([]);
  const [lyricists, setLyricists] = useState([]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  useEffect(()=>{
    async function fetchAllSongs() {
      const res = await fetch("http://localhost:5000/all");
      const data = await res.json();
      // console.log(data);
      setSongs(data.hits);
    };
    async function fetchAllGenres() {
      const res = await fetch("http://localhost:5000/filters");
      const data = await res.json();
      setGenres(data.aggs.genre_filter.buckets);
      setSingers(data.aggs.singer_filter.buckets);
      setComposers(data.aggs.composer_filter.buckets);
      setLyricists(data.aggs.lyricist_filter.buckets);
    }
    fetchAllSongs();
    fetchAllGenres();
  },[])

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    // console.log(enteredName);
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

  const onClickHandler = (id)=>{
    setOpen(true);
    setModelId(id);
  }

  const onCloseHandler = ()=>{
    setOpen(false);
    setModelId("");
  }

  
  const tiles = songs.map((song) => {
    return (
      <div key={song._id}>
        <Tile onclickHandler = {()=>onClickHandler(song._id)} onCloseHandler = {()=>onCloseHandler()} isOpen = {isOpen} modelId={modelId} details={song}/>
      </div>
    );
  });

  const genreHandler = async (event) => {
    // console.log(event.target.value);
    if(event.target.value !== 'Genre'){
      const response = await fetch("http://localhost:5000/genre", {
        method: "POST",
        body: JSON.stringify({ query: event.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data.hits);
      setSongs(data.hits);
    }
  };

  const singerHandler = async (event) => {
    // console.log(event.target.value);
    if (event.target.value !== "Singer") {
      const response = await fetch("http://localhost:5000/genre", {
        method: "POST",
        body: JSON.stringify({ query: event.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data.hits);
      setSongs(data.hits);
    }
  };

  const composerHandler = async (event) => {
    // console.log(event.target.value);
    if (event.target.value !== "Composer") {
      const response = await fetch("http://localhost:5000/genre", {
        method: "POST",
        body: JSON.stringify({ query: event.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data.hits);
      setSongs(data.hits);
    }
  };

  const lyricistHandler = async (event) => {
    // console.log(event.target.value);
    if (event.target.value !== "Lyricist") {
      const response = await fetch("http://localhost:5000/genre", {
        method: "POST",
        body: JSON.stringify({ query: event.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data.hits);
      setSongs(data.hits);
    }
  };



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
      <div className="dropDownRow">
        <DropDown
          key="genre"
          name="Genre"
          optionList={genres}
          onChange={genreHandler}
        />
        <DropDown
          key="singer"
          name="Singer"
          optionList={singers}
          onChange={singerHandler}
        />
        <DropDown
          key="composer"
          name="Composer"
          optionList={composers}
          onChange={composerHandler}
        />
        <DropDown
          key="lyricist"
          name="Lyricist"
          optionList={lyricists}
          onChange={lyricistHandler}
        />
      </div>
      <div>{tiles}</div>;
    </Fragment>
  );
};

export default SimpleInput;
