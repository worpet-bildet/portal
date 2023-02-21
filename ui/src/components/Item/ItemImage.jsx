import React from "react";
import { sigil, reactRenderer } from '@tlon/sigil-js'
import groupsIcon from "../../assets/icon-groups.svg";
import tildeIcon from "../../assets/tilde.svg";

export const ItemImage = ({ src, type, onError }) => {
  if (type === 'ship') {
    return (
      <>
      {
        sigil({
          patp: src,
          renderer: reactRenderer,
          size: '160', // TODO: figure out how to make this dynamic
          colors: ['black', 'white'],
        })
      }
      </>
    )
  }
  return (
    <img
      className="h-full w-full object-cover"
      src={getImageSrc(src, type)}
      alt={`${type}-image`}
      onError={() => onError(true)}
    />
  );
}

export const defaultImg = {
  group: groupsIcon,
  app: tildeIcon,
  ship: tildeIcon,
  other: tildeIcon,
};

export const getImageSrc = (src, type) => (src ? src : defaultImg[type]);
