import React, {useContext, useEffect} from "react";
import TOCPreloader from "./TOCPreloader";
import TOCList from "./TOCList";
import {TOCDispatchContext, TOCStateContext} from "./TOCProvider";
import styles from "./TOC.module.css";

function TOC({id}) {
  const { error, isLoaded, topLevelIds } = useContext(TOCStateContext);
  const dispatch = useContext(TOCDispatchContext);

  useEffect(() => {
    if (isLoaded && id) {
      dispatch({ type: 'EXPAND_ANCESTORS', id });
      dispatch({ type: 'SELECT_PAGE', id });
      dispatch({ type: 'EXPAND', id });
    }
  }, [isLoaded, id, dispatch]);

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
