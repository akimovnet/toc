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

export const mergeWithoutDuplicates = (array1, array2) => {
  return [
    ...array1,
    ...array2.filter(item => !array1.includes(item))
  ];
};
