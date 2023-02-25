export const PATHS = {
  // ITEM: `/item/~ship/type/cord`,
  ITEM: `/item`,
  CURATOR_DEFAULTS: `/item/nested`,
};
// %portal-store on-peek
// x/item/
// x/item/~zod/list/nonitem/group/~2000.1.1
// x/item/~dalten/nonitem/group/aera
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
    console.log("scry getCuratorDefaultLists", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getUpdatedItemList = async (urbit, options = {}) => {
  // const { src = "NO_SRC", action, face, keyObj, keyStr } = options;
  const formedScry = formScryWithArgsInPath(PATHS.ITEM, options);
  console.log({ options, formedScry });
  try {
    const data = await urbit.scry(formedScry);
    console.log("scry getUpdatedItemList", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
