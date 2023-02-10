import { appConfig } from "../config";

export const getBespokeType = bespoke => {
  if (bespoke["curator-page"]) {
    return [
      "list",
      "curator-page",
      bespoke["curator-page"]["curator-page"]["pointer-list"],
    ];
  }
  if (bespoke["list"] && bespoke["list"]["list"]) {
    return [
      "list",
      bespoke["list"]["list"].type,
      bespoke["list"]["list"]["pointer-list"],
    ];
  }
  if (bespoke["app"]) {
    return ["item", "app", bespoke["app"]];
  }
  if (bespoke["other"]) {
    return ["item", "other", bespoke["other"]];
  }
  return ["otherBespoke", bespoke];
};
export const getMetadataIdType = item => {
  return item["meta-data"].id.type;
};
export const getDebug = (general, bespoke, keys) => {
  return appConfig.AUDIT_TYPES
    ? {
        debug: {
          general,
          bespoke,
          keys,
          order: bespoke.payload,
        },
      }
    : {};
};
export const getTypesByKey = _key => _key.slice().split("/").slice(2, -1);
export const getBespokeKeys = bespoke => {
  const { keyObj, keyStr } = bespoke;
  return { keyObj, keyStr, keyTypes: getTypesByKey(keyStr) };
};
export const getEndTyoe = keyTypes => keyTypes[keyTypes.length - 1];

export const indexPages = (_pages, types = {}) => {
  const index = _pages.slice().map(([key, page]) => {
    if (!page) return key;
    const { item, map } = page;
    if (!item) return page;

    const { data, meta, keyObj, keyStr, sig, social } = item;
    const { general, bespoke } = data;
    const keyTypes = getTypesByKey(key);
    const bespokeKeys = getBespokeKeys(bespoke);
    const keys = { key, keyObj, keyStr, keyTypes, bespoke: bespokeKeys };
    const endType = getEndTyoe(keyTypes);

    // if (endType === "group")
    const _types = { ...types };
    types[endType] = types[endType] || [];
    // types[endType] = types[endType] || [];

    const _item = {
      data,
      keys,
      social,
      title: general.title,
      meta: { ...meta, sig, keys, order: bespoke.payload },
    };

    const getMap = (_types, __item) => {
      if (!map) return {};

      const entries = Object.entries(map);
      const mapped = entries.map(entry => entry.filter(ent => ent));

      return mapped && mapped[0]?.length > 1
        ? indexPages(mapped, _types)
        : mapped.map(ent => [
            ent[0],
            ent[1] || { nonItem: true, nonItemKey: ent[0], ...__item },
          ]);
    };

    const _map = getMap(types, _item);
    types[endType].push({ keys, title: general.title, item: _item, map });

    const pageData = {
      keys,
      title: general.title,
      general,
      item: _item,
      map: _map,
    };
    return pageData;
  });
  return [index, types];
};
