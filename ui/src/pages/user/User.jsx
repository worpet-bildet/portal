import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";
import { getApps, useStore, getTypes, getLists } from "../../state/store";
import { SliderList } from "../../components/List/SliderList";
import { ItemImage } from "../../components/Item/ItemImage";

export function User(props) {
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  const lists = useStore(getLists);
  const { patp } = useParams();
  const [listTitle, setListTitle] = useState(null);
  const [listDescription, setListDescription] = useState(null);
  const [listImageSrc, setListImageSrc] = useState(null);
  useEffect(() => {
    let l = lists.find(l => l?.keys?.keyObj?.ship === patp);
    setListTitle(l?.general?.title || patp);
    setListDescription(
      l?.general?.description || `${patp} hasn't recommended anything yet`
    );
    setListImageSrc(l?.general?.image);
  }, [lists, patp]);
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

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="flex flex-row px-2 sm:px-5 lg:px-24">
        <div className="flex flex-col max-w-full min-h-screen">
          {lists?.length > 0 && (
            <main className="basis-3/4 h-full">
              <div className="pt-4 sm:px-5 sm:pt-10">
                <div className="flex flex-row items-center">
                  <div className="hidden sm:flex w-1/6">
                    <ItemImage src={listImageSrc} patp={patp}></ItemImage>
                  </div>
                  <div className="px-2 sm:w-3/4 sm:px-10">
                    <div className="font-bold text-2xl">{listTitle}</div>
                    <div className="pt-2 text-sm sm:text-lg">{listDescription}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 px-2 py-8 sm:space-y-6 sm:py-14">
                {appLists ? <div>{listsByType}</div> : null}
              </div>
            </main>
          )}
        </div>
      </div>
    </Fragment>
  );
}
