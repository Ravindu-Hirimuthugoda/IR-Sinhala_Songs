import React from "react";
import classes from "./tile.module.css";
import Modal from "./modal";

const Tile = (props) => {
  return (
    <>
      <div className={classes.tile} onClick={() => props.onclickHandler()}>
        <div className={classes.row}>
          <h3>{props.details._source.songTitle}</h3>
        </div>
        <div className={classes.row}>
          <h3>{props.details._source.singer}</h3>
        </div>
      </div>
      {props.isOpen && props.modelId === props.details._id && (
        <Modal
          onClickHandler={() => props.onCloseHandler()}
          details={props.details._source}
        />
      )}
    </>
  );
};

export default Tile;
