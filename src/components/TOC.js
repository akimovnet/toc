import React, {useContext} from "react";
import TOCList from "./TOCList";
import {TOCStateContext} from "./TOCProvider";

function TOC() {
  const { error, isLoaded, topLevelIds } = useContext(TOCStateContext);
  return (
    <div className="toc">
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
