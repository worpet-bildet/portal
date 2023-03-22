import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../state/store";
import { getApps, getTypes, getLists, getDefaultCurators } from "../../state/selectors";
import { SliderList } from "../../components/List/SliderList";
import { ItemImage } from "../../components/Item/ItemImage";
import { usePortal } from "../../state/usePortal";
import unionBy from "lodash/unionBy";
import { useGroupState } from "../../lib/state/groups/groups";
import { getType, unsanitiseTextFieldsRecursive } from "../../utils/format";

export function User() {
  const { urbit, actions, ship } = usePortal();
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  const lists = useStore(getLists);
  const defaultCurators = useStore(getDefaultCurators);
  const { groups } = useGroupState();
  const { patp } = useParams();
  const [list, setList] = useState(null);
  const [listTitle, setListTitle] = useState(null);
  const [listDescription, setListDescription] = useState(null);
  const [listImageSrc, setListImageSrc] = useState(null);
  const [listOrder, setListOrder] = useState([]);
  const [userIndex, setUserIndex] = useState([]);
  const [userIsIndexed, setUserIsIndexed] = useState(false);
  const [isMe, setIsMe] = useState(false);

  const allRecommendedShips = useMemo(
    () =>
      types?.ship?.length
        ? types.ship.reduce((prev, curr, _idx) => {
            const _ships = Object.values(curr.map).map(s => s.keyObj.ship);
            return _ships?.length ? unionBy(prev, _ships, s => s) : prev;
          }, [])
        : [],
    [types.ship]
  );

  const defaultCuratorShips = useMemo(
    () => (defaultCurators ? Object.keys(defaultCurators) : []),
    [defaultCurators]
  );
  const outstandingShipsToSubscribeTo = useMemo(
    () =>
      allRecommendedShips?.length
        ? allRecommendedShips.filter(ship => !defaultCurators[ship] && ship !== patp)
        : [],
    [allRecommendedShips, defaultCuratorShips, patp]
  );

  useEffect(() => {
    // this is really gross just to find if the user has been indexed before.
    // sigh.
    if (!patp || !types) return;
    const { ship } = types;
    const indexList = ship?.find(
      ({
        keys: {
          keyObj: { cord },
        },
      }) => cord === "index"
    );
    setUserIsIndexed(
      Object.keys(indexList?.map || {}).find(l => l.includes(patp)) ? true : false
    );
  }, [types, patp]);

  useEffect(() => {
    if (urbit && patp && !isMe) {
      urbit.poke({
        app: "portal-manager",
        mark: "portal-action",
        json: {
          sub: {
            key: {
              ship: patp,
              type: "/list/list",
              cord: "~2000.1.1",
            },
          },
        },
      });
    }
  }, [patp, isMe, urbit]);

  useEffect(() => {
    if (outstandingShipsToSubscribeTo.length) {
      outstandingShipsToSubscribeTo.forEach(ship => {
        actions.ITEM.pokes.sub(
          urbit,
          actions.ITEM.SUB
        )({
          key: {
            ship,
            type: "/list/list",
            cord: "~2000.1.1",
          },
        });
      });
    }
  }, [outstandingShipsToSubscribeTo]);

  useEffect(() => {
    // We should search the default curators here
    if (!defaultCurators || !patp) return;
    let l = unsanitiseTextFieldsRecursive(defaultCurators[patp]);
    setList(l);
    setListTitle(l?.general?.title || patp);
    setListDescription(l?.general?.description);
    if (!l) setListDescription(`${patp} hasn't recommended anything yet`);
    setListOrder(l?.item?.data?.bespoke?.payload || []);
    setListImageSrc(l?.general?.image);
    setUserIndex(Object.values(l?.map[`/${patp}/list/nonitem/ship/index`]?.map || {}));
    setIsMe(patp.slice(1) === ship);
  }, [lists, patp, defaultCurators, types, ship]);

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
    let nonListLists = list?.item?.data?.bespoke?.payload;
    if (!nonListLists) return;
    let orderedLists = [];
    listOrder.forEach(l => {
      let myList = list.map[l.keyStr];
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

  return (
    lists?.length > 0 && (
      <main className="basis-3/4 h-full px-2">
        <div className="pt-4 sm:pt-10 h-auto md:h-56">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="w-44 h-44 rounded-xl overflow-hidden" ref={imageContainerRef}>
              <ItemImage
                src={listImageSrc}
                patp={patp}
                container={imageContainerRef}
              ></ItemImage>
            </div>
            <div className="w-full sm:w-3/4 sm:px-10 py-5 md:py-0">
              <div>
                <div className="font-bold text-2xl">{listTitle}</div>
                <div className="text-sm">
                  list by <span className="font-bold text-[#0284c7]">{patp}</span>
                </div>
                <div className="pt-2 text-sm sm:text-lg text-gray-400 break-words">
                  {listDescription}
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
                <span className="text-xs pl-4 pt-4 whitespace-nowrap">
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
        {userIndex?.length > 0 && (
          <div>
            <div className="text-xl font-bold">Portal User Index</div>
            <div>
              Add yourself here by visitng your{" "}
              <a href={`~${ship}`} className="text-blue-500">
                profile page.
              </a>
            </div>
            {userIndex?.map(({ keyObj: { ship } }) => {
              return (
                <div>
                  <a className="text-blue-500 py-1" href={`${ship}`}>
                    {ship}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </main>
    )
  );
}
