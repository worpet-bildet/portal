import React from "react";
import groupsIcon from "../../assets/icon-groups.svg";
import tildeIcon from "../../assets/tilde.svg";

export const ItemImage = ({ src, type, onError }) => (
  <img
    className="h-full w-full object-cover"
    src={getImageSrc(src, type)}
    alt={`${type}-image`}
    onError={() => onError(true)}
  />
);

export const defaultImg = {
  group: groupsIcon,
  app: tildeIcon,
  ship: tildeIcon,
  other: tildeIcon,
};

export const getImageSrc = (src, type) => (src ? src : defaultImg[type]);
