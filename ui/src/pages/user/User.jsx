import React, { Fragment, useMemo } from "react";
import ResponsiveAppBar from "../../components/AppBar";
import { getApps, useStore, getTypes, getSelectedSection } from "../../state/store";
import { SliderList } from "../../components/List/SliderList";

export function User(props) {
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  const filterBySection = ({ type, selectedSection }) => {
    return selectedSection === "all" ? true : type === selectedSection;
  };
  const renderListsByType = ([type, lists]) =>
    lists?.length &&
    lists.map(({ item, map }, _idx) => (
      <SliderList
        key={_idx}
        item={item}
        map={map}
        type={type}
        filters={[{ fn: filterBySection, args: ["selectedSection", "type"] }]}
        filterProps={["selectedSection", "type"]}
      />
    ));

  const listsByType = useMemo(
    () =>
      Object.entries(types)
        .filter(([type]) => type !== "list")
        .map(renderListsByType),
    [types]
  );

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="flex flex-row px-2 sm:px-5 lg:px-44">
        <div className="flex flex-col max-w-full min-h-screen">
          <main className="basis-3/4 h-full">
            <div className="space-y-6 py-14">
              {appLists ? (
                <div>
                  <h3 className="text-2xl font-bold">{}</h3>
                  {listsByType}
                </div>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}
