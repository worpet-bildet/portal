export const getMeta = (item) => {
  return {
    title: getTitle(item),
    description: getDescription(item),
    blurb: getBlurb(item),
    image: getImage(item),
    cover: getCover(item),
    ship: getShip(item),
    website: getWebsite(item),
    color: getColor(item),
    version: getVersion(item),
    hash: getHash(item),
    servedFrom: getServedFrom(item),
    createdAt: getCreatedAt(item),
    keyStr: item?.keyStr,
  };
};

export const getTitle = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.title;
    case 'app':
      return item?.bespoke?.treaty?.title;
    default:
      return '';
  }
};
export const getDescription = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.description;
    case 'app':
      return item?.bespoke?.treaty?.info;
    default:
      return '';
  }
};
export const getBlurb = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.blurb;
    case 'app':
      return item?.bespoke?.treaty?.info;
    default:
      return '';
  }
};
export const getImage = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.image;
    case 'app':
      return item?.bespoke?.treaty?.image;
    default:
      return '';
  }
};
export const getCover = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.cover;
    case 'app':
      // return item?.bespoke?.treaty?.title;
      return '';
    default:
      return '';
  }
};
export const getLink = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.link;
    case 'app':
      return item?.bespoke?.treaty?.website;
    default:
      return '';
  }
};
export const getShip = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.keyObj?.ship;
    case 'app':
      return item?.bespoke?.treaty?.ship;
    default:
      return '';
  }
};
export const getWebsite = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.treaty?.website;
    default:
      return '';
  }
};
export const getColor = (item) => {
  switch (item?.keyObj?.struc) {
    case 'group':
      return item?.bespoke?.color;
    case 'app':
      return item?.bespoke?.treaty?.color;
    default:
      return '';
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

export const formatColor = (c) => {
  if (!c || c === '0x0') return 'ffffff';
  return c.replace('.', '').replace('0x', '');
};
