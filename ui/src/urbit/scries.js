export const PATHS = {
  // ITEM: `/item/~ship/type/cord`,
  ITEM: `/item`,
};
// %portal-store on-peek
// x/item/
// x/item/~zod/list/nonitem/group/~2000.1.1
// x/item/~dalten/nonitem/group/aera
export const scries = {
  item: async (urbit, options) => getUpdatedItemList(urbit, options),
};
export const formScry = (path, args) => {
  debugger;
  return {
    app: "portal-store",
    path,
    ...args,
  };
};
export const formScryWithArgsInPath = (path, args) => {
  const { ship, type, cord, keyStr } = args;
  if (keyStr) {
    return {
      app: "portal-store",
      path: `${path}${keyStr}/item`,
      ship,
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
export const getUpdatedItemList = async (urbit, options = {}) => {
  // const { src = "NO_SRC", action, face, keyObj, keyStr } = options;
  console.log("getUpdatedItemList", options);
  // debugger;
  try {
    const data = await urbit.scry(formScryWithArgsInPath(PATHS.ITEM, options));
    // const data = await urbit.scry(formScry(PATHS.ITEM, options));
    return data;
  } catch (err) {
    console.error(err);
  }
};
