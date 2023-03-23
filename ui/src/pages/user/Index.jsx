import React, { createRef, useEffect, useState } from "react";
import { ItemImage } from "../../components/Item/ItemImage";
import { getDefaultCurators } from "../../state/store";
import { useStore } from "../../state/store";
import { usePortal } from "../../state/usePortal";

const INDEXER_SHIP = "~worpet-bildet";
const INDEXER_LIST = `/${INDEXER_SHIP}/list/nonitem/ship/index`;

export const UserIndex = () => {
  const { ship } = usePortal();
  const defaultCurators = useStore(getDefaultCurators);
  const [userIndex, setUserIndex] = useState([]);
  useEffect(() => {
    if (!defaultCurators || !defaultCurators[INDEXER_SHIP]) return;
    setUserIndex(
      Object.values(defaultCurators[INDEXER_SHIP].map[INDEXER_LIST]?.map || {})
    );
  }, [defaultCurators]);

  let imageContainerRef = createRef();

  if (userIndex.length <= 0) return <></>;

  return (
    <div className="p-12">
      <div className="text-xl font-bold">Portal User Index</div>
      <div>
        Add your ship here by visitng the{" "}
        <a href={`~${ship}`} className="text-blue-500">
          profile page.
        </a>
      </div>
      {userIndex
        ?.sort((a, b) => {
          if (a?.keyObj?.ship < b?.keyObj?.ship) return -1;
          return 1;
        })
        .map(({ keyObj: { ship } }) => {
          return (
            <div className="flex flex-row items-center">
              <div className="w-10" ref={imageContainerRef}>
                <ItemImage patp={ship} type={"ship"} container={imageContainerRef} />
              </div>
              <a className="pl-2 text-blue-500 py-1" href={`${ship}`}>
                {ship}
              </a>
            </div>
          );
        })}
    </div>
  );
};
