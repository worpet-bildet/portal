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
  [t.ITEM_EDIT]: {
    inputs: ["key", "general", "bespoke-input"],
    heading: "Edit Item",
  },
  [t.ITEM_SUB]: { inputs: ["key"], heading: "Subscribe to Item" },
  [t.ITEM_DEL]: { inputs: ["key"], heading: "Delete Item" },
  [t.COMMENT_ADD]: { inputs: ["key", "text"], heading: "Add Comment" },
  [t.COMMENT_EDIT]: {
    inputs: ["key", "created-at", "text"],
    heading: "Edit Comment",
  },
  [t.COMMENT_DEL]: { inputs: ["key", "created-at"], heading: "Delete Comment" },
  [t.RATING_ADD]: { inputs: ["key", "ratingNum"], heading: "Add Rating" },
  [t.RATING_DEL]: { inputs: ["key"], heading: "Delete Rating" },
  [t.REVIEW_ADD]: {
    inputs: ["key", "text", "hash", "is-safe"],
    heading: "Add Review",
  },
  [t.REVIEW_DEL]: { inputs: ["key"], heading: "Delete Review" },
  [t.LIST_OVERWRITE]: {
    inputs: ["key", "key-text-list"],
    heading: "Overwrite List",
  },
  [t.GROUP_JOIN]: { inputs: ["key"], heading: "Join Group" },
};

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

export const getType = (FACE, POKE_KEY, SUCCESS_MSG) => ({
  FACE,
  INPUTS: INPUT_FIELDS[FACE].inputs,
  FIELDS: INPUT_FIELDS[FACE].inputs,
  HEADING: INPUT_FIELDS[FACE].heading,
  POKE_KEY,
  SUCCESS_MSG,
});

export const portalEvents = {
  SUBJECTS,
  FIELDS,
  ITEM: {
    ADD: getType(t.ITEM_ADD, "add", "Item added"),
    EDIT: getType(t.ITEM_EDIT, "edit", "Item edited"),
    SUB: getType(t.ITEM_SUB, "sub", "Item subscribed"),
    DEL: getType(t.ITEM_DEL, "del", "Item deleted"),
  },
  COMMENT: {
    ADD: getType(t.COMMENT_ADD, "comment", "Comment added"),
    EDIT: getType(t.COMMENT_EDIT, "edit-comment", "Comment edited"),
    DEL: getType(t.COMMENT_DEL, "del-comment", "Comment deleted"),
  },
  RATING: {
    ADD: getType(t.RATING_ADD, "rate", "Rating added"),
    DEL: getType(t.RATING_DEL, "unrate", "Rating deleted"),
  },
  REVIEW: {
    ADD: getType(t.REVIEW_ADD, "review", "Review added"),
    DEL: getType(t.REVIEW_DEL, "del-review", "Review deleted"),
  },
  LIST: {
    OVERWRITE: getType(t.LIST_OVERWRITE, "overwrite-list", "List overwritten"),
  },
  GROUP: {
    JOIN: getType(t.GROUP_JOIN, "join-group", "Group joined"),
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
