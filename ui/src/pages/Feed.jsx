import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import { NavLink } from "react-router-dom";
import * as timeago from "timeago.js";
import { getFeedItems, useStore } from "@state/store";
import { useGroupState } from "@lib/state/groups/groups";
import {
  fromUrbitTime,
  getImage,
  getDescription,
  getShortTitle,
  getLongTitle,
  getType,
  getColor,
} from "@utils/format";
import { ItemImage } from "@components/Item/ItemImage";
import { ItemModal } from "@components/Item/ItemModal";

export const Feed = () => {
  const navigate = useNavigate();
  const { groups } = useGroupState();
  const feed = useStore(getFeedItems);

  const renderSigil = patp => {
    return sigil({
      patp: patp?.length < "14" ? patp : "worpet-bildet",
      renderer: reactRenderer,
      size: "50",
      colors: ["black", "white"],
    });
  };

  const FeedItem = ({ item, index }) => {
    if (getType(item) !== "ship" && !item.data) return <></>;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    if (groups[item.keyStr]) {
      setIsJoined(true);
    }
    const imageContainerRef = useRef();
    return (
      <div
        className={`py-10 px-10 border-gray-700 border border-b ${
          index === 0 ? "rounded-t-xl" : "border-t-0"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center pb-1">
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center">
              <div className="mr-4">{renderSigil(item.ship)}</div>
              <div>
                <div className="flex flex-row">
                  <NavLink to={`/${item.ship}`}>
                    <span className="text-blue-500">{item.ship}</span>
                  </NavLink>
                  <div className="text-gray-400 ml-1">
                    · {timeago.format(fromUrbitTime(item.time))}
                  </div>
                </div>
                <div className="pl-1 text-gray-400"> %{getType(item)}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-row justify-between items-center p-0 md:p-5 rounded-xl cursor-pointer hover:bg-gray-500"
          onClick={() => {
            if (getType(item) === "ship") {
              return navigate(`/${item.keyObj.ship}`);
            }
            setModalIsOpen(true);
          }}
        >
          <div className="flex flex-col items-start md:flex-row md:items-center">
            <div className="flex flex-row items-center w-44 h-44" ref={imageContainerRef}>
              <ItemImage
                src={getImage(item.data)}
                patp={getType(item) === "ship" ? item.keyObj?.ship : null}
                type={getType(item)}
                name={getShortTitle(item)}
                container={imageContainerRef}
                color={getColor(item.data)}
              />
            </div>
            <div>
              <div className="md:ml-3">
                <div className="text-xl font-bold">{getShortTitle(item)}</div>
                <div>{getDescription(item)}</div>
              </div>
            </div>
          </div>
        </div>
        {getType(item) !== "ship" && (
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
              title={getShortTitle(item)}
              path={getLongTitle(item)}
              description={getDescription(item)}
              image={getImage(item.data)}
              type={getType(item)}
              onRequestClose={() => setModalIsOpen(false)}
              data={item.data}
              buttonDisabled={isJoined}
            ></ItemModal>
          </Modal>
        )}
      </div>
    );
  };

  return (
    <div className="w-3/4 h-full py-12">
      <div className="text-2xl font-bold pb-5">Latest Activity</div>
      {feed.length === 0 ? (
        <>Loading...</>
      ) : (
        feed
          .map(f => f) // clone so we can sort
          .filter(f => !!f)
          .sort((a, b) => a.time - b.time)
          .map((f, i) => {
            return <FeedItem key={f.time} item={f} index={i} />;
          })
      )}
    </div>
  );
};
