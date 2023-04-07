import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurators, refreshAppState as _refreshAppState } from "@state/store";
import { useStore } from "@state/store";
import { usePortal } from "@state/usePortal";
import { EditGeneralForm } from "@components/Form/EditGeneralForm";
import { urbitTime, defaultGeneral } from "@utils/format";

export function Add() {
  const { listkey } = useParams();
  const { ship } = usePortal();
  const curators = useStore(getCurators);
  const refreshAppState = useStore(_refreshAppState);
  const [list, setList] = useState(null);
  const [addItemPoke, setAddItemPoke] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let listmapkey = listkey.slice(1);
    listmapkey = listmapkey.slice(0, listmapkey.indexOf("/"));
    setList(curators[listmapkey]?.map[listkey]);
  }, [listkey, curators]);

  useEffect(() => {
    if (!ship || !list) return;
    // hacky shit
    let type = list?.item?.keyObj?.type?.slice(1);
    type = type?.slice(type.indexOf("/"));
    setAddItemPoke({
      "add-item-to-list": {
        "list-key": { ...list?.item?.keyObj },
        ship: `~${ship}`,
        type,
        text: urbitTime(Date.now()),
        general: { ...defaultGeneral },
        "bespoke-input": { "enditem-other": "" },
      },
    });
  }, [ship, listkey, list]);

  if (!addItemPoke) return <></>;

  return (
    <div className="pt-12 w-full h-full">
      <div className="pb-12">
        <div className="text-4xl">New post</div>
      </div>
      <EditGeneralForm
        poke={addItemPoke}
        setPoke={setAddItemPoke}
        action="add-item-to-list"
        onSave={() => {
          refreshAppState();
          navigate(-1); // TODO: rethink this, probably better to navigate 1 level up this heirarchy: profile page <- profile page (edit mode) <- edit list <- edit item
        }}
      />
    </div>
  );
}
