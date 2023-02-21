import React, { Fragment } from "react";
import { isEmpty } from "lodash";
import { ItemTile } from "../../components/Item/ItemTile";
import ResponsiveAppBar from "../../components/AppBar";
import { getApps, useStore, getTypes, getSelectedSection } from "../../state/store";

export function User(props) {
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  const selectedSection = useStore(getSelectedSection);
  const filterBySection = ([type]) => {
    return selectedSection === "all" ? true : type === selectedSection;
  };

  const renderListsByType = _types =>
    Object.entries(_types)
      .filter(([type]) => type !== "list")
      .filter(filterBySection)
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
      <ul className="flex flex-row my-4">
        {!isEmpty(map)
          ? Object.entries(map).map(([key, val]) => (
              <ItemTile
                key={key}
                itemType={type}
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
          <main className="mx-8 basis-3/4 h-full">
            <div className="space-y-6 py-14">
              {appLists ? (
                <div>
                  <h3 className="text-2xl font-bold">{}</h3>
                  {renderListsByType(types)}
                </div>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}