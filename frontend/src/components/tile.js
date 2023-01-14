import classes from "./tile.module.css";

const Tile = (props) => {
  return (
    <div className={classes.tile}>
      <div className={classes.row}>
        <h3>{props.songTitle}</h3>
        <h3>:</h3>
        <h3>{props.singer}</h3>
      </div>
    </div>
  );
};

export default Tile;
