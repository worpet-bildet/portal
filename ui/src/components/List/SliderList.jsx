import React, { useState, useMemo } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { isEmpty } from "lodash";
import { ItemTile } from "../Item/ItemTile";
import { Card } from "./Card";
import { LeftArrow, RightArrow } from "./SliderArrows";
import { useStore } from "../../state/store";

export const SliderList = ({ item, map, type, filters, filterProps }) => {
  const [hover, setHover] = useState(false);
  const selectedSection = useStore(state => state.selectedSection);
  const defaultFiltersProps = { selectedSection, type };

  // TODO: Replace with desired click handler
  const handleClick = visibility => {
    console.log("====================================");
    console.log("Card.onClick", { visibility });
    console.log("====================================");
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
            console.log({ key });
            return (
              <Card
                itemId={key} // NOTE: itemId is required for track items
                title={key}
                key={key}
                onClick={handleClick}
              >
                <div tabIndex={key}>
                  <ItemTile key={key} itemType={type} __val={val} {...val} />
                </div>
              </Card>
            );
          })
        : null,
    [map]
  );

  const _List = (
    <div
      className="pb-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 className="text-2xl font-bold">{item?.data?.general?.title}</h3>
      <ScrollMenu
        LeftArrow={hover ? LeftArrow : <></>}
        RightArrow={hover ? RightArrow : <></>}
        className="overflow-hidden"
      >
        {mappedCards}
      </ScrollMenu>
    </div>
  );

  return shouldRenderList ? _List : null;
};
