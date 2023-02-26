import React, { useState, useEffect } from "react";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import groupsIcon from "../../assets/icon-groups.svg";
import tildeIcon from "../../assets/tilde.svg";
import { checkUrl } from "../../utils/format";

export const ItemImage = ({ src, patp, type, container, name, color, onError }) => {
  const [imageSize, setImageSize] = useState(0);
  useEffect(() => {
    setImageSize(container?.current?.clientWidth);
  }, [container]);

  if (!src && patp && patp.length <= "14") {
    return (
      <>
        {sigil({
          patp,
          renderer: reactRenderer,
          size: imageSize,
          colors: ["black", "white"],
        })}
      </>
    );
  }
  if (!src && patp && patp?.length > "14") {
    src = defaultImg.ship;
  }
  if (!checkUrl(src)) {
    src = defaultImg[type];
  }
  if (!checkUrl(getImageSrc(src, type))) {
    src = defaultImg[type];
  }
  if (type && type !== "ship" && src === defaultImg[type]) {
    return (
      <div
        className="flex flex-col justify-center items-center w-full h-full rounded-lg bg-black text-5xl"
        style={{
          height: `${imageSize}px` || `0px`,
          backgroundColor: `#${color}` || "#000000",
          color: `#${invertHex(color)}`,
        }}
      >
        {name &&
          name
            .toLowerCase()
            .split(" ")
            .map(n => n.slice(0, 1))
            .filter(n => /^[a-z0-9]+$/i.test(n))
            .join("")}
      </div>
    );
  }
  return (
    <img
      className="w-full pt-100 object-cover rounded-lg bg-gray-200"
      src={getImageSrc(src, type)}
      alt={`${type}-image`}
      onError={() => onError(true)}
      style={{ height: `${imageSize}px` || `0px` }}
    />
  );
};

export const defaultImg = {
  group: groupsIcon,
  app: tildeIcon,
  ship: tildeIcon,
  other: tildeIcon,
};

export const getImageSrc = (src, type) => (src ? src : defaultImg[type]);

function invertHex(hex) {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).slice(1).toUpperCase();
}
