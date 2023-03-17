import React, { useEffect, useState, useRef } from "react";
// TODO: do we need this?
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";

import { getTitles } from "../../utils/format";
import { getWebsite } from "../../utils/format";
import { getDescription } from "../../utils/format";

import { ItemModal } from "./ItemModal";
import { ItemImage } from "./ItemImage";

export function ItemTile(props) {
  const { data, __val, itemType, userGroupData } = props;
  const [shortTitle, longTitle] = getTitles(__val, itemType);
  const description = getDescription(__val, itemType);
  const website = getWebsite(__val, itemType);
  const pictures = data?.general?.pictures || [];
  const tags = data?.general?.tags || [];
  const ship = data?.bespoke?.keyObj?.ship;
  const cord = data?.bespoke?.keyObj?.cord;
  const nameKey = `${ship}/${cord}`;
  const [imageError, setImageError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

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
  const getItemType = () => props.itemType || data?.general?.type || "other";
  useEffect(() => {
    if (userGroupData[nameKey]) {
      setIsJoined(true);
    }
  }, [userGroupData, nameKey]);
  // TODO: hacky, should do this in a better way
  const getImage = () => {
    return (
      data?.general?.image ||
      data?.icon?.src ||
      data?.bespoke?.payload?.docket?.image ||
      data?.bespoke?.payload?.image ||
      userGroupData[nameKey]?.meta?.image
    );
  };

  const getColor = () => data?.bespoke?.payload?.color?.split(".").join("").substring(2);
  return data ? (
    <li className={`flex mr-5 text-sm leading-tight ${isJoined ? `"` : ""}`}>
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
        >
          <ItemModal
            title={shortTitle}
            path={longTitle}
            description={description}
            website={website}
            pictures={pictures}
            tags={tags}
            image={getImage()}
            type={getItemType()}
            onRequestClose={() => setModalIsOpen(false)}
            data={data}
            buttonDisabled={isJoined}
          ></ItemModal>
        </Modal>
      )}
      <div
        onClick={() => {
          if (getItemType() === "ship") {
            window.scrollTo(0, 0);
            return navigate(`/${shortTitle}`);
          }
          setModalIsOpen(true);
        }}
        className="w-full rounded cursor-pointer"
      >
        <div className="flex flex-col flex-auto justify-between">
          <div className="flex flex-col">
            <div
              className={`flex-none relative overflow-hidden rounded-2xl w-44 h-44`}
              ref={imageContainerRef}
            >
              {!imageError ? (
                <ItemImage
                  src={getImage() || null}
                  patp={getItemType() === "ship" ? shortTitle : null}
                  container={imageContainerRef}
                  type={getItemType()}
                  name={shortTitle}
                  color={getColor()}
                  onError={setImageError}
                />
              ) : null}
            </div>
            <div className="flex flex-col w-40 space-y-2">
              <div className="text-base mt-2 font-bold line-clamp-3 text-ellipsis">
                {shortTitle}
              </div>
              <div className="text-xs line-clamp-3 text-gray-400 text-ellipsis">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  ) : null;
}
