import { ContactRolodex } from '$types/landscape/contact';

import fuzzy from 'fuzzy';
import * as linkify from 'linkifyjs';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { deSig } from '@urbit/api';

export const isSubmitHotkey = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && e.metaKey) return true;
};

export const checkIfInstalled = (s, desk, cord, isInstalling = false) => {
  return (
    (!isInstalling && !!s.apps?.[desk]) ||
    (s.apps?.[cord]?.chad?.hasOwnProperty('site') && !!s.apps?.[desk])
  );
};

export const getMeta = (item) => {
  return {
    title: getTitle(item) || item?.keyObj?.cord,
    nickname: getNickname(item),
    description: getDescription(item),
    blurb: getBlurb(item),
    image: getImage(item),
    screenshots: getScreenshots(item),
    cover: getCover(item),
    ship: getShip(item),
    link: getLink(item),
    ethPrice: getEthPrice(item),
    color: getColor(item),
    version: getVersion(item),
    hash: getHash(item),
    servedFrom: getServedFrom(item),
    createdAt: getCreatedAt(item),
    struc: getStruc(item),
    ref: getRef(item),
    lens: getLens(item),
    distShip: getDistShip(item),
    keyStr: item?.keyStr,
    rating: item?.bespoke?.rating,
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
    case 'tip':
      return 'Tip';
    default:
      return item?.bespoke?.title;
  }
};
export const getNickname = (item) => {
  switch (item?.keyObj?.struc) {
    case 'ship':
      return item?.bespoke?.nickname;
    default:
      return getTitle(item);
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
    case 'tip':
      return `I just received a ${weiToEth(
        item?.bespoke?.['eth-amount']
      )} ETH tip from ${item?.bespoke?.tipper} 🤑🤑🤑`;
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
export const getScreenshots = (item) => {
  switch (item?.lens) {
    case 'def':
      return item?.bespoke?.screenshots;
    default:
      return [];
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
    case 'blog':
      return `${item?.bespoke?.uri}${item?.bespoke?.path}`;
    default:
      return item?.bespoke?.link;
  }
};
export const getEthPrice = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      return item?.bespoke?.['eth-price'];
    default:
      return '';
  }
};
export const getShip = (item) => {
  switch (item?.keyObj?.struc) {
    case 'app':
      if (item?.lens === 'def') return item?.keyObj?.ship;
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
        `/apps/${item?.bespoke?.treaty?.href?.glob?.base}`
      );
    default:
      return '';
  }
};
export const getCreatedAt = (item) => fromUrbitTime(item?.meta?.createdAt);
export const getStruc = (item) => item?.keyObj?.struc;
export const getRef = (item) => item?.bespoke?.ref;
export const getLens = (item) => item?.lens;
export const getDistShip = (item) => item?.bespoke?.signature?.ship;
export const getAnyLink = (string) => {
  return linkify.find(string)?.[0]?.href;
};
export const getAllLinks = (string) => {
  return linkify.find(string).map((l) => l.href);
};

export const isUrl = (s) => {
  if (
    /^(http[s]*:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=,]*)$/g.test(
      s
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const isImage = (s) => {
  return s.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
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

export const sendTransaction = async (to, value, data, chainId) => {
  let signer, provider;
  if (window.ethereum == null) {
    provider = ethers.getDefaultProvider(chainId);
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }
  if (!signer) {
    alert(
      'Make sure that you have an Ethereum browser wallet installed and unlocked'
    );
    return;
  }
  return signer.sendTransaction({ to, value, data, chainId });
};

export const isValidTxHash = (hash) => {
  return /^(0x){1}[0-9a-fA-F]{64}$/i.test(hash);
};

export const weiToEth = (wei) => {
  return new BigNumber(wei).dividedBy(new BigNumber(10).pow(18)).toString();
};

export const ethToWei = (eth) => {
  return new BigNumber(eth).multipliedBy(new BigNumber(10).pow(18)).toString();
};

export const isLightColor = (hex) => {
  let rgb = parseInt(hex, 16); // convert rrggbb to decimal
  let r = (rgb >> 16) & 0xff; // extract red
  let g = (rgb >> 8) & 0xff; // extract green
  let b = (rgb >> 0) & 0xff; // extract blue

  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  if (luma > 128) {
    return true;
  }
  return false;
};

// check events and display them to users if one is happening in the next 24 hrs
export const isHappeningSoon = (events) => {
  const currentTime = new Date();

  const updatedEvents = events.map((event) => {
    var startDate = new Date(event.startDate);
    let happeningSoon = false;
    const endDate = new Date(event.endDate);
    const frequency = event.frequency;
    var actualStartDate = new Date();

    // pad to translate "happening now" into "happening in next 24 hours"
    const paddedStartDate = new Date(event.startDate);
    paddedStartDate.setDate(startDate.getDate() - 1);

    // Check if the event or a future one happens in the next 24 hours
    if (paddedStartDate <= currentTime && currentTime <= endDate) {
      happeningSoon = true;
      actualStartDate = new Date(startDate);
    } else if (frequency === 'every other week') {
      const nextStartDate = new Date(paddedStartDate);
      nextStartDate.setDate(nextStartDate.getDate() + 14);
      const nextEndDate = new Date(endDate);
      nextEndDate.setDate(nextEndDate.getDate() + 14);

      // increment to next event and check again
      while (nextStartDate <= currentTime) {
        actualStartDate = new Date(nextStartDate);
        actualStartDate.setDate(actualStartDate.getDate() + 1);

        if (nextStartDate <= currentTime && currentTime <= nextEndDate) {
          happeningSoon = true;
        }
        nextStartDate.setDate(nextStartDate.getDate() + 14);
        nextEndDate.setDate(nextEndDate.getDate() + 14);
      }
    } else if (frequency === 'weekdays') {
      const currentDayOfWeek = currentTime.getDay();

      // strip times to compare times w/o dates
      const currentTimeStripped = new Date(
        0,
        0,
        0,
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds()
      );
      const endDateStripped = new Date(
        0,
        0,
        0,
        endDate.getHours(),
        endDate.getMinutes(),
        endDate.getSeconds()
      );
      const startDateStripped = new Date(
        0,
        0,
        0,
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds()
      );

      // from sunday after startTime until friday after endTime, it's happening within the next 24 hours
      if (
        (currentDayOfWeek >= 1 && currentDayOfWeek <= 4) ||
        (currentDayOfWeek === 5 && currentTimeStripped <= endDateStripped) ||
        (currentDayOfWeek === 0 && currentTimeStripped >= startDateStripped)
      ) {
        happeningSoon = true;
      }

      // figure out which event is happeningSoon
      actualStartDate = new Date(startDate);

      if (currentTimeStripped <= endDateStripped && currentDayOfWeek !== 0) {
        actualStartDate.setDate(
          actualStartDate.getDate() + currentDayOfWeek - 1
        );
      } else {
        actualStartDate.setDate(actualStartDate.getDate() + currentDayOfWeek);
      }
    }

    return { ...event, happeningSoon, actualStartDate };
  });

  // format for display
  const formattedEvents = updatedEvents.map((event) => {
    const date = new Date(event.actualStartDate);
    const options = {
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    } as const;
    const formattedStart = date.toLocaleString('en-US', options);

    return { ...event, formattedStart };
  });

  return [
    formattedEvents.some((event) => event.happeningSoon),
    formattedEvents,
  ];
};

export const formatId = (id) => {
  // add dots after every third character, starting from the end. first we strip
  // any dots from the string just to make sure
  const reversed = id.replace(/\./g, '').split('').reverse().join('');
  const groups = reversed.match(/.{1,3}/g);
  const joined = groups.join('.');
  const reversedAgain = joined.split('').reverse().join('');
  return reversedAgain;
};

//  /1/chan/chat/~sampel-dilryd-mopreg/new-channel/msg/~sampel-dilryd-mopreg/170.141.184.506.367.604.306.531.861.944.396.949.749
export const isChatPath = (path) => {
  return path.substring(0, 13) === '/1/chan/chat/';
};

// /1/chan/heap/~toptyr-bilder/links/curio/170141184506270899144208463636562182144
export const isCurioPath = (path) => {
  return path.substring(0, 13) === '/1/chan/heap/';
};

// /1/chan/diary/~nibset-napwyn/winter-updates/note/170141184506358297022415421669185159168
export const isNotePath = (path) => {
  return path.substring(0, 14) === '/1/chan/diary/';
};

// ~worpet-bildet/portal
// ~worpet-bildet/other-thing
export const isShortcode = (path) => {
  const parts = path.split('/');
  if (parts.length < 2) return false;
  return (
    parts.length === 2 &&
    isValidPatp(parts[0]) &&
    isValidDeskOrGroupPath(parts[1])
  );
};

//  /1/chan/chat/~sampel-dilryd-mopreg/new-channel/msg/~sampel-dilryd-mopreg/170.141.184.506.367.604.306.531.861.944.396.949.749
export const getChatDetails = (path) => {
  console.log({ path });
  const splut = path.split('/');
  return {
    host: splut[4],
    channel: splut[5],
    poster: splut[7],
    id: formatId(splut[8]),
  };
};

// /1/chan/heap/~toptyr-bilder/links/curio/170141184506270899144208463636562182144
export const getCurioDetails = (path) => {
  const splut = path.split('/');
  return {
    host: splut[4],
    channel: splut[5],
    id: formatId(splut[7]),
  };
};

// /1/chan/diary/~nibset-napwyn/winter-updates/note/170141184506358297022415421669185159168
export const getNoteDetails = (path) => {
  const splut = path.split('/');
  return {
    host: splut[4],
    channel: splut[5],
    id: formatId(splut[7]),
  };
};

// FROM
//  /1/chan/chat/~sampel-dilryd-mopreg/new-channel/msg/~sampel-dilryd-mopreg/170.141.184.506.367.604.306.531.861.944.396.949.749
// TO
//  /chat/~sampel-dilryd-mopreg/new-channel/writs/writ/id/~sampel-dilryd-mopreg/170.141.184.506.367.604.306.531.861.944.396.949.749
export const formatChatPath = (path) => {
  return path.replace('/1/chan', '').replace('/msg/', '/writs/writ/id/');
};

// FROM
// /1/chan/heap/~toptyr-bilder/links/curio/170141184506270899144208463636562182144
// TO
// /heap/~toptyr-bilder/links/curios/curio/id/170.141.184.506.270.899.144.208.463.636.562.182.144
export const formatCurioPath = (path) => {
  const p = path.replace('/1/chan', '').replace('/curio/', '/curios/curio/id/');
  const splut = p.split('/');
  // replace the last element in the path with the formatted id
  splut[splut.length - 1] = formatId(splut[splut.length - 1]);
  return splut.join('/');
};

// FROM
// /1/chan/diary/~nibset-napwyn/winter-updates/note/170141184506358297022415421669185159168
// TO
// /diary/~nibset-napwyn/winter-updates/notes/note/170.141.184.506.358.297.022.415.421.669.185.159.168
export const formatNotePath = (path) => {
  const p = path.replace('/1/chan', '').replace('/note/', '/notes/note/');
  const splut = p.split('/');
  // replace the last element in the path with the formatted id
  splut[splut.length - 1] = formatId(splut[splut.length - 1]);
  return splut.join('/');
};

export const isValidDeskOrGroupPath = (path) => {
  // return false if there are any non-alphanumeric characters other than a -
  if (path.match(/[^a-zA-Z0-9-]/g)) return false;
  return true;
};

// Most of the stuff below is stolen from Tlon's Landscape Apps repo
export function preSig(ship: string): string {
  if (!ship) return '';
  if (ship.trim().startsWith('~')) return ship.trim();
  return `~${ship.trim()}`;
}

export const collapseNames = (names: string[]): string => {
  names = Array.from(new Set(names));
  if (names.length === 1) return names.join();
  if (names.length === 2) return names[0] + ' and ' + names[1];
  if (names.length > 2)
    return names[0] + ' and ' + (names.length - 1) + ' others';
};

export const formatPatp = (patpLike) => {
  if (!patpLike) return;
  if (!isValidPatp(patpLike)) return;
  if (patpLike.slice(0, 1) !== '~') patpLike = `~${patpLike}`;
  const parts = patpLike.split('-');
  if (parts.length === 3) return `~${parts[1]}^${parts[2]}`;
  if (parts.length === 4) return `~${parts[2]}^${parts[3]}`;
  if (parts.length > 4) return `${parts[0]}_${parts[parts.length - 1]}`;
  return patpLike;
};

function normalizeText(text: string): string {
  const DISALLOWED_MENTION_CHARS = /[^\w\d-]/g;
  return text.replace(DISALLOWED_MENTION_CHARS, '');
}

// assumes already lowercased
function scoreEntry(filter: string, entry: fuzzy.FilterResult<string>): number {
  const parts = entry.string.split('~');

  // shouldn't happen
  if (parts.length === 1) {
    return entry.score;
  }

  const [nickname, ship] = parts;
  // downrank comets significantly
  const score = ship.length > 28 ? entry.score * 0.25 : entry.score;

  // making this highest because ships are unique, nicknames are not
  // also prevents someone setting their nickname as someone else's
  // patp taking over prime position
  if (ship === filter) {
    return score + 120;
  }

  if (nickname === filter) {
    return score + 100;
  }

  // since ship is in the middle of the string we need to make it work
  // as if it was at the beginning
  if (nickname && ship.startsWith(filter)) {
    return score + 80;
  }

  return score;
}

export const getPossiblePatps = (
  query: string,
  contacts: ContactRolodex
): string[] => {
  const sigged = preSig(query);
  const valid = isValidPatp(sigged);

  const contactNames = Object.keys(contacts);

  // fuzzy search both nicknames and patps; fuzzy#filter only supports
  // string comparision, so concat nickname + patp
  const searchSpace = Object.entries(contacts).map(([patp, contact]) =>
    `${normalizeText(contact?.nickname || '')}${patp}`.toLocaleLowerCase()
  );

  if (valid && !contactNames.includes(sigged)) {
    contactNames.push(sigged);
    searchSpace.push(sigged);
  }

  const normQuery = normalizeText(query).toLocaleLowerCase();
  const fuzzyNames = fuzzy.filter(normQuery, searchSpace).sort((a, b) => {
    const filter = deSig(query) || '';
    const right = scoreEntry(filter, b);
    const left = scoreEntry(filter, a);
    return right - left;
  });

  const items = fuzzyNames.map((entry) => contactNames[entry.index]);

  return items;
};
// Reference: https://github.com/mirtyl-wacdec/urbit_ex/blob/master/lib/api/utils.ex#LL260C14-L260C14
export const isValidPatp = (patp) => {
  if (!patp) return false;
  let _patp = '';
  if (/(^[~])/i.test(patp)) {
    _patp = patp;
  } else {
    _patp = `~${patp}`;
  }
  let _stripped = _patp.replace(/([~^-])/g, '');

  const checkPair = (pair) => {
    if (syllables.p.includes(pair[0]) && syllables.s.includes(pair[1])) {
      return true;
    }
  };

  const checkLong = (long) => {
    let join = long.join('');
    let pairs = join.match(/(.{6})/g).map((p) => p.match(/(.{3})/g));
    for (let pair of pairs) {
      if (!checkPair(pair)) return false;
    }
    return true;
  };

  if (
    _stripped.length > 2 &&
    _stripped.length < 49 &&
    _stripped.length % 3 === 0
  ) {
    let _syllables = _stripped.match(/(.{3})/g);
    if (_syllables.length === 1 && syllables.p.includes(_syllables[0]))
      return _patp;
    if (_syllables.length === 2 && checkPair(_syllables)) return _patp;
    if (_syllables.length % 2 === 0 && checkLong(_syllables)) return _patp;
  } else {
    return false;
  }
};

const syllables = {
  p: [
    'doz',
    'mar',
    'bin',
    'wan',
    'sam',
    'lit',
    'sig',
    'hid',
    'fid',
    'lis',
    'sog',
    'dir',
    'wac',
    'sab',
    'wis',
    'sib',
    'rig',
    'sol',
    'dop',
    'mod',
    'fog',
    'lid',
    'hop',
    'dar',
    'dor',
    'lor',
    'hod',
    'fol',
    'rin',
    'tog',
    'sil',
    'mir',
    'hol',
    'pas',
    'lac',
    'rov',
    'liv',
    'dal',
    'sat',
    'lib',
    'tab',
    'han',
    'tic',
    'pid',
    'tor',
    'bol',
    'fos',
    'dot',
    'los',
    'dil',
    'for',
    'pil',
    'ram',
    'tir',
    'win',
    'tad',
    'bic',
    'dif',
    'roc',
    'wid',
    'bis',
    'das',
    'mid',
    'lop',
    'ril',
    'nar',
    'dap',
    'mol',
    'san',
    'loc',
    'nov',
    'sit',
    'nid',
    'tip',
    'sic',
    'rop',
    'wit',
    'nat',
    'pan',
    'min',
    'rit',
    'pod',
    'mot',
    'tam',
    'tol',
    'sav',
    'pos',
    'nap',
    'nop',
    'som',
    'fin',
    'fon',
    'ban',
    'mor',
    'wor',
    'sip',
    'ron',
    'nor',
    'bot',
    'wic',
    'soc',
    'wat',
    'dol',
    'mag',
    'pic',
    'dav',
    'bid',
    'bal',
    'tim',
    'tas',
    'mal',
    'lig',
    'siv',
    'tag',
    'pad',
    'sal',
    'div',
    'dac',
    'tan',
    'sid',
    'fab',
    'tar',
    'mon',
    'ran',
    'nis',
    'wol',
    'mis',
    'pal',
    'las',
    'dis',
    'map',
    'rab',
    'tob',
    'rol',
    'lat',
    'lon',
    'nod',
    'nav',
    'fig',
    'nom',
    'nib',
    'pag',
    'sop',
    'ral',
    'bil',
    'had',
    'doc',
    'rid',
    'moc',
    'pac',
    'rav',
    'rip',
    'fal',
    'tod',
    'til',
    'tin',
    'hap',
    'mic',
    'fan',
    'pat',
    'tac',
    'lab',
    'mog',
    'sim',
    'son',
    'pin',
    'lom',
    'ric',
    'tap',
    'fir',
    'has',
    'bos',
    'bat',
    'poc',
    'hac',
    'tid',
    'hav',
    'sap',
    'lin',
    'dib',
    'hos',
    'dab',
    'bit',
    'bar',
    'rac',
    'par',
    'lod',
    'dos',
    'bor',
    'toc',
    'hil',
    'mac',
    'tom',
    'dig',
    'fil',
    'fas',
    'mit',
    'hob',
    'har',
    'mig',
    'hin',
    'rad',
    'mas',
    'hal',
    'rag',
    'lag',
    'fad',
    'top',
    'mop',
    'hab',
    'nil',
    'nos',
    'mil',
    'fop',
    'fam',
    'dat',
    'nol',
    'din',
    'hat',
    'nac',
    'ris',
    'fot',
    'rib',
    'hoc',
    'nim',
    'lar',
    'fit',
    'wal',
    'rap',
    'sar',
    'nal',
    'mos',
    'lan',
    'don',
    'dan',
    'lad',
    'dov',
    'riv',
    'bac',
    'pol',
    'lap',
    'tal',
    'pit',
    'nam',
    'bon',
    'ros',
    'ton',
    'fod',
    'pon',
    'sov',
    'noc',
    'sor',
    'lav',
    'mat',
    'mip',
    'fip',
  ],
  s: [
    'zod',
    'nec',
    'bud',
    'wes',
    'sev',
    'per',
    'sut',
    'let',
    'ful',
    'pen',
    'syt',
    'dur',
    'wep',
    'ser',
    'wyl',
    'sun',
    'ryp',
    'syx',
    'dyr',
    'nup',
    'heb',
    'peg',
    'lup',
    'dep',
    'dys',
    'put',
    'lug',
    'hec',
    'ryt',
    'tyv',
    'syd',
    'nex',
    'lun',
    'mep',
    'lut',
    'sep',
    'pes',
    'del',
    'sul',
    'ped',
    'tem',
    'led',
    'tul',
    'met',
    'wen',
    'byn',
    'hex',
    'feb',
    'pyl',
    'dul',
    'het',
    'mev',
    'rut',
    'tyl',
    'wyd',
    'tep',
    'bes',
    'dex',
    'sef',
    'wyc',
    'bur',
    'der',
    'nep',
    'pur',
    'rys',
    'reb',
    'den',
    'nut',
    'sub',
    'pet',
    'rul',
    'syn',
    'reg',
    'tyd',
    'sup',
    'sem',
    'wyn',
    'rec',
    'meg',
    'net',
    'sec',
    'mul',
    'nym',
    'tev',
    'web',
    'sum',
    'mut',
    'nyx',
    'rex',
    'teb',
    'fus',
    'hep',
    'ben',
    'mus',
    'wyx',
    'sym',
    'sel',
    'ruc',
    'dec',
    'wex',
    'syr',
    'wet',
    'dyl',
    'myn',
    'mes',
    'det',
    'bet',
    'bel',
    'tux',
    'tug',
    'myr',
    'pel',
    'syp',
    'ter',
    'meb',
    'set',
    'dut',
    'deg',
    'tex',
    'sur',
    'fel',
    'tud',
    'nux',
    'rux',
    'ren',
    'wyt',
    'nub',
    'med',
    'lyt',
    'dus',
    'neb',
    'rum',
    'tyn',
    'seg',
    'lyx',
    'pun',
    'res',
    'red',
    'fun',
    'rev',
    'ref',
    'mec',
    'ted',
    'rus',
    'bex',
    'leb',
    'dux',
    'ryn',
    'num',
    'pyx',
    'ryg',
    'ryx',
    'fep',
    'tyr',
    'tus',
    'tyc',
    'leg',
    'nem',
    'fer',
    'mer',
    'ten',
    'lus',
    'nus',
    'syl',
    'tec',
    'mex',
    'pub',
    'rym',
    'tuc',
    'fyl',
    'lep',
    'deb',
    'ber',
    'mug',
    'hut',
    'tun',
    'byl',
    'sud',
    'pem',
    'dev',
    'lur',
    'def',
    'bus',
    'bep',
    'run',
    'mel',
    'pex',
    'dyt',
    'byt',
    'typ',
    'lev',
    'myl',
    'wed',
    'duc',
    'fur',
    'fex',
    'nul',
    'luc',
    'len',
    'ner',
    'lex',
    'rup',
    'ned',
    'lec',
    'ryd',
    'lyd',
    'fen',
    'wel',
    'nyd',
    'hus',
    'rel',
    'rud',
    'nes',
    'hes',
    'fet',
    'des',
    'ret',
    'dun',
    'ler',
    'nyr',
    'seb',
    'hul',
    'ryl',
    'lud',
    'rem',
    'lys',
    'fyn',
    'wer',
    'ryc',
    'sug',
    'nys',
    'nyl',
    'lyn',
    'dyn',
    'dem',
    'lux',
    'fed',
    'sed',
    'bec',
    'mun',
    'lyr',
    'tes',
    'mud',
    'nyt',
    'byr',
    'sen',
    'weg',
    'fyr',
    'mur',
    'tel',
    'rep',
    'teg',
    'pec',
    'nel',
    'nev',
    'fes',
  ],
};
