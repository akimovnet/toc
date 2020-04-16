import React, {useContext, useRef} from "react";
import TOCList from "./TOCList";
import {TOCDispatchContext, TOCStateContext} from "./TOCProvider";
import styles from "./TOCItem.module.css";

function TOCItem({id, title, url, pages, anchors}) {
  const dispatch = useContext(TOCDispatchContext);
  const state = useContext(TOCStateContext);
  const childrenRef = useRef(null);

  const isExpanded = state.expandedItemIds.includes(id);
  const isSelected = state.selectedItemId === id;
  const isMatched = state.matchedIds.includes(id);
  const hasChildren = pages && pages.length > 0;
  const hasAnchors = anchors && anchors.length > 0;

  const titleWithHighlightedMatch = isMatched
    ? title
        .split(new RegExp(`(${state.searchString})`, 'gi'))
        .map((part, index) =>
          index % 2 === 1
            ? <span className={styles.highlighted} key={index}>{part}</span>
            : part
        )
    : title;

  async function expandWithAnimation() {
    await dispatch({ type: 'EXPAND', id });
    childrenRef.current.animate(
      { height: [0, childrenRef.current.clientHeight + 'px'] },
      { duration: 200, easing: 'ease' }
    );
  }

  function collapseWithAnimation() {
    setTimeout(() => {
      dispatch({ type: 'COLLAPSE', id });
    }, 200);
    childrenRef.current.animate(
      { height: [childrenRef.current.clientHeight + 'px', 0] },
      { duration: 200, easing: 'ease', fill: 'forwards' }
    );
  }

  function handleTitleClick(event) {
    event.preventDefault();
    if (!isSelected) {
      dispatch({ type: 'SELECT_PAGE', id });
    }
    if (hasChildren && !isExpanded) {
      expandWithAnimation();
    }
  }

  function handleToggleChildrenClick() {
    if (isExpanded) {
      collapseWithAnimation();
    } else {
      expandWithAnimation();
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
            ? <a className={styles.title} href={url} onClick={handleTitleClick}>{titleWithHighlightedMatch}</a>
            : <span className={styles.title} onClick={handleTitleClick}>{titleWithHighlightedMatch}</span>
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
        <div ref={childrenRef} className={styles.children}>
          <TOCList ids={pages} />
        </div>
      }
    </li>
  );
}

export default TOCItem;
