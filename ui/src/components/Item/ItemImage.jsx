import React, { useState, useEffect } from "react";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import groupsIcon from "../../assets/icon-groups.svg";
import tildeIcon from "../../assets/tilde.svg";

export const ItemImage = ({ src, type, container, onError }) => {
  const [imageSize, setImageSize] = useState(0);
  useEffect(() => {
    setImageSize(container?.current?.clientWidth);
  }, [container]);

  if (type === "ship") {
    return (
      <>
        {sigil({
          patp: src,
          renderer: reactRenderer,
          size: imageSize,
          colors: ["black", "white"],
        })}
      </>
    );
  }
  return (
    <img
      className="h-full w-full object-cover"
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
