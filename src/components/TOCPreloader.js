import React from "react";
import styles from "./TOCPreloader.module.css";

function TOCPreloader() {
  return (
    <ul className={styles.container}>
      {[...Array(10)].map((item, index) =>
        <li key={index} className={styles['item' + index]}></li>
      )}
    </ul>
  );
}

export default TOCPreloader;
