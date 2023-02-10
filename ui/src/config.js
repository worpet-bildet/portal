export const urbitConfig = {
  desk: "portal",
  path: "/front-end-update",
  agent: "portal-store",
};

export const appConfig = {
  AUDIT_TYPES: false,
  EXPAND_ALL_POKE_FIELDS: true,
  EXPAND_POKE_FIELD_ITEM_KEY_OBJECT: true,
};

export const authSubConfig = {
  ship: window?.ship || process.env.REACT_APP_SHIP_NAME || "",
  url: window?.ship || process.env.REACT_APP_SHIP_URL || "",
  code: window?.ship || process.env.REACT_APP_SHIP_CODE || "",
  verbose: true,
};
