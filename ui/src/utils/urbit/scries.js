export const PATHS = {
  ITEM: `/item`,
  CURATOR_DEFAULTS: `/item/nested`,
};
export const scries = {
  item: async (urbit, options) => getUpdatedItemList(urbit, options),
  curatorDefaults: async (urbit, options) => getCuratorDefaultLists(urbit, options),
};
export const formScry = (path, args) => {
  return {
    app: "portal-store",
    path,
    ...args,
  };
};
export const formScryWithArgsInPath = (path, args) => {
  const { keyStr, keyObj, action, face, src } = args;
  if (keyStr) {
    return {
      app: "portal-store",
      path: `${path}${keyStr}`,
      ship: args.ship || keyObj.ship,
    };
  }
  const pathWithArgs = path
    .replace("~ship", ship)
    .replace("type", type)
    .replace("cord", cord);
  return {
    app: "portal-store",
    path: pathWithArgs,
  };
};

export const getCuratorDefaultLists = async (urbit, options = {}) => {
  const formedScry = formScryWithArgsInPath(PATHS.CURATOR_DEFAULTS, options);
  try {
    const data = await urbit.scry(formedScry);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getUpdatedItemList = async (urbit, options = {}) => {
  const formedScry = formScryWithArgsInPath(PATHS.ITEM, options);
  try {
    const data = await urbit.scry(formedScry);
    return data;
  } catch (err) {
    console.error(err);
  }
};
