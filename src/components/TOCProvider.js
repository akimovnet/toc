import React, {useEffect, useReducer} from "react";
import {
  getAncestorIds,
  getAncestorIdsByList,
  getDescendantIdsByList,
  getMatchedItemIds,
  mergeWithoutDuplicates
} from "../helpers";

const TOCDispatchContext = React.createContext();
const TOCStateContext = React.createContext();

function TOCProvider({children}) {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOADED_DATA':
        return {
          ...state,
          isLoaded: true,
          pages: action.pages,
          anchors: action.anchors,
          topLevelIds: action.topLevelIds
        };
      case 'SET_LOADING_DATA_ERROR':
        return {
          ...state,
          isLoaded: true,
          error: action.error
        };
      case 'SELECT_PAGE':
        return {
          ...state,
          selectedItemId: action.id
        };
      case 'EXPAND':
        return {
          ...state,
          expandedItemIds: [...state.expandedItemIds, action.id]
        };
      case 'COLLAPSE':
        return {
          ...state,
          expandedItemIds: state.expandedItemIds.filter(id => id !== action.id)
        };
      case 'EXPAND_ANCESTORS':
        return {
          ...state,
          expandedItemIds: mergeWithoutDuplicates(
            state.expandedItemIds,
            getAncestorIds(action.id, state.pages,[])
          )
        };
      case 'FILTER':
        const matchedIds = getMatchedItemIds(action.searchString, state.pages);
        const matchedAncestorIds = getAncestorIdsByList(matchedIds, state.pages);
        return {
          ...state,
          matchedIds,
          searchString: action.searchString,
          expandedItemIds: matchedAncestorIds,
          filteredIds: mergeWithoutDuplicates(
            getDescendantIdsByList(matchedIds, state.pages),
            mergeWithoutDuplicates(matchedIds, matchedAncestorIds)
          )
        };
      default:
        return state;
    }
  };
  const initialState = {
    error: null,
    isLoaded: false,
    pages: [],
    anchor: [],
    topLevelIds: [],
    expandedItemIds: [],
    matchedIds: [],
    filteredIds: [],
    searchString: '',
    selectedItemId: null
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(process.env.REACT_APP_TOC_DATA_URL)
      .then(result => result.json())
      .then(
        (result) => {
          dispatch({
            type: 'SET_LOADED_DATA',
            pages: result.entities.pages,
            anchors: result.entities.anchors,
            topLevelIds: result.topLevelIds
          });
        },
        (error) => {
          dispatch({ type: 'SET_LOADING_DATA_ERROR', error });
        });
  }, []);

  return (
    <TOCDispatchContext.Provider value={dispatch}>
      <TOCStateContext.Provider value={state}>
        {children}
      </TOCStateContext.Provider>
    </TOCDispatchContext.Provider>
  );
}

export { TOCProvider, TOCDispatchContext, TOCStateContext };
