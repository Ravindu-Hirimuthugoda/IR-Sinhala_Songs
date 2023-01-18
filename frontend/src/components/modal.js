import React from "react";
import styles from "./modal.module.css";
import RowItem from "./rowItem";

const Modal = (props) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => props.onClickHandler()} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{props.details.songTitle}</h5>
          </div>
          <RowItem detail="Singer" value={props.details.singer} />
          <RowItem detail="Composer" value={props.details.composer} />
          <RowItem detail="Lyricist" value={props.details.lyricist} />
          <RowItem detail="Genre" value={props.details.genre} />
          <RowItem detail="Metaphors" value={props.details.metaphors} />
          <RowItem detail="Meaning" value={props.details.meaning} />
        </div>
      </div>
    </>
  );
};

export default Modal;
