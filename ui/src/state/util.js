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

export const indexPages = _pages => {
  return _pages.slice().map(([key, page]) => {
    const { item, map } = page;
    if (!item) return page;
    const keyFragments = key.slice().split("/");
    const [type, subtype, pointerList] = getBespokeType(item.data.bespoke);
    const pageData = {
      key,
      name: item.data.general.title,
      general: item.data.general,
      meta: item["meta-data"],
      social: item.social,
      order: pointerList,
      bespoke: item.data.bespoke,
      B_TYPE: `${type}/${subtype}`,
      types: {
        bespoke: [type, subtype, pointerList],
        metadataId: getMetadataIdType(item),
        keyType: keyFragments[3],
      },
      map: indexPages(Object.entries(map)),
    };
    return pageData;
  });
};
