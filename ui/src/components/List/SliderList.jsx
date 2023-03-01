import React, { useState, useMemo } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { isEmpty } from "lodash";
import { ItemTile } from "../Item/ItemTile";
import { Card } from "./Card";
import { LeftArrow, RightArrow } from "./SliderArrows";
import { useStore } from "../../state/store";
import { isMobile } from "../../utils/mobile";

export const SliderList = ({ item, map, type, filters, filterProps, groups }) => {
  if (isEmpty(map)) return <></>;
  const [hover, setHover] = useState(false);
  const selectedSection = useStore(state => state.selectedSection);
  const defaultFiltersProps = { selectedSection, type };
  const [hideJoinedGroups, setHideJoinedGroups] = useState(false);

  // TODO: Replace with desired click handler
  const handleClick = visibility => {
    // console.log("Card.onClick", { visibility });
    return;
  };
  const _filterProps = filterProps?.length
    ? filterProps.reduce((acc, cur) => ({ ...acc, [cur]: defaultFiltersProps[cur] }), {})
    : defaultFiltersProps;

  const shouldRenderList = useMemo(
    () => filters.reduce((acc, cur) => acc && cur.fn(_filterProps), true),
    [filterProps, selectedSection]
  );

  const mappedCards = useMemo(
    () =>
      !isEmpty(map)
        ? Object.entries(map).map(([key, val]) => {
            if (hideJoinedGroups) {
              const { ship, cord } = val?.data?.bespoke?.keyObj;
              const nameKey = `${ship}/${cord}`;
              if (groups[nameKey]) return <></>;
            }
            return (
              <Card
                itemId={key} // NOTE: itemId is required for track items
                title={key}
                key={key}
                onClick={handleClick}
              >
                <div tabIndex={key}>
                  <ItemTile
                    key={key}
                    itemType={type}
                    __val={val}
                    userGroupData={groups}
                    {...val}
                  />
                </div>
              </Card>
            );
          })
        : null,
    [map, hideJoinedGroups]
  );

  const FilterJoinedButton = props => {
    // let numberOfJoinedGroups = Object.keys(groups).length;
    let numberOfJoinedGroups = 0;
    Object.values(map).forEach(list => {
      let keyStr = `${list?.data?.bespoke?.keyObj?.ship}/${list?.data?.bespoke?.keyObj?.cord}`;
      if (groups[keyStr]) numberOfJoinedGroups++;
    });
    if (numberOfJoinedGroups === 0) return;
    return (
      <div
        className="text-base text-gray-400 underline w-1/3 text-right cursor-pointer"
        onClick={() => setHideJoinedGroups(!hideJoinedGroups)}
      >
        {hideJoinedGroups
          ? `show joined groups`
          : `hide ${numberOfJoinedGroups} group${
              numberOfJoinedGroups > 1 ? "s" : ""
            } i've joined`}
      </div>
    );
  };

  const _List = (
    <div
      className="pb-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="text-2xl font-bold">{item?.data?.general?.title}</div>
      <div className="flex flex-row justify-between pb-2 w-full">
        <div className="text-base text-gray-400 w-2/3">
          {item?.data?.general?.description}
        </div>
        {type === "group" && <FilterJoinedButton></FilterJoinedButton>}
      </div>
      <ScrollMenu
        LeftArrow={hover || isMobile() ? LeftArrow : <></>}
        RightArrow={hover || isMobile() ? RightArrow : <></>}
        className="overflow-hidden"
      >
        {mappedCards}
      </ScrollMenu>
    </div>
  );

  return shouldRenderList ? _List : null;
};
