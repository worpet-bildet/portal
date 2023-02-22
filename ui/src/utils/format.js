export const getShortTitle = (val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return val?.data?.bespoke?.keyObj.ship;
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    return `${val?.data?.general?.title}`;
  }
  if (type === "list") {
    return val?.item?.data?.general?.title;
  }
};

export const getLongTitle = (val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return val?.data?.bespoke?.keyObj.ship;
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    return `${val?.data?.bespoke?.keyObj.ship}/${val?.data?.bespoke?.keyObj.cord}`;
  }
  // presumably we want another here for app too
  if (type === "list") {
    return val?.item?.data?.general?.title;
  }
};

export const getTitles = (val, type) => [
  getShortTitle(val, type),
  getLongTitle(val, type),
];
