import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDefaultCurators } from "../../state/store";
import { useStore } from "../../state/store";
import { EditGeneralForm } from "../../components/Form/EditGeneralForm";
import { getShortTitle, getType } from "../../utils/format";

export function Edit() {
  const { listkey, itemkey } = useParams();
  const defaultCurators = useStore(getDefaultCurators);
  let [item, setItem] = useState(null);
  let [editItemPoke, setEditItemPoke] = useState(null);

  useEffect(() => {
    let listmapkey = listkey.slice(1);
    listmapkey = listmapkey.slice(0, listmapkey.indexOf("/"));
    let list = defaultCurators[listmapkey]?.map[listkey];
    setItem(list?.map[itemkey]);
  }, [listkey, defaultCurators]);

  useEffect(() => {
    if (!item) return;
    const {
      data: { general },
      keyObj,
    } = item;

    setEditItemPoke({
      edit: {
        key: { ...keyObj },
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
        onSave={() => navigate(-1)}
      />
    </div>
  );
}
