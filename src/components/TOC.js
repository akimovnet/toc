import React, {useContext} from "react";
import TOCList from "./TOCList";
import {TOCStateContext} from "./TOCProvider";
import styles from "./TOC.module.css";

function TOC() {
  const { error, isLoaded, topLevelIds } = useContext(TOCStateContext);
  return (
    <div className={styles.container}>
      {error
        ? <div>{error.message}</div>
        : !isLoaded
          ? <div>Loading</div>
          : <TOCList ids={topLevelIds} />
      }
    </div>
  );
}

export default TOC;
