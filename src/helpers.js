export const getAncestorIds = (id, pages, accumulator) => {
  const { parentId } = pages[id];
  if (!parentId) {
    return accumulator;
  }
  return getAncestorIds(
    parentId,
    pages,
    [...accumulator, parentId]
  );
};

export const getAncestorIdsByList = (ids, pages) =>
  ids.reduce((accumulator, id) =>
    mergeWithoutDuplicates(
      accumulator,
      getAncestorIds(id, pages, [])
    ), []);

export const getDescendantIds = (id, pages) => {
  const children = pages[id].pages;
  if (!children || children.length === 0) {
    return [];
  }
  return children.reduce((childIds, childId) => [
    ...childIds,
    childId,
    ...getDescendantIds(childId, pages)
  ], []);
};

export const getDescendantIdsByList = (ids, pages) =>
  ids.reduce((accumulator, id) =>
    mergeWithoutDuplicates(accumulator, getDescendantIds(id, pages)), []);

export const getMatchedItemIds = (searchString, pages) => {
  return Object.keys(pages).filter(id =>
    pages[id].title.toLowerCase().includes(searchString.toLowerCase())
  )
};

export const mergeWithoutDuplicates = (array1, array2) => {
  return [
    ...array1,
    ...array2.filter(item => !array1.includes(item))
  ];
};
