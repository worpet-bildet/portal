export const initialFormData = {
  actionType: "",
  key: {
    ship: "~zod",
    type: "/enditem/other",
    cord: "~2000.1.1",
  },
  "key-text-list": [
    {
      key: {
        cord: "~2023.2.13..20.20.54..8a84",
        ship: "~zod",
        type: "/enditem/other",
      },
      text: "Chicken nuggets",
    },
    {
      key: {
        ship: "~zod",
        cord: "~2023.2.13..20.20.54..98dd",
        type: "/enditem/other",
      },
      text: "Bloop",
    },
  ],
  // "key-text-list": [
  // {
  //   key: {
  //     cord: "~2023.2.13..20.20.54..8a84",
  //     ship: "~zod",
  //     type: "/enditem/other",
  //   },
  //   text: "Chicken nuggets",
  // },
  // {
  //   key: {
  //     ship: "~zod",
  //     cord: "~2023.2.13..20.20.54..98dd",
  //     type: "/enditem/other",
  //   },
  //   text: "Bloop",
  // },
  // .^(?(~ item:data) %gx /=portal-store=/item/~ranlus-dolfen-wolred-salnel/list/list/~2000.1.1/noun)
  //   {
  //     text: "These are the apps I recommend",
  //     key: {
  //       ship: "~ranlus-dolfen-wolred-salnel",
  //       cord: "~2000.1.1",
  //       type: "/list/app",
  //     },
  //   },
  //   {
  //     text: "These are miscellaneous items I recommend",
  //     key: {
  //       ship: "~ranlus-dolfen-wolred-salnel",
  //       cord: "~2000.1.1",
  //       type: "/list/enditem/other",
  //     },
  //   },
  //   {
  //     text: "These are groups I recommend",
  //     key: {
  //       ship: "~ranlus-dolfen-wolred-salnel",
  //       cord: "~2000.1.1",
  //       type: "/list/nonitem/group",
  //     },
  //   },
  //   {
  //     text: "These are ships I recommend",
  //     key: {
  //       ship: "~ranlus-dolfen-wolred-salnel",
  //       cord: "~2000.1.1",
  //       type: "/list/nonitem/ship",
  //     },
  //   },
  //   {
  //     text: "Auto-recommended",
  //     key: {
  //       ship: "~ranlus-dolfen-wolred-salnel",
  //       cord: "~2023.2.26..19.49.56..4c76",
  //       type: "/list/nonitem/group",
  //     },
  //   },
  //   // "~2023.2.26..19.49.58..a1c5"
  // ],
  general: {
    title: "",
    link: "",
    description: "",
    tags: [],
    image: "",
    color: "",
    properties: {},
    pictures: [],
  },
  // general: {
  //   title: "Some Title",
  //   link: "https://website-thing.com",
  //   description: "Some description.",
  //   tags: ["tag1", "tag2"],
  //   properties: {},
  //   pictures: ["https://pic1.com", "https://pic2.com"],
  //   image: "https://square-image.com",
  //   color: "#e8e8e8",
  // },
  social: {
    comment: {
      "created-at": "~2000.1.1",
      text: "",
    },
    rating: {
      "rating-num": 0,
    },
    review: {
      text: "This is a review.",
      hash: "0v1234",
      "is-safe": false,
    },
  },

  "bespoke-input": {
    "enditem-other": "",
    // "key-text-list": [
    //   {
    //     text: "These are the apps I recommend",
    //     key: {
    //       ship: "~ranlus-dolfen-wolred-salnel",
    //       cord: "~2000.1.1",
    //       type: "/list/app",
    //     },
    //   },
    //   {
    //     text: "These are miscellaneous items I recommend",
    //     key: {
    //       ship: "~ranlus-dolfen-wolred-salnel",
    //       cord: "~2000.1.1",
    //       type: "/list/enditem/other",
    //     },
    //   },
    //   {
    //     text: "These are groups I recommend",
    //     key: {
    //       ship: "~ranlus-dolfen-wolred-salnel",
    //       cord: "~2000.1.1",
    //       type: "/list/nonitem/group",
    //     },
    //   },
    //   {
    //     text: "These are ships I recommend",
    //     key: {
    //       ship: "~ranlus-dolfen-wolred-salnel",
    //       cord: "~2000.1.1",
    //       type: "/list/nonitem/ship",
    //     },
    //   },
    //   {
    //     text: "Auto-recommended",
    //     key: {
    //       ship: "~ranlus-dolfen-wolred-salnel",
    //       cord: "~2023.2.26..19.49.56..4c76",
    //       type: "/list/nonitem/group",
    //     },
    //   },
    //   // {
    //   //   text: "Auto-recommended",
    //   //   key: {
    //   //     ship: "~ranlus-dolfen-wolred-salnel",
    //   //     cord: "~2023.2.26..19.49.58..a1c5",
    //   //     type: "/list/nonitem/group",
    //   //   },
    //   // },
    // ],
    // "enditem-app": {
    //   "dist-desk": "~zod/app"
    // },
  },
  ship: "",
  // ~ranlus-dolfen-wolred-salnel
  type: "/enditem/other",
  cord: "~2000.1.1",
  // General
  // title: "Some Title",
  // link: "https://website-thing.com",
  // description: "Some description.",
  // tags: ["tag1", "tag2"],
  // properties: {},
  // pictures: ["https://pic1.com", "https://pic2.com"],
  // image: "https://square-image.com",
  // color: "#e8e8e8",
  // Social
  // "created-at": "~2000.1.1",
  // text: "This is a comment.",
  // "rating-num": 0,
  // hash: "0v1234",
  // "is-safe": false,
  comment: {
    "created-at": "~2000.1.1",
    text: "",
  },
  rating: {
    "rating-num": 0,
  },
  review: {
    text: "This is a review.",
    hash: "0v1234",
    "is-safe": false,
  },
};

// TODO: ["~zod"][0].map[0][2].map

// "key-text-list": [
//   {
//     key: {
//       cord: "~2023.2.13..20.20.54..8a84",
//       ship: "~zod",
//       type: "/enditem/other",
//     },
//     text: "Chiken nuggets",
//   },
//   {
//     key: {
//       ship: "~zod",
//       cord: "~2023.2.13..20.20.54..98dd",
//       type: "/enditem/other",
//     },
//     text: "Bloop",
//   },
//   {
//     key: {
//       ship: "~zod",
//       cord: "~2023.2.13..20.20.54..a8d1",
//       type: "/enditem/other",
//     },
//     text: "Auto-recommended",
//   },
// ],
