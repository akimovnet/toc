import React, {useContext} from "react";
import TOCList from "./TOCList";
import {TOCDispatchContext, TOCStateContext} from "./TOCProvider";
import styles from "./TOCItem.module.css";

function TOCItem({id, title, url, pages, anchors}) {
  const dispatch = useContext(TOCDispatchContext);
  const state = useContext(TOCStateContext);

  const isExpanded = state.expandedItemIds.includes(id);
  const isSelected = state.selectedItemId === id;
  const hasChildren = pages && pages.length > 0;
  const hasAnchors = anchors && anchors.length > 0;

  function handleTitleClick(event) {
    event.preventDefault();
    if (!isSelected) {
      dispatch({ type: 'SELECT_PAGE', id });
      dispatch({ type: 'EXPAND', id });
    }
  }

  function handleToggleChildrenClick() {
    if (isExpanded) {
      dispatch({ type: 'COLLAPSE', id });
    } else {
      dispatch({ type: 'EXPAND', id });
    }
  }

  return (
    <li>
      <div className={styles.heading
                      + (isSelected? ` ${styles.selected}` : '')
                      + (isExpanded? ` ${styles.expanded}` : '')
                      + (hasAnchors? ` ${styles.hasAnchors}` : '')}>
        <div className={styles.titleWrapper}>
          {hasChildren &&
            <div className={styles.toggleChildren} onClick={handleToggleChildrenClick}>
              <div className={styles.toggleChildrenIcon}></div>
            </div>
          }
          {url
            ? <a className={styles.title} href={url} onClick={handleTitleClick}>{title}</a>
            : <span className={styles.title} onClick={handleTitleClick}>{title}</span>
          }
        </div>
        {isSelected && hasAnchors &&
          <ul className={styles.anchors}>
            {anchors.map(id =>
              <li key={id}>
                <a className={styles.anchor}
                   href={state.anchors[id].url + state.anchors[id].anchor}
                   onClick={e => e.preventDefault()}>
                  {state.anchors[id].title}
                </a>
              </li>
            )}
          </ul>
        }
      </div>
      {isExpanded && hasChildren &&
        <TOCList ids={pages} />
      }
    </li>
  );
}

export default TOCItem;
