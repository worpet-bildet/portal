export const getMeta = (item) => {
  return {
    title: getTitle(item),
    blurb: getBlurb(item),
    image: getImage(item),
    ship: getShip(item),
    keyStr: item?.keyStr,
  };
};

export const getType = (item) => {
  const key = item?.keyStr;
  if (key?.includes('nonitem/app')) return 'app';
  if (key?.includes('nonitem/group')) return 'group';
  if (key?.includes('nonitem/ship')) return 'ship';
  if (key?.includes('enditem/other')) return 'other';
  if (key?.includes('list')) return 'list';
};

export const getTitle = (item) => {
  return item?.bespoke?.title;
};

export const getBlurb = (item) => {
  return item?.bespoke?.blurb;
};

export const getImage = (item) => {
  return item?.bespoke?.image;
};

export const getShip = (item) => {
  return item?.keyObj?.ship;
};

export const getLink = (item) => {};

export const getPayload = (item) => item?.data?.bespoke?.payload;

export const isUrl = (s) => {
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      s
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const invertHex = (hex) => {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).slice(1).toUpperCase();
};

// export const unsanitiseRecursive = (objectOrText) => {
//   let cloned;
//   if (typeof objectOrText === 'object' && !Array.isArray(objectOrText)) {
//     cloned = { ...objectOrText };
//     for (let key in cloned) {
//       cloned[key] = unsanitiseTextFieldsRecursive(cloned[key]);
//     }
//   }
//   if (Array.isArray(objectOrText)) {
//     cloned = objectOrText.map((el) => el);
//     for (let [index] in cloned) {
//       cloned[index] = unsanitiseTextFieldsRecursive(cloned[index]);
//     }
//   }
//   if (typeof objectOrText === 'string') {
//     cloned = objectOrText.substring(0);
//     cloned = cloned.replace(/\\'/g, "'");
//   }
//   return cloned;
// };

// export const sanitiseRecursive = (objectOrText) => {
//   // if object is an object, loop through the keys
//   let cloned;
//   if (typeof objectOrText === 'object' && !Array.isArray(objectOrText)) {
//     cloned = { ...objectOrText };
//     for (let key in cloned) {
//       cloned[key] = sanitiseTextFieldsRecursive(cloned[key]);
//     }
//   }
//   if (Array.isArray(objectOrText)) {
//     cloned = objectOrText.map((el) => el);
//     for (let [index] in cloned) {
//       cloned[index] = sanitiseTextFieldsRecursive(cloned[index]);
//     }
//   }
//   if (typeof objectOrText === 'string') {
//     cloned = objectOrText.substring(0);
//     cloned = cloned.replace(/'/g, "\\'");
//   }
//   return cloned;
// };

export const toUrbitTime = (timestamp) => {
  // turn this into a date object
  const date = new Date(timestamp);
  return `~${date.getUTCFullYear()}.${
    date.getUTCMonth() + 1
  }.${date.getUTCDate()}..${
    date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
  }.${
    date.getUTCMinutes() < 10
      ? '0' + date.getUTCMinutes()
      : date.getUTCMinutes()
  }.${
    date.getUTCSeconds() < 10
      ? '0' + date.getUTCSeconds()
      : date.getUTCSeconds()
  }`;
};

export const fromUrbitTime = (timestring) => {
  const msOffset = new Date().getTimezoneOffset() * 60 * 1000;
  let parts = timestring.split('.');
  const date = new Date(
    parts[0].substring(1),
    parts[1] - 1,
    parts[2],
    parts[4],
    parts[5],
    parts[6]
  );
  return date.getTime() - msOffset;
};
