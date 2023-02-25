export const getShortTitle = (val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return val?.data?.bespoke?.keyObj.ship;
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    const generalTitle = val?.data?.general?.title;
    const groupTitle = val?.keys?.keyObj?.cord || val?.keyObj?.cord;
    const host = val?.keys?.keyObj?.ship || val?.keyObj?.ship;
    return generalTitle?.length
      ? generalTitle
      : host?.length && groupTitle?.length
      ? `${groupTitle.replace(/-/g, " ")}`
      : "no title found";
  }
  if (val?.data?.bespoke?.keyObj.type.includes("app")) {
    return `${val?.data?.bespoke?.keyObj.cord}`;
  }
  if (type === "other") {
    return val?.data?.general?.title;
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
  if (val?.data?.bespoke?.keyObj.type.includes("app")) {
    return `${val?.data?.bespoke?.keyObj.ship}/${val?.data?.bespoke?.keyObj.cord}`;
  }
  if (type === "other") {
    return val?.data?.general?.title;
  }
  if (type === "list") {
    return val?.item?.data?.general?.title;
  }
};

export const getTitles = (val, type) => [
  getShortTitle(val, type),
  getLongTitle(val, type),
];

export const getDescription = (val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return "";
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    return val?.data?.general?.description;
  }
  if (val?.data?.bespoke?.keyObj.type.includes("app")) {
    return val?.data?.bespoke?.payload?.info;
  }
  if (type === "other") {
    return val?.data?.general?.description;
  }
  if (type === "list") {
    return "";
  }
};

export const getWebsite = (val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return "";
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    return "web+urbitgraph://1/group/" + getLongTitle(val, type);
  }
  if (val?.data?.bespoke?.keyObj.type.includes("app")) {
    return val?.data?.bespoke?.payload?.website;
  }
  if (type === "other") {
    return val?.data?.general?.link;
  }
  if (type === "list") {
    return "";
  }
};

export const checkUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }
  return true;
};
