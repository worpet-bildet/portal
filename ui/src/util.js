export const getMeta = (item) => {
  return {
    title: getTitle(item),
    description: getDescription(item),
    blurb: getBlurb(item),
    image: getImage(item),
    cover: getCover(item),
    ship: getShip(item),
    link: getLink(item),
    color: getColor(item),
    version: getVersion(item),
    hash: getHash(item),
    servedFrom: getServedFrom(item),
    createdAt: getCreatedAt(item),
    struc: getStruc(item),
    ref: getRef(item),
    keyStr: item?.keyStr,
  };
};

export const getTitle = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.title;
    case 'ship':
      return item?.bespoke?.nickname
        ? `${item?.bespoke?.nickname} (${item?.keyObj?.ship})`
        : item?.keyObj?.ship;
    default:
      return item?.bespoke?.title;
  }
};
export const getDescription = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.info;
    case 'ship':
      return item?.bespoke?.bio;
    default:
      return item?.bespoke?.description;
  }
};
export const getBlurb = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.info;
    case 'ship':
      return item?.bespoke?.bio;
    default:
      return item?.bespoke?.blurb;
  }
};
export const getImage = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.image;
    case 'ship':
      return item?.bespoke?.avatar;
    default:
      return item?.bespoke?.image;
  }
};
export const getCover = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      // return item?.bespoke?.treaty?.title;
      return '';
    default:
      return item?.bespoke?.cover;
  }
};
export const getLink = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.website;
    default:
      return item?.bespoke?.link;
  }
};
export const getShip = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.ship;
    default:
      return item?.keyObj?.ship;
  }
};
export const getColor = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.color;
    default:
      return item?.bespoke?.color;
  }
};
export const getVersion = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.version;
    default:
      return '';
  }
};
export const getHash = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.hash;
    default:
      return '';
  }
};
export const getServedFrom = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      // pretty sure that this should cover everything but we will find out!!
      return (
        item?.bespoke?.treaty?.href?.site ||
        `apps/${item?.bespoke?.treaty?.href?.glob?.base}`
      );
    default:
      return '';
  }
};
export const getCreatedAt = (item) => fromUrbitTime(item?.meta?.createdAt);
export const getStruc = (item) => item?.keyObj?.struc;
export const getRef = (item) => item?.bespoke?.ref;

export const isUrl = (s) => {
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=,]*)$/g.test(
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

export const formatColor = (c) => {
  if (!c || c === '0x0') return '000000';
  return c.replace('.', '').replace('0x', '');
};
