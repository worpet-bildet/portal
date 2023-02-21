import React, { Fragment, useState, useContext, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { isEmpty } from "lodash";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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

  // TODO: this gumpf should be tightened up, probably don't need two separate
  // arrow components? Is it possible to declare props for a component that
  // is used inline like this?
  const LeftArrow = () => {
    const {
      isFirstItemVisible,
      scrollPrev,
      visibleItemsWithoutSeparators,
      initComplete,
    } = useContext(VisibilityContext);

    const [disabled, setDisabled] = useState(
      !initComplete || (initComplete && isFirstItemVisible)
    );
    useEffect(() => {
      // NOTE: detect if whole component visible
      if (visibleItemsWithoutSeparators.length) {
        setDisabled(isFirstItemVisible);
      }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return (
      <Arrow disabled={disabled} onClick={() => scrollPrev()} direction="left">
        <ChevronLeftIcon className="h-5 w-5"></ChevronLeftIcon>
      </Arrow>
    );
  };

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
      useContext(VisibilityContext);

    const [disabled, setDisabled] = useState(
      !visibleItemsWithoutSeparators.length && isLastItemVisible
    );
    useEffect(() => {
      if (visibleItemsWithoutSeparators.length) {
        setDisabled(isLastItemVisible);
      }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return (
      <Arrow disabled={disabled} onClick={() => scrollNext()} direction="right">
        <ChevronRightIcon className="h-5 w-5"></ChevronRightIcon>
      </Arrow>
    );
  };

  const Arrow = ({ children, disabled, onClick, direction }) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="flex flex-col justify-center items-center w-0 h-40 z-10"
        style={{
          opacity: disabled ? "0" : "1",
        }}
      >
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-md ${
            direction == "right" ? "mr-3" : "ml-3"
          }`}
        >
          {children}
        </div>
      </button>
    );
  };

  const Card = ({ onClick, selected, title, itemId, ...props }) => {
    const visibility = useContext(VisibilityContext);

    return (
      <div onClick={() => onClick(visibility)} tabIndex={0}>
        {props.children}
      </div>
    );
  };

  const List = ({ item, map, type }) => {
    const [hover, setHover] = useState(false);
    return (
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
          {!isEmpty(map)
            ? Object.entries(map).map(([key, val]) => {
                console.log({ key });
                return (
                  <Card
                    itemId={key} // NOTE: itemId is required for track items
                    title={key}
                    key={key}
                  >
                    <div tabIndex={key}>
                      <ItemTile key={key} itemType={type} __val={val} {...val} />
                    </div>
                  </Card>
                );
              })
            : null}
        </ScrollMenu>
      </div>
    );
  };
  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="flex flex-row">
        <div className="flex flex-col max-w-full min-h-screen">
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
