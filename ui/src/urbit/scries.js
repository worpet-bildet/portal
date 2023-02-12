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
  const { keyStr, keyObj, action, face, src } = args;
  if (keyStr) {
    return {
      app: "portal-store",
      path: `${path}${keyStr}`,
      // path: `${keyStr}`,
      // .replaceAll("~", ""),
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
export const getUpdatedItemList = async (urbit, options = {}) => {
  // const { src = "NO_SRC", action, face, keyObj, keyStr } = options;
  const formedScry = formScryWithArgsInPath(PATHS.ITEM, options);
  console.log("getUpdatedItemList", options);
  console.log("formedScry", formedScry);
  // debugger;
  try {
    const data = await urbit.scry(formedScry);
    // const data = await urbit.scry(formScry(PATHS.ITEM, options));
    debugger;
    return data;
  } catch (err) {
    console.error(err);
  }
};
