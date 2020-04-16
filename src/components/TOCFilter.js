import React, {useContext, useState} from "react";
import {TOCDispatchContext} from "./TOCProvider";
import styles from "./TOCFilter.module.css";

function TOCFilter() {
  const dispatch = useContext(TOCDispatchContext);
  const [timeoutId, setTimeoutId] = useState(null);

  function handleChange(event) {
    const searchString = event.target.value;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        if (searchString === '') {
          dispatch({ type: 'RESTORE' });
        } else {
          dispatch({ type: 'FILTER', searchString });
        }
        setTimeoutId(null);
      }, 1000)
    );
  }

  return (
    <div className={styles.container}>
      {timeoutId &&
        <div className={styles.waitingIcon}></div>
      }
      <input className={styles.filter} type="text" placeholder="Filter..." onChange={handleChange} />
    </div>
  );
}

export default TOCFilter;
