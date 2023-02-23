import React, { useEffect, useState, useRef } from "react";
// TODO: do we need this?
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    const isShipUser = location.pathname.split("/")[3] === "usr";
    setIsUser(isShipUser);
  }, [location.pathname]);

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
      {/* <Link
        to={`/apps/portal/${!isUser ? `dev` : `usr`}/apps/${getAppUriKey(keys)}`}
        className="w-full mr-4 rounded"
      > */}
      <div
        onClick={() => setModalIsOpen(true)}
        className="w-full mr-4 rounded cursor-pointer"
      >
        <div className="flex flex-col flex-auto justify-between">
          <div className="flex flex-col">
            <div
              className="flex-none relative w-55 h-55 rounded-lg bg-gray-200 overflow-hidden"
              ref={imageContainerRef}
            >
              {!imageError ? (
                <ItemImage
                  src={getImage() || shortTitle}
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
      {
        // TODO: do we need this?
      }
      {!isUser ? (
        <div className="flex">
          <div className="relative">
            <Link
              to={`/apps/portal/dev/edit-app/${getAppUriKey(keys)}`}
              className="absolute right-32 top-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-2 px-5"
            >
              edit
            </Link>
          </div>
        </div>
      ) : null}
    </li>
  ) : null;
}
