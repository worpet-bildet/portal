import { appConfig } from "../config";

export const shouldTransform = subject =>
  subject.length && subject !== "SUBJECTS" && subject !== "FIELDS";
// subject !== "INPUTS" &&

export const mapInputField = input => {
  if (input === "key") {
    return !appConfig.EXPAND_ALL_POKE_FIELDS &&
      !appConfig.EXPAND_POKE_FIELD_ITEM_KEY_OBJECT
      ? {
          label: "key",
          name: "key",
          type: "text",
          // placeholder: "ship/type",
        }
      : ["ship", "type", "cord"].map(mapInputField);
  }
  if (input === "text") {
    return {
      label: "text",
      name: "text",
      type: "text",
    };
  }
  if (input === "comment") {
    debugger;
    return !appConfig.EXPAND_ALL_POKE_FIELDS
      ? {
          label: "comment",
          name: "comment",
          type: "object",
        }
      : ["key", "text"].map(mapInputField);
  }
  if (input === "tags") {
    return {
      label: "tags",
      name: "tags",
    };
  }
  if (input === "properties") {
    return {
      label: "properties",
      name: "properties",
    };
  }
  if (input === "pictures") {
    return {
      label: "pictures",
      name: "pictures",
      type: "array",
    };
  }
  if (input === "key-list") {
    // debugger;
    return {
      label: "key-list",
      name: "key-list",
      type: "array",
      // disabled: true,
    };
    // return !appConfig.EXPAND_ALL_POKE_FIELDS
    //   ? {
    //       label: "key-list",
    //       name: "key-list",
    //       type: "array",
    //       // disabled: true,
    //     }
    //   : ["key", "key-list"].map(mapInputField);
  }
  if (input === "general") {
    return !appConfig.EXPAND_ALL_POKE_FIELDS
      ? {
          label: "general",
          name: "general",
          type: "object",
        }
      : [
          "title",
          "link",
          "description",
          "tags",
          "properties",
          "pictures",
          "image",
          "color",
        ].map(mapInputField);
  }
  if (input === "ship") {
    return {
      label: "ship",
      name: "ship",
      type: "text",
    };
  }
  return {
    label: input,
    name: input,
    type: "text",
  };
};
