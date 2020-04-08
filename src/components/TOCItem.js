import React, {useContext, useState} from "react";
import TOCList from "./TOCList";
import {TOCDispatchContext, TOCStateContext} from "./TOCProvider";

function TOCItem({id, title, url, pages, anchors}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useContext(TOCDispatchContext);
  const state = useContext(TOCStateContext);

  const isSelected = state.selectedItemId === id;

  function handleClick(event) {
    event.preventDefault();
    setIsExpanded(!isExpanded);
    dispatch({ type: 'SELECT_PAGE', id });
  }

  return (
    <li className={'toc-item'
                   + (isSelected? ' selected' : '')
                   + (isExpanded? ' expanded' : '')
                   + (pages? ' has-children' : '')}>
      <div className="toc-item-title" onClick={handleClick}>
        {url
          ? <a href={url} >{title}</a>
          : <span>{title}</span>
        }
      </div>
      {isSelected && anchors &&
        <ul className="toc-anchors">
          {anchors.map(id =>
            <li key={id}>
              <a href={state.anchors[id].anchor}>{state.anchors[id].title}</a>
            </li>
          )}
        </ul>
      }
      {isExpanded && pages &&
        <div className="toc-inner-list">
          <TOCList ids={pages} />
        </div>
      }
    </li>
  );
}

export default TOCItem;
