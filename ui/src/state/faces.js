import transform from "lodash/transform";
import flatten from "lodash/flatten";
import { mapInputField } from "../urbit/util";

export const ACTION_TYPES = {
  ITEM_ADD: "ITEM_ADD",
  ITEM_EDIT: "ITEM_EDIT",
  ITEM_SUB: "ITEM_SUB",
  ITEM_DEL: "ITEM_DEL",
  COMMENT_ADD: "COMMENT_ADD",
  COMMENT_EDIT: "COMMENT_EDIT",
  COMMENT_DEL: "COMMENT_DEL",
  RATING_ADD: "RATING_ADD",
  RATING_DEL: "RATING_DEL",
  REVIEW_ADD: "REVIEW_ADD",
  REVIEW_DEL: "REVIEW_DEL",
  LIST_OVERWRITE: "LIST_OVERWRITE",
  GROUP_JOIN: "GROUP_JOIN",
};
export const SUBJECTS = ["ITEM", "COMMENT", "RATING", "REVIEW", "GROUP"];

const t = ACTION_TYPES;
export const INPUT_FIELDS = {
  [t.ITEM_ADD]: {
    inputs: ["ship", "type", "general", "bespoke-input"],
    heading: "Add Item",
  },
  [t.ITEM_EDIT]: { inputs: ["key", "general", "bespoke-input"], heading: "Edit Item" },
  [t.ITEM_SUB]: { inputs: ["key"], heading: "Subscribe to Item" },
  [t.ITEM_DEL]: { inputs: ["key"], heading: "Delete Item" },
  [t.COMMENT_ADD]: { inputs: ["key", "text"], heading: "Add Comment" },
  [t.COMMENT_EDIT]: { inputs: ["key", "created-at", "text"], heading: "Edit Comment" },
  [t.COMMENT_DEL]: { inputs: ["key", "created-at"], heading: "Delete Comment" },
  [t.RATING_ADD]: { inputs: ["key", "ratingNum"], heading: "Add Rating" },
  [t.RATING_DEL]: { inputs: ["key"], heading: "Delete Rating" },
  [t.REVIEW_ADD]: { inputs: ["key", "text", "hash", "is-safe"], heading: "Add Review" },
  [t.REVIEW_DEL]: { inputs: ["key"], heading: "Delete Review" },
  [t.LIST_OVERWRITE]: { inputs: ["key", "key-list"], heading: "Overwrite List" },
  [t.GROUP_JOIN]: { inputs: ["key"], heading: "Join Group" },
};

// export const FIELDS = Object.keys(INPUTS).map(key => ({
//   key,
//   fields: INPUTS[key].map(mapInputField),
//   heading:
// }));
export const FIELDS = transform(
  INPUT_FIELDS,
  (acc, { inputs, heading }, key) => {
    acc[key] = {
      key,
      inputs,
      heading,
      fields: flatten(inputs.map(mapInputField)),
    };
    return acc;
  },
  {}
);

export const types = { SUBJECTS, FIELDS, ACTIONS: ACTION_TYPES };
export const portalEvents = {
  SUBJECTS,
  FIELDS,
  ITEM: {
    ADD: {
      FACE: t.ITEM_ADD,
      INPUTS: INPUT_FIELDS[t.ITEM_ADD].inputs,
      HEADING: "Add Item",
      POKE_KEY: "add",
      SUCCESS_MSG: "Item added",
    },
    EDIT: {
      FACE: t.ITEM_EDIT,
      INPUTS: ["key", "general", "bespoke-input"],
      HEADING: "Edit Item",
      POKE_KEY: "edit",
      SUCCESS_MSG: "Item edited",
    },
    SUB: {
      FACE: t.ITEM_SUB,
      INPUTS: ["key"],
      HEADING: "Subscribe to Item",
      POKE_KEY: "sub",
      SUCCESS_MSG: "Item subscribed",
    },
    DEL: {
      FACE: t.ITEM_DEL,
      INPUTS: ["key"],
      HEADING: "Delete Item",
      POKE_KEY: "del",
      SUCCESS_MSG: "Item deleted",
    },
  },
  COMMENT: {
    ADD: {
      FACE: t.COMMENT_ADD,
      INPUTS: ["key", "text"],
      HEADING: "Add Comment",
      POKE_KEY: "comment",
      SUCCESS_MSG: "Comment added",
    },
    EDIT: {
      FACE: t.COMMENT_EDIT,
      INPUTS: ["key", "created-at", "text"],
      HEADING: "Edit Comment",
      POKE_KEY: "edit-comment",
      SUCCESS_MSG: "Comment edited",
    },
    DEL: {
      FACE: t.COMMENT_DEL,
      INPUTS: ["key", "created-at"],
      HEADING: "Delete Comment",
      POKE_KEY: "del-comment",
      SUCCESS_MSG: "Comment deleted",
    },
  },
  RATING: {
    ADD: {
      FACE: t.RATING_ADD,
      INPUTS: ["key", "ratingNum"],
      HEADING: "Add Rating",
      POKE_KEY: "rate",
      SUCCESS_MSG: "Rating added",
    },
    DEL: {
      FACE: t.RATING_DEL,
      INPUTS: ["key"],
      HEADING: "Delete Rating",
      POKE_KEY: "unrate",
      SUCCESS_MSG: "Rating deleted",
    },
  },
  REVIEW: {
    ADD: {
      FACE: t.REVIEW_ADD,
      INPUTS: ["key", "text", "hash", "is-safe"],
      HEADING: "Add Review",
      POKE_KEY: "review",
      SUCCESS_MSG: "Review added",
    },
    DEL: {
      FACE: t.REVIEW_DEL,
      INPUTS: ["key"],
      HEADING: "Delete Review",
      POKE_KEY: "del-review",
      SUCCESS_MSG: "Review deleted",
    },
  },
  LIST: {
    OVERWRITE: {
      FACE: t.LIST_OVERWRITE,
      INPUTS: ["key", "key-list"],
      HEADING: "Overwrite List",
      POKE_KEY: "overwrite-list",
      SUCCESS_MSG: "List overwritten",
    },
  },
  GROUP: {
    JOIN: {
      FACE: t.GROUP_JOIN,
      INPUTS: ["key"],
      HEADING: "Join Group",
      POKE_KEY: "join-group",
      SUCCESS_MSG: "Group joined",
    },
  },
};

// general overwrites completely

// Other -       "bespoke-input": {
//   "enditem-other": ""
// }
// App -   "enditem-app": {
//   "dist-desk": "~zod/app"
// }

// "type": "/list/nonitem/group",
// "type": "/enditem/other",

// types:
// /nonitem/group
// /nonitem/ship
// /enditem/other
// /enditem/app
// /list/list
// /list/nonitem/group
// /list/nonitem/ship
// /list/enditem/other
// /list/enditem/app
