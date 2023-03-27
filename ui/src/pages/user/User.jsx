import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@state/store";
import { getDefaultCurators } from "@state/store";
import { SliderList } from "@components/List/SliderList";
import { ItemImage } from "@components/Item/ItemImage";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { usePortal } from "@state/usePortal";
import { useGroupState } from "@lib/state/groups/groups";
import { getType, unsanitiseTextFieldsRecursive } from "@utils/format";

export function User() {
  const { urbit, ship } = usePortal();
  const { groups } = useGroupState();
  const { patp } = useParams();
  const navigate = useNavigate();
  const defaultCurators = useStore(getDefaultCurators);
  const [curatorList, setCuratorList] = useState(null);
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
    setIsMe(patp.slice(1) === ship);
  }, [patp, defaultCurators, ship]);

  const renderList = ({ item, map }) => {
    if (!isMe && (!item || !map)) return <></>;
    if (item?.keyStr?.includes("index")) return;
    return (
      <SliderList
        item={item}
        key={item.keyStr}
        map={map}
        type={getType(item)}
        groups={groups}
        isMine={isMe}
      ></SliderList>
    );
  };
  const listsByType = () => {
    let nonListLists = curatorList?.item?.data?.bespoke?.payload;
    if (!nonListLists) return;
    let orderedLists = [];
    nonListLists.forEach(l => {
      let myList = curatorList.map[l.keyStr];
      if (myList) orderedLists.push(unsanitiseTextFieldsRecursive(myList));
    });
    return orderedLists.map(renderList);
  };

  const editList = keyStr => {
    navigate(`/list/${encodeURIComponent(keyStr)}/edit`);
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
  if (!curatorList) return <LoadingSpinner />;

  const {
    general: { title, description, image },
    item: {
      data: {
        bespoke: { keyStr },
      },
    },
  } = curatorList;
  return (
    <main className="w-full h-full px-2">
      <div className="pt-4 sm:pt-10 h-auto md:h-56">
        <div className="flex flex-col md:flex-row items-center h-full">
          <div className="w-44 h-44 rounded-xl overflow-hidden" ref={imageContainerRef}>
            <ItemImage src={image} patp={patp} container={imageContainerRef}></ItemImage>
          </div>
          <div className="w-full sm:w-3/4 sm:px-10 py-5 md:py-0">
            <div>
              <div className="font-bold text-2xl">{title || patp}</div>
              <div className="text-sm">
                list by <span className="font-bold text-[#0284c7]">{patp}</span>
              </div>
              <div className="pt-2 text-sm sm:text-lg text-gray-400 break-words">
                {curatorList.map
                  ? description
                  : `${patp} hasn't recommended anything yet`}
              </div>
            </div>
          </div>
          {isMe ? (
            <div className="flex h-full items-start">
              <span
                className="text-xs pl-4 pt-4 whitespace-nowrap underline cursor-pointer"
                onClick={() => editList(keyStr)}
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
      <div className="space-y-4 sm:space-y-10 sm:py-14 pt-5">{listsByType()}</div>
    </main>
  );
}
