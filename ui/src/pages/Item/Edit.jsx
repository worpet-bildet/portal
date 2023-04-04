import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { getCurators, refreshAppState as _refreshAppState } from "@state/store";
import { useStore } from "@state/store";
import { EditGeneralForm } from "@components/Form/EditGeneralForm";
import { getShortTitle, getType, urbitTime } from "@utils/format";

export function Edit() {
  const { listkey, itemkey } = useParams();
  const navigate = useNavigate();
  const curators = useStore(getCurators);
  const refreshAppState = useStore(_refreshAppState);
  let [item, setItem] = useState(null);
  let [editItemPoke, setEditItemPoke] = useState(null);

  useEffect(() => {
    let listmapkey = listkey.slice(1);
    listmapkey = listmapkey.slice(0, listmapkey.indexOf("/"));
    let list = curators[listmapkey]?.map[listkey];
    setItem(list?.map[itemkey]);
  }, [listkey, curators]);

  useEffect(() => {
    if (!item) return;
    const {
      data: { general },
      keyObj,
    } = item;

    setEditItemPoke({
      edit: {
        key: { ...keyObj },
        text: urbitTime(Date.now()),
        general: { ...general, properties: {} },
        "bespoke-input": { "enditem-other": "" },
      },
    });
  }, [item]);

  if (!item || !editItemPoke) return <></>;

  return (
    <div className="pt-12 w-full h-full">
      <div className="pb-12">
        <div className="text-4xl">editing item: {getShortTitle(item, getType(item))}</div>
      </div>
      <EditGeneralForm
        poke={editItemPoke}
        setPoke={setEditItemPoke}
        action="edit"
        onSave={() => {
          toast.success("Saved");
          refreshAppState();
          navigate(-1);
        }}
      />
    </div>
  );
}
