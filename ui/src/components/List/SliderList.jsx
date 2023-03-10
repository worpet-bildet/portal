import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { isEmpty } from "lodash";
import { ItemTile } from "../Item/ItemTile";
import { Card } from "./Card";
import { LeftArrow, RightArrow } from "./SliderArrows";
import { useStore } from "../../state/store";
import { isMobile } from "../../utils/mobile";

export const SliderList = ({ item, map, type, filters, filterProps, groups, isMine }) => {
  if (isEmpty(map)) return <></>;
  const [hover, setHover] = useState(false);
  const selectedSection = useStore(state => state.selectedSection);
  const defaultFiltersProps = { selectedSection, type };
  const [hideJoinedGroups, setHideJoinedGroups] = useState(false);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    setListOrder(item?.data?.bespoke?.payload || []);
  }, [item]);

  // TODO: Replace with desired click handler
  const handleClick = visibility => {
    // console.log("Card.onClick", { visibility });
    return;
  };
  const editList = keyStr => {
    console.log({ keyStr });
    window.location = `/apps/portal/list/${encodeURIComponent(keyStr)}/edit`;
  };
  const _filterProps = filterProps?.length
    ? filterProps.reduce((acc, cur) => ({ ...acc, [cur]: defaultFiltersProps[cur] }), {})
    : defaultFiltersProps;

  const shouldRenderList = useMemo(
    () => filters.reduce((acc, cur) => acc && cur.fn(_filterProps), true),
    [filterProps, selectedSection]
  );

  const mappedCards = useMemo(
    () => {
      if (isEmpty(map)) return null;
      let orderedItems = [];
      listOrder.forEach(l => {
        const { ship, cord } = l.keyObj;
        if (map[l.keyStr]) orderedItems.push(map[l.keyStr]);
      });
      return orderedItems.map(val => {
        if (hideJoinedGroups) {
          const { ship, cord } = val?.data?.bespoke?.keyObj;
          const nameKey = `${ship}/${cord}`;
          if (groups[nameKey]) {
            return <></>;
          }
        }
        const key = val.keyStr;
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
      });
    },
    // : null,
    [item, map, hideJoinedGroups, listOrder]
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
        className="text-xs text-gray-400 underline w-1/3 text-right cursor-pointer"
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
      className="pb-7"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row w-full justify-between items-center">
        <div className="text-2xl font-bold">{item?.data?.general?.title}</div>
        {isMine ? (
          <span
            className="text-xs pl-4 underline cursor-pointer"
            onClick={() => editList(item?.data?.bespoke?.keyStr)}
          >
            Edit
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row justify-between pb-2 w-full">
        <div className="text-xs sm:text-base pb-3 text-gray-400 w-2/3">
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
