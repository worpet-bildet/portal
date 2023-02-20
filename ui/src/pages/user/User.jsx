import React, { Fragment } from "react";
import { isEmpty } from "lodash";
import { ItemTile } from "../../components/Item/ItemTile";
import { Footer } from "../../components/Footer";
import { Disclaimer } from "../../components/Disclaimer";
import ResponsiveAppBar from "../../components/AppBar";
import { getApps, useStore, getTypes } from "../../state/store";

export function User(props) {
  const appLists = useStore(getApps);
  const types = useStore(getTypes);

  const renderListsByType = _types =>
    Object.entries(_types)
      .filter(([type]) => type !== "list")
      .map(
        ([type, lists]) =>
          lists?.length &&
          lists.map(({ item, map }, _idx) => (
            <List key={_idx} item={item} map={map} type={type} />
          ))
      );

  const List = ({ item, map, type }) => (
    <div>
      <h3 className="text-2xl font-bold">{item?.data?.general?.title}</h3>
      <ul className="space-y-4">
        {!isEmpty(map)
          ? Object.entries(map).map(([key, val]) => (
              <ItemTile
                key={key}
                itemType={type}
                __title={getTitle(key, val, type)}
                __val={val}
                {...val}
              />
            ))
          : null}
      </ul>
    </div>
  );
  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="flex flex-row">
        <div className="flex flex-col w-full min-h-screen">
          <main className="ml-32 basis-3/4 h-full">
            <div className="w-4/5 space-y-6 py-14">
              <h1 className="text-3xl font-bold">Discover Apps</h1>
              <Disclaimer
                color="blue"
                message={
                  "Below are apps in your curator's collection. By default, you are subscribed to the Portal Curator. You can subscribe to other curators at /usr/curs"
                }
              />
              {appLists ? (
                <div>
                  <h3 className="text-2xl font-bold">{}</h3>
                  {renderListsByType(types)}
                </div>
              ) : null}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export const getTitle = (key, val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return val?.data?.bespoke?.keyObj.ship;
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    return `${val?.data?.bespoke?.keyObj.ship}/${val?.data?.bespoke?.keyObj.cord}`;
  }
  if (type === "list") {
    return val?.item?.data?.general?.title;
  }
};
