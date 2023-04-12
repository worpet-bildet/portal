import React, { useEffect, useRef, useState } from "react";
import reactStringReplace from "react-string-replace";
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
  getWebsite,
} from "@utils/format";
import { ItemImage } from "@components/Item/ItemImage";
import { ItemModal } from "@components/Item/ItemModal";
import { NewPostForm } from "@components/Form/NewPostForm";

export const Feed = () => {
  const navigate = useNavigate();
  const { groups } = useGroupState();
  const feed = useStore(getFeedItems);

  const withNewLines = txt => {
    return reactStringReplace(txt, /\n/g, match => {
      return <div>{match == "" ? <>&nbsp;</> : match}</div>;
    });
  };

  const withLinks = txt => {
    return reactStringReplace(txt, /(https?:\/\/\S+)/g, (match, i) => (
      <a className="text-blue-500 underline" key={match + i} href={match}>
        {match}
      </a>
    ));
  };

  const renderSigil = patp => {
    return sigil({
      patp: patp?.length < "14" ? patp : "worpet-bildet",
      renderer: reactRenderer,
      size: window.innerWidth < 700 ? 25 : 50,
      colors: ["black", "white"],
    });
  };

  const FeedItem = ({ item }) => {
    if (getType(item) !== "ship" && !item.data) return <></>;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    if (groups[item.keyStr]) {
      setIsJoined(true);
    }
    const imageContainerRef = useRef();
    return (
      <div className="py-10 border-gray-700 border-b">
        <div className="px-10">
          <div className="flex flex-col md:flex-row justify-between items-start pb-1">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-start">
                <div className="mr-4">{renderSigil(item.ship.slice(1))}</div>
                <div>
                  <div className="flex flex-row items-center">
                    <NavLink to={`/${item.ship}`}>
                      <span className="text-blue-500 text-xs md:text-base">
                        {item.ship}
                      </span>
                    </NavLink>
                    <div className="text-xs md:text-base text-gray-400 ml-1">
                      · {timeago.format(fromUrbitTime(item.time))}
                    </div>
                  </div>
                  <div className="text-xs md:text-base pl-1 text-gray-400">
                    {" "}
                    %{getType(item)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-row justify-between items-center p-0 md:p-5 rounded-xl ${
              getType(item) === "ship" || getWebsite(item)
                ? "cursor-pointer hover:bg-gray-500"
                : ""
            }`}
            onClick={() => {
              if (getType(item) === "ship") {
                return navigate(`/${item.keyObj.ship}`);
              }
              setModalIsOpen(true);
            }}
          >
            <div className="flex flex-col items-start md:flex-row md:items-center">
              {getType(item) === "other" && !getImage(item.data) ? (
                <></>
              ) : (
                <div
                  className="flex flex-row items-center w-24 h-24 md:w-44 md:h-44"
                  ref={imageContainerRef}
                >
                  <ItemImage
                    src={getImage(item.data)}
                    patp={getType(item) === "ship" ? item.keyObj?.ship : null}
                    type={getType(item)}
                    name={getShortTitle(item)}
                    container={imageContainerRef}
                    color={getColor(item.data)}
                  />
                </div>
              )}
              <div>
                <div className="md:ml-3">
                  <div className="text-xl font-bold">{getShortTitle(item)}</div>
                  <div className="flex flex-col">
                    {withNewLines(withLinks(getDescription(item)))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {getType(item) !== "ship" && getWebsite(item) && (
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
              website={getWebsite(item)}
            ></ItemModal>
          </Modal>
        )}
      </div>
    );
  };

  return (
    <div className="w-3/4 h-full py-12">
      <div className="text-2xl font-bold pb-5">Latest Activity</div>
      {Object.values(feed).length === 0 ? (
        <>Loading...</>
      ) : (
        <div className={`pt-10 border-gray-700 border border-b rounded-t-xl`}>
          <div className="pb-5 border-b border-gray-700">
            <NewPostForm />
          </div>
          {Object.values(feed)
            .map(f => f) // clone so we can sort
            .filter(f => !!f)
            .filter(f => f.time !== "Auto-recommended")
            .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time))
            .map((f, i) => {
              return <FeedItem key={`${f.time}${f.keyStr}`} item={f} index={i} />;
            })}
        </div>
      )}
    </div>
  );
};
