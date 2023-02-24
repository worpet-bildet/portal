import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";
import {
  getApps,
  useStore,
  getTypes,
  getLists,
  getShips,
  setAlertIsOpen,
} from "../../state/store";
import { SliderList } from "../../components/List/SliderList";
import { ItemImage } from "../../components/Item/ItemImage";
import { usePortal } from "../../state/usePortal";
import { AlertModal } from "../../components/AlertModal";

export function User(props) {
  const { urbit, actions } = usePortal();
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  const lists = useStore(getLists);
  const _setAlertIsOpen = useStore(setAlertIsOpen);
  const { patp } = useParams();
  const [listTitle, setListTitle] = useState(null);
  const [listDescription, setListDescription] = useState(null);
  const [listImageSrc, setListImageSrc] = useState(null);

  useEffect(() => {
    let l = lists.find(l => l?.keys?.keyObj?.ship === patp);
    setListTitle(l?.general?.title || patp);
    setListDescription(l?.general?.description);
    if (!l) setListDescription(`${patp} hasn't recommended anything yet`);
    setListImageSrc(l?.general?.image);
    // subscribe to all the planets in the list of ships
    types.ship
      .filter(s => lists.find(l => l.item.keys.keyObj.ship !== s.item.keys.keyObj.ship))
      .forEach(s => {
        // subscribe only to the ships that we have not yet subscribed to
        Object.values(s.map).forEach(sub => {
          actions.ITEM.pokes.sub(
            urbit,
            actions.ITEM.SUB
          )({
            ship: sub.keyObj.ship,
            type: "/list/list",
            cord: "~2000.1.1",
          });
        });
      });
  }, [lists, patp, urbit]);
  const filterBySection = ({ type, selectedSection }) => {
    return selectedSection === "all" ? true : type === selectedSection;
  };
  const renderListsByType = ([type, lists]) => {
    if (!lists?.length) return <></>;
    return (
      lists?.length &&
      lists
        .filter(l => {
          return l?.keys?.keyObj?.ship === patp;
        })
        .map(({ item, map }, _idx) => (
          <SliderList
            key={_idx}
            item={item}
            map={map}
            type={type}
            filters={[{ fn: filterBySection, args: ["selectedSection", "type"] }]}
            filterProps={["selectedSection", "type"]}
          />
        ))
    );
  };
  const listsByType = useMemo(
    () =>
      Object.entries(types)
        .filter(([type]) => type !== "list")
        .sort(([type1], [type2]) => {
          // There's probably a better way to do this
          if (type1 === "group") return -1;
          if (type2 === "group") return 1;
          if (type1 === "app") return -1;
          if (type2 === "app") return 1;
        })
        .map(renderListsByType),
    [types, patp]
  );

  const imageContainerRef = useRef();

  return (
    <Fragment>
      <ResponsiveAppBar />
      <AlertModal onRequestClose={() => _setAlertIsOpen(false)} />
      <div className="flex flex-row px-2 sm:px-5 lg:px-24">
        <div className="flex flex-col max-w-full min-h-screen">
          {lists?.length > 0 && (
            <main className="basis-3/4 h-full px-2">
              <div className="pt-4 sm:pt-10 h-auto md:h-56">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-44 h-44" ref={imageContainerRef}>
                    <ItemImage
                      src={listImageSrc}
                      patp={patp}
                      container={imageContainerRef}
                    ></ItemImage>
                  </div>
                  <div className="sm:w-3/4 sm:px-10 py-5 md:py-0">
                    <div className="font-bold text-2xl">{listTitle}</div>
                    <div className="text-sm">
                      list by <span className="font-bold text-blue-600">{patp}</span>
                    </div>
                    <div className="pt-2 text-sm sm:text-lg text-gray-400">
                      {listDescription}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-10 sm:py-14 pt-5">
                {appLists ? <div>{listsByType}</div> : null}
              </div>
            </main>
          )}
        </div>
      </div>
    </Fragment>
  );
}
