import React, {useContext} from "react";
import TOCItem from "./TOCItem";
import {TOCStateContext} from "./TOCProvider";

function TOCList({ids}) {
  const { pages } = useContext(TOCStateContext);

  return (
    <ul className="toc-list">
      {ids.map(id =>
        <TOCItem key={id} {...pages[id]} />
      )}
    </ul>
  );
}

export default TOCList;
