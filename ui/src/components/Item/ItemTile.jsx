import React, { useEffect, useState, useRef } from "react";
// TODO: do we need this?
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";

import { getTitles } from "../../utils/format";

// TODO: do we need this?
import { Tag } from "../Tag";

import { ItemModal } from "./ItemModal";
import { ItemImage } from "./ItemImage";

export function ItemTile(props) {
  const { keys, data, item, __val, itemType } = props;
  const [shortTitle, longTitle] = getTitles(__val, itemType);
  const description = data?.general?.description || "";
  const pictures = data?.general?.pictures || [];
  const tags = data?.general?.tags || [];
  const [imageError, setImageError] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  // We use this to ensure the sigil is the correct size, since we need to
  // specify it in pixels
  const imageContainerRef = useRef();

  const formatAppUriKey = ({ keyStr, ship, type, cord }) => {
    const appUriKey = (
      keyStr ? keyStr.slice(1) : `${ship}${type}${cord?.replaceAll(".", "-")}`
    ).replaceAll("/", "_");

    return appUriKey;
  };
  const _getAppUriKey = ({ keyStr, keyObj }) => {
    return formatAppUriKey({ keyStr, ...keyObj });
  };
  const getKeys = _keys => ({
    keyStr: _keys?.keyStr || props.keyStr || props.item.keyStr,
    keyObj: _keys?.keyObj || props.keyObj || props.item.keyObj,
  });
  const getAppUriKey = _keys => _getAppUriKey(getKeys(_keys));
  const getItemType = () => props.itemType || data?.general?.type || "other";
  const getImage = () =>
    data?.general?.image ||
    data?.icon?.src ||
    data?.bespoke?.payload?.docket?.image ||
    data?.bespoke?.payload?.image;
  return data ? (
    <li className="flex space-x-3 text-sm leading-tight">
      {/* TODO: Think about wrapping this modal so there is no need for inline style here */}
      {getItemType() !== "ship" && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
          contentLabel="Item Modal"
          style={{
            content: {
              position: "relative",
              margin: "20px",
              inset: 0,
              display: "none", // wtf
            },
          }}
          // className="relative bg-white"
        >
          <ItemModal
            title={shortTitle}
            path={longTitle}
            description={description}
            pictures={pictures}
            tags={tags}
            image={getImage()}
            type={getItemType()}
            onRequestClose={() => setModalIsOpen(false)}
          ></ItemModal>
        </Modal>
      )}
      {/* <Link
        to={`/apps/portal/${!isUser ? `dev` : `usr`}/apps/${getAppUriKey(keys)}`}
        className="w-full mr-4 rounded"
      > */}
      <div
        onClick={() => {
          if (getItemType() === "ship") {
            window.scrollTo(0, 0);
            return navigate(`/apps/portal/${shortTitle}`);
          }
          setModalIsOpen(true);
        }}
        className="w-full mr-4 rounded cursor-pointer"
      >
        <div className="flex flex-col flex-auto justify-between">
          <div className="flex flex-col">
            <div
              className={`flex-none relative rounded-lg bg-gray-200 overflow-hidden ${
                getItemType() === "ship" ? "w-56 h-56" : "w-44 h-44"
              }`}
              ref={imageContainerRef}
            >
              {!imageError ? (
                <ItemImage
                  src={getImage() || null}
                  patp={getItemType() === "ship" ? shortTitle : null}
                  container={imageContainerRef}
                  type={getItemType()}
                  onError={setImageError}
                />
              ) : null}
            </div>
            <div className="flex flex-col w-40">
              <div className="text-base mt-2 font-bold">{shortTitle}</div>
              <div className="text-xs line-clamp-3 text-ellipsis">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  ) : null;
}
