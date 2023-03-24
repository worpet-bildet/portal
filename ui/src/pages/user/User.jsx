import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../state/store";
import { getApps, getDefaultCurators } from "../../state/store";
import { SliderList } from "../../components/List/SliderList";
import { ItemImage } from "../../components/Item/ItemImage";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePortal } from "../../state/usePortal";
import { useGroupState } from "../../lib/state/groups/groups";
import { getType, unsanitiseTextFieldsRecursive } from "../../utils/format";

export function User() {
  const { urbit, ship } = usePortal();
  const appLists = useStore(getApps);
  const defaultCurators = useStore(getDefaultCurators);
  const { groups } = useGroupState();
  const { patp } = useParams();
  const [curatorList, setCuratorList] = useState(null);
  const [curatorLists, setCuratorLists] = useState(null);
  const [curatorListTitle, setCuratorListTitle] = useState(null);
  const [curatorListDescription, setCuratorListDescription] = useState(null);
  const [curatorListImageSrc, setCuratorListImageSrc] = useState(null);
  const [curatorListOrder, setCuratorListOrder] = useState([]);
  const [userIsIndexed, setUserIsIndexed] = useState(false);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    if (!patp || !defaultCurators) return;
    const INDEXER_SHIP = "~worpet-bildet";
    const INDEXER_LIST = `/${INDEXER_SHIP}/list/nonitem/ship/index`;
    let index = Object.values(
      defaultCurators[INDEXER_SHIP]?.map[INDEXER_LIST]?.map || {}
    );
    setUserIsIndexed(
      !index?.find(({ keyObj: { ship } }) => ship === patp) ? false : true
    );
  }, [patp, defaultCurators]);

  const subscribeTo = ship => {
    urbit.poke({
      app: "portal-manager",
      mark: "portal-action",
      json: {
        sub: {
          key: {
            ship,
            type: "/list/list",
            cord: "~2000.1.1",
          },
        },
      },
    });
  };

  useEffect(() => {
    if (urbit && patp && !isMe) {
      subscribeTo(patp);
    }
  }, [patp, isMe, urbit]);

  useEffect(() => {
    // We should search the default curators here
    if (!defaultCurators || Object.values(defaultCurators).length < 1 || !patp) return;
    let l = unsanitiseTextFieldsRecursive(defaultCurators[patp]);
    setCuratorList(l);
    setCuratorLists(l?.map || {});
    setCuratorListTitle(l?.general?.title || patp);
    setCuratorListDescription(l?.general?.description);
    if (!l) setCuratorListDescription(`${patp} hasn't recommended anything yet`);
    setCuratorListOrder(l?.item?.data?.bespoke?.payload || []);
    setCuratorListImageSrc(l?.general?.image);
    setIsMe(patp.slice(1) === ship);
  }, [patp, defaultCurators, ship]);

  const filterBySection = ({ type, selectedSection }) => {
    return selectedSection === "all" ? true : type === selectedSection;
  };
  const renderList = ({ item, map }) => {
    if (!isMe && (!item || !map)) return <></>;
    if (item?.keyStr?.includes("index")) return;
    return (
      <SliderList
        item={item}
        key={item.keyStr}
        map={map}
        type={getType(item)}
        filters={[{ fn: filterBySection, args: ["selectedSection", "type"] }]}
        filterProps={["selectedSection", "type"]}
        groups={groups}
        isMine={isMe}
      ></SliderList>
    );
  };
  const listsByType = () => {
    let nonListLists = curatorList?.item?.data?.bespoke?.payload;
    if (!nonListLists) return;
    let orderedLists = [];
    curatorListOrder.forEach(l => {
      let myList = curatorLists[l.keyStr];
      if (myList) orderedLists.push(unsanitiseTextFieldsRecursive(myList));
    });
    return orderedLists.map(renderList);
  };

  const editList = keyStr => {
    window.location = `/apps/portal/list/${encodeURIComponent(keyStr)}/edit`;
  };
  const indexMe = b => {
    urbit.poke({
      app: "portal-manager",
      mark: "portal-action",
      json: {
        "index-as-curator": {
          toggle: b,
        },
      },
    });
    setUserIsIndexed(b);
  };
  const imageContainerRef = useRef();

  return curatorLists ? (
    <main className="w-full h-full px-2">
      <div className="pt-4 sm:pt-10 h-auto md:h-56">
        <div className="flex flex-col md:flex-row items-center h-full">
          <div className="w-44 h-44 rounded-xl overflow-hidden" ref={imageContainerRef}>
            <ItemImage
              src={curatorListImageSrc}
              patp={patp}
              container={imageContainerRef}
            ></ItemImage>
          </div>
          <div className="w-full sm:w-3/4 sm:px-10 py-5 md:py-0">
            <div>
              <div className="font-bold text-2xl">{curatorListTitle}</div>
              <div className="text-sm">
                list by <span className="font-bold text-[#0284c7]">{patp}</span>
              </div>
              <div className="pt-2 text-sm sm:text-lg text-gray-400 break-words">
                {curatorListDescription}
              </div>
            </div>
          </div>
          {isMe ? (
            <div className="flex h-full items-start">
              <span
                className="text-xs pl-4 pt-4 whitespace-nowrap underline cursor-pointer"
                onClick={() => editList(list?.item?.data?.bespoke?.keyStr)}
              >
                Edit Profile
              </span>
              <span className="text-[#0284c7] font-bold text-xs pl-4 pt-4 whitespace-nowrap">
                Add me to the Index
                <input
                  className="ml-2"
                  type="checkbox"
                  onChange={e => indexMe(e.target.checked)}
                  checked={userIsIndexed}
                ></input>
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="space-y-4 sm:space-y-10 sm:py-14 pt-5">
        {appLists ? <div>{listsByType()}</div> : null}
      </div>
    </main>
  ) : (
    <LoadingSpinner />
  );
}
