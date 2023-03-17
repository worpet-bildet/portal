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
    let l = unsanitiseTextFieldsRecursive(
      lists.find(l => l?.keys?.keyObj?.ship === patp)
    );
    setList(l);
    setListTitle(l?.general?.title || patp);
    setListDescription(l?.general?.description);
    if (!l) setListDescription(`${patp} hasn't recommended anything yet`);
    setListOrder(l?.item?.data?.bespoke?.payload || []);
    setListImageSrc(l?.general?.image);
    setIsMe(patp.slice(1) === ship);
  }, [lists, patp]);

  const filterBySection = ({ type, selectedSection }) => {
    return selectedSection === "all" ? true : type === selectedSection;
  };
  const renderList = ({ item, map }) => {
    if (!isMe && (!item || !map)) return <></>;
    return (
      <SliderList
        item={item}
        key={item.keys.keyStr}
        map={map}
        type={getType(item)}
        filters={[{ fn: filterBySection, args: ["selectedSection", "type"] }]}
        filterProps={["selectedSection", "type"]}
        groups={groups}
        isMine={isMe}
      ></SliderList>
    );
  };
  const listsByType = useMemo(() => {
    let nonListLists = Object.entries(types).filter(([type]) => type !== "list");
    let orderedLists = [];
    listOrder.forEach(l => {
      nonListLists.forEach(([type, list]) => {
        let myList = list.find(typeList => typeList.keys.key === l.keyStr);
        if (myList) orderedLists.push(unsanitiseTextFieldsRecursive(myList));
      });
    });
    return orderedLists.map(renderList);
  }, [types, patp, listOrder]);

  const editList = keyStr => {
    window.location = `/apps/portal/list/${encodeURIComponent(keyStr)}/edit`;
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
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-10 sm:py-14 pt-5">
          {appLists ? <div>{listsByType}</div> : null}
        </div>
      </main>
    )
  );
}
