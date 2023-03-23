import unionBy from "lodash/unionBy";

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

export const getMapRecursive = (map, item) => (!map || !item ? {} : indexPages(map));

export const indexPages = pages => {
  const _pages = !Array.isArray(pages) ? Object.entries(pages) : pages;
  const index = _pages.slice().map(([key, page], _idx, _arr) => {
    if (!page) return;
    if (!page?.item) return page.data ? formatItem(page, key) : page;

    const _item = formatItem(page.item, key);
    const pageData = formatPage(_item, page.map);

    return { ...pageData, array: getMapRecursive(page.map, _item) };
  });
  return index;
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

export const isNewSub = _update =>
  _update.evt.keyObj.type === "/list/list" && _update.evt.keyObj.cord === "~2000.1.1";

export const mergeTypesTransform = _get => (result, value, key) => {
  result[key] = unionBy(_get().types[key], value, "keys.keyStr");
};
