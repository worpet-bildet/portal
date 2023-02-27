import { appConfig } from "../config";

export const shouldTransform = subject =>
  subject.length && subject !== "SUBJECTS" && subject !== "FIELDS";
// subject !== "INPUTS" &&
const disabledProps = new Map([
  ["properties", true],
  ["pictures", true],
  // ["key-text-list", true],
  ["key-comment-list", true],
  ["key-comment", true],
  ["key-text", true],
  ["bespoke-input", true],
]);

export const formField = (
  label,
  name,
  type = "text",
  parent = null,
  children = null
) => ({
  label,
  name,
  type,
  parent,
  children,
  disabled: disabledProps.has(name),
});
export const mapInputField = (input, _parent = null) => {
  const parent = !(typeof _parent === "number") ? _parent : null;
  if (input === "key") {
    // debugger;
    return !appConfig.EXPAND_ALL_POKE_FIELDS &&
      !appConfig.EXPAND_POKE_FIELD_ITEM_KEY_OBJECT
      ? formField("key", "key", "text", parent)
      : formField(
          "key",
          "key",
          "object",
          parent,
          ["ship", "type", "cord"].map(el => mapInputField(el, "key"))
        );
  }
  if (input === "text") {
    return formField("text", "text", "text", parent);
  }
  if (input === "comment") {
    // debugger;
    return !appConfig.EXPAND_ALL_POKE_FIELDS
      ? formField("comment", "comment", "object", parent)
      : formField(
          "comment",
          "comment",
          "object",
          parent,
          ["key", "text"].map(el => mapInputField(el, "comment"))
        );
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
    // return formField("key-text-list", "key-text-list", "array", parent, []);
    // disabled: true,
    // return !appConfig.EXPAND_ALL_POKE_FIELDS
    //   : ["key", "key-list"].map(mapInputField);
  }
  if (input === "general") {
    return !appConfig.EXPAND_ALL_POKE_FIELDS
      ? formField("general", "general", "object", parent)
      : formField(
          "general",
          "general",
          "object",
          parent,
          [
            "title",
            "link",
            "description",
            "tags",
            "image",
            "properties",
            "pictures",
            "color",
          ].map(el => mapInputField(el, "general"))
        );
  }
  if (input === "ship") {
    return formField("ship", "ship", "text", parent);
  }
  return formField(input, input, "text", parent);
};
