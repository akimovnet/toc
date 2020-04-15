import React, {useContext} from "react";
import TOCItem from "./TOCItem";
import {TOCStateContext} from "./TOCProvider";
import styles from "./TOCList.module.css";

function TOCList({ids}) {
  const { pages, searchString, filteredIds } = useContext(TOCStateContext);

  return (
    <ul className={styles.container}>
      {ids.filter(id => searchString === '' || filteredIds.includes(id)).map(id =>
        <TOCItem key={id} {...pages[id]} />
      )}
    </ul>
  );
}

export default TOCList;
