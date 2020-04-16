import React, {useContext, useEffect} from "react";
import TOCPreloader from "./TOCPreloader";
import TOCList from "./TOCList";
import {TOCDispatchContext, TOCStateContext} from "./TOCProvider";
import styles from "./TOC.module.css";
import TOCFilter from "./TOCFilter";

function TOC({id, searchString}) {
  const { error, isLoaded, topLevelIds } = useContext(TOCStateContext);
  const dispatch = useContext(TOCDispatchContext);

  useEffect(() => {
    if (isLoaded && id) {
      dispatch({ type: 'EXPAND_ANCESTORS', id });
      dispatch({ type: 'SELECT_PAGE', id });
      dispatch({ type: 'EXPAND', id });
    }
  }, [isLoaded, id, dispatch]);

  useEffect(() => {
    if (isLoaded && searchString) {
      dispatch({ type: 'FILTER', searchString });
    }
  }, [isLoaded, searchString, dispatch]);

  return (
    <div className={styles.container}>
      {error
        ? <div>{error.message}</div>
        : !isLoaded
          ? <TOCPreloader />
          : <>
              <TOCFilter />
              <TOCList ids={topLevelIds} />
            </>
      }
    </div>
  );
}

export default TOC;
