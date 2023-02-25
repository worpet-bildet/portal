import { appConfig } from "../config";

export const shouldTransform = subject =>
  subject.length && subject !== "SUBJECTS" && subject !== "FIELDS";
// subject !== "INPUTS" &&

export const formField = (label, name, type = "text", parent = null) => ({
  label,
  name,
  type,
  parent,
});
export const mapInputField = (input, _parent = null) => {
  const parent = !(typeof _parent === "number") ? _parent : null;
  if (input === "key") {
    // debugger;
    return !appConfig.EXPAND_ALL_POKE_FIELDS &&
      !appConfig.EXPAND_POKE_FIELD_ITEM_KEY_OBJECT
      ? formField("key", "key", "text", parent)
      : ["ship", "type", "cord"].map(el => mapInputField(el, "key"));
  }
  if (input === "text") {
    return formField("text", "text", "text", parent);
  }
  if (input === "comment") {
    // debugger;
    return !appConfig.EXPAND_ALL_POKE_FIELDS
      ? formField("comment", "comment", "object", parent)
      : ["key", "text"].map(el => mapInputField(el, "comment"));
  }
  if (input === "tags") {
    return formField("tags", "tags", "array", parent);
  }
  if (input === "properties") {
    return formField("properties", "properties", "object", parent);
  }
  if (input === "pictures") {
    return formField("pictures", "pictures", "array", parent);
  }
  if (input === "key-text-list") {
    // debugger;
    return formField("key-text-list", "key-text-list", "array", parent);
    // disabled: true,
    // return !appConfig.EXPAND_ALL_POKE_FIELDS
    //   : ["key", "key-list"].map(mapInputField);
  }
  if (input === "general") {
    return !appConfig.EXPAND_ALL_POKE_FIELDS
      ? formField("general", "general", "object", parent)
      : [
          "title",
          "link",
          "description",
          "tags",
          "properties",
          "pictures",
          "image",
          "color",
        ].map(el => mapInputField(el, "general"));
  }
  if (input === "ship") {
    return formField("ship", "ship", "text", parent);
  }
  return formField(input, input, "text", parent);
};
