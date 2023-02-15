// export const pokeKeys = {
//   ITEM_ADD: ["ship", "type", "general", "bespoke-input"],
//   ITEM_EDIT: ["key", "general", "bespoke-input"],
//   ITEM_SUB: ["key"],
//   ITEM_DEL: ["key"],
//   COMMENT_ADD: ["key", "text"],
//   COMMENT_EDIT: ["key", "created-at", "text"],
//   COMMENT_DEL: ["key", "created-at"],
//   RATING_ADD: ["key", "ratingNum"],
//   RATING_DEL: ["key"],
//   REVIEW_ADD: ["key", "text", "hash", "is-safe"],
//   REVIEW_DEL: ["key"],
//   LIST_OVERWRITE: ["key", "key-list"],
//   GROUP_JOIN: ["key"],
// };

// export const portalEvents = {
//   SUBJECTS: ["ITEM", "COMMENT", "RATING", "REVIEW", "GROUP"],
//   ITEM: {
//     ADD: {
//       FACE: "ITEM_ADD",
//       POKE: "add",
//       INPUTS: ["ship", "type", "general", "bespoke-input"],
//       SUCCESS_MSG: "Item added",
//     },
//     EDIT: {
//       FACE: "ITEM_EDIT",
//       POKE: "edit",
//       INPUTS: ["key", "general", "bespoke-input"],
//       SUCCESS_MSG: "Item edited",
//     },
//     SUB: {
//       FACE: "ITEM_SUB",
//       POKE: "sub",
//       INPUTS: ["key"],
//       SUCCESS_MSG: "Item subscribed",
//     },
//     DEL: {
//       FACE: "ITEM_DEL",
//       POKE: "del",
//       INPUTS: ["key"],
//       SUCCESS_MSG: "Item deleted",
//     },
//   },
//   COMMENT: {
//     ADD: {
//       FACE: "COMMENT_ADD",
//       POKE: "comment",
//       INPUTS: ["key", "text"],
//       SUCCESS_MSG: "Comment added",
//     },
//     EDIT: {
//       FACE: "COMMENT_EDIT",
//       POKE: "edit-comment",
//       INPUTS: ["key", "created-at", "text"],
//       SUCCESS_MSG: "Comment edited",
//     },
//     DEL: {
//       FACE: "COMMENT_DEL",
//       POKE: "del-comment",
//       INPUTS: ["key", "created-at"],
//       SUCCESS_MSG: "Comment deleted",
//     },
//   },
//   RATING: {
//     ADD: {
//       FACE: "RATING_ADD",
//       POKE: "rate",
//       INPUTS: ["key", "ratingNum"],
//       SUCCESS_MSG: "Rating added",
//     },
//     DEL: {
//       FACE: "RATING_DEL",
//       POKE: "unrate",
//       INPUTS: ["key"],
//       SUCCESS_MSG: "Rating deleted",
//     },
//   },
//   REVIEW: {
//     ADD: {
//       FACE: "REVIEW_ADD",
//       POKE: "review",
//       INPUTS: ["key", "text", "hash", "is-safe"],
//       SUCCESS_MSG: "Review added",
//     },
//     DEL: {
//       FACE: "REVIEW_DEL",
//       POKE: "del-review",
//       INPUTS: ["key"],
//       SUCCESS_MSG: "Review deleted",
//     },
//   },
//   LIST: {
//     OVERWRITE: {
//       FACE: "LIST_OVERWRITE",
//       POKE: "overwrite-list",
//       INPUTS: ["key", "key-list"],
//       SUCCESS_MSG: "List overwritten",
//     },
//   },
//   GROUP: {
//     JOIN: {
//       FACE: "GROUP_JOIN",
//       POKE: "join-group",
//       INPUTS: ["key"],
//       SUCCESS_MSG: "Group joined",
//     },
//   },
// };

// // export const _fieldsByAction = {
// //   ITEM_ADD: pokeKeys.ITEM_ADD.map((key) => {
// //     return { label: key, name: key, type: "text" };
// //   }
// // };
