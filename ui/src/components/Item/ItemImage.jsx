import React, { useState, useEffect } from "react";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import groupsIcon from "../../assets/icon-groups.svg";
import tildeIcon from "../../assets/tilde.svg";
import { checkUrl } from "../../utils/format";

export const ItemImage = ({ src, patp, type, container, onError }) => {
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
  if (!type) type = "other";
  return (
    <img
      className="w-full pt-100 object-cover"
      src={getImageSrc(src, type)}
      alt={`${type}-image`}
      onError={() => onError(true)}
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
