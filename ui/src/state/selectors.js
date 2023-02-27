import isEmpty from "lodash/isEmpty";

export const getCurators = state => state.curators;
export const getDefaultCurators = state => state.defaultCurators;
export const setCurators = state => state.setCurators;
export const onInitialLoad = state => state.onInitialLoad;
export const onUpdate = state => state.onUpdate;
export const getApps = state => state.types.app;
export const getGroups = state => state.types.group;
export const getLists = state => state.types.list;
export const getOthers = state => state.types.other;
export const getShips = state => state.types.ship;
export const getCurator = state => state.curators;
export const getTypes = state => state.types;
export const getSelectedSection = state => state.selectedSection;
export const getAlertIsOpen = state => state.alertIsOpen;
export const setAlertIsOpen = state => state.setAlertIsOpen;
export const getAlertText = state => state.alertText;
export const setAlertText = state => state.setAlertText;

export const getUserHasContent = ({ defaultCurators }, userShip) => {
  const userHasContent = Boolean(
    !isEmpty(defaultCurators) &&
      defaultCurators[userShip] &&
      defaultCurators[userShip].map[0]?.reduce(
        (prev, curr) => prev && curr?.map[0]?.length,
        true
      )
  );
  return userHasContent;
};

export const getInitalPages = ({ defaultCurators }) => {
  const pages = Object.keys(defaultCurators).reduce((prev, curr) => {
    const _pages = defaultCurators[curr].map[0]?.reduce((prev, curr) => {
      return curr?.map[0]?.length ? [...prev, ...curr.map[0]] : prev;
    }, []);
    return _pages?.length ? [...prev, ..._pages] : prev;
  }, []);
  // console.log("pages", pages);
  return pages;
};

export const getInitalAllItems = ({ defaultCurators }) => {
  const pages = Object.keys(defaultCurators).reduce((prev, curr) => {
    const _pages = defaultCurators[curr].map[0]?.reduce((prev, curr) => {
      return curr?.map[0]?.length ? [...prev, ...curr.map[0]] : prev;
    }, []);
    return _pages?.length ? [...prev, ..._pages] : prev;
  }, []);
  // console.log("pages", pages);
  return pages;
};
