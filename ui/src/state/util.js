import unionBy from "lodash/unionBy";
import { portalEvents } from "./faces";

export const getTypesByKey = _key => _key.slice().split("/").slice(2, -1);
export const getBespokeKeys = bespoke => {
  const { keyObj, keyStr } = bespoke;
  return { keyObj, keyStr, keyTypes: getTypesByKey(keyStr) };
};
export const getEndType = keyTypes => keyTypes[keyTypes.length - 1];

export const getKeys = (key, keyObj, keyStr, bespoke) => {
  const keyTypes = getTypesByKey(key);
  const endType = getEndType(keyTypes);
  return {
    key,
    keyObj,
    keyStr,
    keyTypes,
    endType,
    bespoke: getBespokeKeys(bespoke),
  };
};

export const formatItem = (page, key) => {
  const { data, meta, keyObj, keyStr, sig, social } = page;
  const keys = getKeys(key, keyObj, keyStr, data.bespoke);
  return {
    keys,
    title: data.general.title,
    data,
    social,
    meta: { ...meta, sig, keys, order: data.bespoke.payload },
  };
};
export const formatPage = (item, map) => ({
  keys: item.keys,
  title: item.title,
  general: item.data.general,
  item,
  map,
});

export const getMapRecursive = (map, types, item) =>
  !map || !types || !item ? {} : indexPages(map, types);

export const indexPages = (pages, types = {}) => {
  const _pages = !Array.isArray(pages) ? Object.entries(pages) : pages;

  const index = _pages.slice().map(([key, page], _idx, _arr) => {
    if (!page) return;
    if (!page?.item) return page.data ? formatItem(page, key) : page;

    const _item = formatItem(page.item, key);
    const pageData = formatPage(_item, page.map);
    const endType = _item.meta.keys.endType;

    types[endType] = types[endType] || [];
    types[endType].push(pageData);

    return { ...pageData, map: getMapRecursive(page.map, types, _item) };
  });
  return [index, types];
};

export const getBP = _item => _item.data.bespoke.payload;
export const getListFromDCMap = (_draft, _ship, _res) => {
  _draft.defaultCurators[_ship] = _draft.defaultCurators[_ship] || [{ map: [] }];
  return _draft.defaultCurators[_ship][0].map[0].find(
    el => el.general.title === _res.data.general.title
  );
};
export const getListAtDCType = (_draft, _ship, _type, item = {}) => {
  _draft.defaultCurators[_ship] = _draft.defaultCurators[_ship] || [{ map: [] }];
  return _draft.defaultCurators[_ship][0].map?.length
    ? _draft.defaultCurators[_ship][0].map[0].find(
        el => el.keys.keyTypes[el.keys.keyTypes.length - 1] === _type[_type.length - 1]
      )
    : "";
};
export const getListAtType = (_draft, _type) => _draft.types[_type[_type.length - 1]];

// |nuke %portal, =desk &
// |rein %portal [& %portal-manager]

export const getFactSuccessMsg = factFace => {
  const [subject, action] = factFace?.slice().split("_") || ["", ""];
  // debugger;
  // TODO: fix conditional
  return factFace === factFace ? "" : portalEvents[subject][action].SUCCESS_MSG;
};

export const isNewSub = _update =>
  _update.evt.keyObj.type === "/list/list" && _update.evt.keyObj.cord === "~2000.1.1";

export const mergeTypesTransform = _get => (result, value, key) => {
  result[key] = unionBy(_get().types[key], value, "keys.keyStr");
};
