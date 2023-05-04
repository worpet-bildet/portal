export const getMeta = (item) => {
  return {
    title: getTitle(item),
    description: getDescription(item),
    blurb: getBlurb(item),
    image: getImage(item),
    cover: getCover(item),
    ship: getShip(item),
    createdAt: getCreatedAt(item),
    keyStr: item?.keyStr,
  };
};

export const getTitle = (item) => item?.bespoke?.title;
export const getDescription = (item) => item?.bespoke?.description;
export const getBlurb = (item) => item?.bespoke?.blurb;
export const getImage = (item) => item?.bespoke?.image;
export const getCover = (item) => item?.bespoke?.cover;
export const getShip = (item) => item?.keyObj?.ship;
export const getCreatedAt = (item) => fromUrbitTime(item?.meta?.createdAt);
export const getLink = (item) => item?.bespoke?.link;

export const formatStruc = (struc) => struc.replace('/', '');

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
  if (!timestring) return;
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
