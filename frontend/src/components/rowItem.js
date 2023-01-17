import React from "react";
import styles from "./row.module.css";

const RowItem = (props) => {
    const items = Array.isArray(props.value) ? props.value.map((val,i)=>(<li key={i}>{val}</li>)) : <p>{props.value}</p>
    return (
      <div className={styles.rowContent}>
        <div className={styles.container}>
          <p>{props.detail}</p>
        </div>
          <div className={styles.container}>
            {items}
          </div>
      </div>
    );
}

export default RowItem;
