import React, {useContext} from "react";
import TOCPreloader from "./TOCPreloader";
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
          ? <TOCPreloader />
          : <TOCList ids={topLevelIds} />
      }
    </div>
  );
}

export default TOC;
