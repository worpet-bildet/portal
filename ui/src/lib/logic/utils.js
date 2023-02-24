import { useState, useCallback } from "react";
import ob from "urbit-ob";
import { unixToDa } from "@urbit/api";
import { formatUv } from "@urbit/aura";
import anyAscii from "any-ascii";
import { format, differenceInDays, endOfToday } from "date-fns";
import _ from "lodash";
import f from "lodash/fp";
import { parseToRgba } from "color2k";

export const isTalk = import.meta.env.VITE_APP === "chat";

export function nestToFlag(nest) {
  const [app, ...rest] = nest.split("/");
  return [app, rest.join("/")];
}

export function sampleQuippers(quips) {
  return _.flow(
    f.map(([, q]) => q.memo.author),
    f.compact,
    f.uniq,
    f.take(3)
  )(quips.size ? [...quips] : []);
}

export function renderRank(rank, plural = false) {
  if (rank === "czar") {
    return plural ? "Galaxies" : "Galaxy";
  }
  if (rank === "king") {
    return plural ? "Stars" : "Star";
  }
  if (rank === "duke") {
    return plural ? "Planets" : "Planet";
  }
  if (rank === "earl") {
    return plural ? "Moons" : "Moon";
  }
  return plural ? "Comets" : "Comet";
}

/**
 * Processes a string to make it `@tas` compatible
 */
export function strToSym(str) {
  const ascii = anyAscii(str);
  return ascii.toLowerCase().replaceAll(/[^a-zA-Z0-9-]/g, "-");
}

export function channelHref(flag, ch) {
  return `/groups/${flag}/channels/${ch}`;
}

export function makePrettyTime(date) {
  return format(date, "HH:mm");
}

export function makePrettyDay(date) {
  const diff = differenceInDays(endOfToday(), date);
  switch (diff) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default:
      return `${format(date, "LLLL")} ${format(date, "do")}`;
  }
}

export function makePrettyDate(date) {
  return `${format(date, "PPP")}`;
}

export function makePrettyDayAndTime(date) {
  const diff = differenceInDays(endOfToday(), date);
  const time = makePrettyTime(date);
  switch (true) {
    case diff === 0:
      return `Today • ${time}`;
    case diff === 1:
      return `Yesterday • ${time}`;
    case diff > 1 && diff < 8:
      return `${format(date, "cccc")} • ${time}`;
    default:
      return `${format(date, "LLLL")} ${format(date, "do")} • ${time}`;
  }
}

export function makePrettyDayAndDateAndTime(date) {
  const diff = differenceInDays(endOfToday(), date);
  const time = makePrettyTime(date);
  const fullDate = `${format(date, "LLLL")} ${format(date, "do")}, ${format(
    date,
    "yyyy"
  )}`;
  switch (true) {
    case diff === 0:
      return `Today • ${time} • ${fullDate}`;
    case diff === 1:
      return `Yesterday • ${time} • ${fullDate}`;
    case diff > 1 && diff < 8:
      return `${format(date, "cccc")} • ${time} • ${fullDate}`;
    default:
      return `${fullDate} • ${time}`;
  }
}

export function whomIsDm(whom) {
  return whom.startsWith("~") && !whom.match("/");
}

// ship + term, term being a @tas: lower-case letters, numbers, and hyphens
export function whomIsFlag(whom) {
  return (
    /^~[a-z-]+\/[a-z]+[a-z0-9-]*$/.test(whom) && ob.isValidPatp(whom.split("/")[0])
  );
}

export function whomIsMultiDm(whom) {
  return whom.startsWith(`0v`);
}

export function normalizeUrbitColor(color) {
  if (color.startsWith("#")) {
    return color;
  }
  const colorString = color.slice(2).replace(".", "").toUpperCase();
  const lengthAdjustedColor = _.padStart(colorString, 6, "0");
  return `#${lengthAdjustedColor}`;
}

export function isColor(color) {
  try {
    parseToRgba(color);
    return true;
  } catch (error) {
    return false;
  }
}

export function pluralize(word, count) {
  if (count === 1) {
    return word;
  }
  return `${word}s`;
}

export function createStorageKey(name) {
  const desk = window?.desk?.length ? window.desk : "portal";
  return `~${window.ship}/${desk}/${name}`;
}

// for purging storage with version updates
export function clearStorageMigration() {
  return {};
}

export const storageVersion = parseInt(import.meta.env.VITE_STORAGE_VERSION, 10);

export function preSig(ship) {
  if (!ship) {
    return "";
  }
  if (ship.trim().startsWith("~")) {
    return ship.trim();
  }
  return "~".concat(ship.trim());
}

export function newUv(seed = Date.now()) {
  return formatUv(unixToDa(seed));
}

export function getSectTitle(cabals, sect) {
  return cabals[sect]?.meta.title || sect;
}

export function getFlagParts(flag) {
  const parts = flag.split("/");
  return {
    ship: parts[0],
    name: parts[1],
  };
}

export function getPrivacyFromCordon(cordon) {
  if ("shut" in cordon) {
    return "private";
  }
  return "public";
}

export function getPrivacyFromPreview(preview) {
  if (preview.secret) {
    return "secret";
  }
  return getPrivacyFromCordon(preview.cordon);
}

export function getPrivacyFromGroup(group) {
  if (group.secret) {
    return "secret";
  }
  return getPrivacyFromCordon(group.cordon);
}

export function getPrivacyFromChannel(groupChannel, channel) {
  if (!groupChannel || !channel) {
    return "public";
  }
  if (groupChannel.readers.includes("admin")) {
    return "secret";
  }
  if (channel.perms.writers.includes("admin")) {
    return "read-only";
  }
  return "public";
}

export function pluralRank(rank) {
  switch (rank) {
    case "galaxy":
      return "galaxies";
    default:
      return `${rank}s`;
  }
}

export function rankToClan(rank) {
  switch (rank) {
    case "czar":
      return "galaxy";
    case "king":
      return "star";
    case "duke":
      return "planet";
    case "earl":
      return "moon";
    default:
      return "comet";
  }
}

export function matchesBans(cordon, ship) {
  const siggedShip = preSig(ship);
  if (!("open" in cordon)) {
    return null;
  }
  if (cordon.open.ships.includes(siggedShip)) {
    return "ship";
  }
  const clan = ob.clan(siggedShip);
  if (cordon.open.ranks.map(rankToClan).includes(clan)) {
    return clan;
  }
  return null;
}

export function toTitleCase(s) {
  if (!s) {
    return "";
  }
  return s
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function randomElement(a) {
  return a[Math.floor(Math.random() * a.length)];
}

export function randomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function hasKeys(obj) {
  return Object.keys(obj).length > 0;
}

export const IMAGE_REGEX =
  /(\.jpg|\.img|\.png|\.gif|\.tiff|\.jpeg|\.webp|\.webm|\.svg)$/i;

export const AUDIO_REGEX = /(\.mp3|\.wav|\.ogg|\.m4a)$/i;

export const VIDEO_REGEX = /(\.mov|\.mp4|\.ogv)$/i;

export const URL_REGEX = /(https?:\/\/[^\s]+)/i;

export const PATP_REGEX = /(~[a-z0-9-]+)/i;

export const IMAGE_URL_REGEX =
  /^(http(s?):)([/|.|\w|\s|-]|%2*)*\.(?:jpg|img|png|gif|tiff|jpeg|webp|webm|svg)$/i;

export const REF_REGEX = /\/1\/(chan|group|desk)\/[^\s]+/g;
// sig and hep explicitly left out

export const PUNCTUATION_REGEX = /[.,/#!$%^&*;:{}=_`()]/g;

export function isImageUrl(url) {
  return IMAGE_URL_REGEX.test(url);
}

export function isRef(text) {
  return REF_REGEX.test(text);
}

export function isValidUrl(str) {
  return str ? !!URL_REGEX.test(str) : false;
}
const isFacebookGraphDependent = url => {
  const caseDesensitizedURL = url.toLowerCase();
  return (
    caseDesensitizedURL.includes("facebook.com") ||
    caseDesensitizedURL.includes("instagram.com")
  );
};

export const validOembedCheck = (embed, url) => {
  if (!isFacebookGraphDependent(url)) {
    if (embed?.html) {
      return true;
    }
  }
  return false;
};

export async function jsonFetch(info, init) {
  const res = await fetch(info, init);
  if (!res.ok) {
    throw new Error("Bad Fetch Response");
  }
  const data = await res.json();
  return data;
}

export function isChannelJoined(nest, briefs) {
  const [, chFlag] = nestToFlag(nest);
  const isChannelHost = window.our === chFlag?.split("/")[0];
  return isChannelHost || (nest && nest in briefs);
}

export function getChannelHosts(group) {
  return Object.keys(group.channels).map(c => {
    const [, chFlag] = nestToFlag(c);
    const { ship } = getFlagParts(chFlag);
    return ship;
  });
}

export function canReadChannel(channel, vessel, bloc = []) {
  if (channel.readers.length === 0) {
    return true;
  }
  return _.intersection([...channel.readers, ...bloc], vessel.sects).length > 0;
}

export function canWriteChannel(perms, vessel, bloc = []) {
  if (perms.writers.length === 0) {
    return true;
  }
  return _.intersection([...perms.writers, ...bloc], vessel.sects).length > 0;
}
/**
 * Since there is no metadata persisted in a curio to determine what kind of
 * curio it is (Link or Text), this function determines by checking the
 * content's structure.
 *
 * @param content CurioContent
 * @returns boolean
 */

export function isLinkCurio({ inline }) {
  return inline.length === 1 && typeof inline[0] === "object" && "link" in inline[0];
}

export function linkFromCurioContent(content) {
  if (isLinkCurio(content)) {
    return content.inline[0];
  }
  return "";
}

export function citeToPath(cite) {
  if ("desk" in cite) {
    return `/1/desk/${cite.desk.flag}${cite.desk.where}`;
  }
  if ("chan" in cite) {
    return `/1/chan/${cite.chan.nest}${cite.chan.where}`;
  }
  if ("group" in cite) {
    return `/1/group/${cite.group}`;
  }
  return `/1/bait/${cite.bait.group}/${cite.bait.graph}/${cite.bait.where}`;
}

export function pathToCite(path) {
  const segments = path.split("/");
  if (segments.length < 3) {
    return undefined;
  }
  const [, ver, kind, ...rest] = segments;
  if (ver !== "1") {
    return undefined;
  }
  if (kind === "chan") {
    if (rest.length < 3) {
      return undefined;
    }
    const nest = rest.slice(0, 3).join("/");
    return {
      chan: {
        nest,
        where: `/${rest.slice(3).join("/")}` || "/",
      },
    };
  }
  if (kind === "desk") {
    if (rest.length < 2) {
      return undefined;
    }
    const flag = rest.slice(0, 2).join("/");
    return {
      desk: {
        flag,
        where: `/${rest.slice(2).join("/")}` || "/",
      },
    };
  }
  if (kind === "group") {
    if (rest.length !== 2) {
      return undefined;
    }
    return {
      group: rest.join("/"),
    };
  }
  return undefined;
}

export async function writeText(str) {
  try {
    return await new Promise((resolve, reject) => {
      const range = document.createRange();
      range.selectNodeContents(document.body);
      document?.getSelection()?.addRange(range);
      let success = false;
      function listener(e) {
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
        success = true;
      }
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
      document?.getSelection()?.removeAllRanges();
      if (success) {
        resolve();
      } else {
        reject();
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export function useCopy(copied) {
  const [didCopy, setDidCopy] = useState(false);
  const doCopy = useCallback(() => {
    writeText(copied);
    setDidCopy(true);
    setTimeout(() => {
      setDidCopy(false);
    }, 2000);
  }, [copied]);
  return { doCopy, didCopy };
}

export function getNestShip(nest) {
  const [, flag] = nestToFlag(nest);
  const { ship } = getFlagParts(flag);
  return ship;
}

export function isChannelImported(nest, pending) {
  const isImport = nest in pending;
  return (
    !isImport || (isImport && pending[nest]) || window.our === getNestShip(nest)
  );
}
