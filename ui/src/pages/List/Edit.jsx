import React, { useState, useEffect, createRef } from "react";
import { useParams } from "react-router-dom";
import { Draggable } from "react-drag-reorder";
import {
  CheckIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  PencilIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useStore } from "../../state/store";
import { getDefaultCurators } from "../../state/store";
import {
  getShortTitle,
  getLongTitle,
  getType,
  getImage,
  validateItemPath,
  getDescription,
  unsanitiseTextFieldsRecursive,
} from "../../utils/format";
import { usePortal } from "../../state/usePortal";
import { ItemImage } from "../../components/Item/ItemImage";
import { useGroupState } from "../../lib/state/groups/groups";
import { EditGeneralForm } from "../../components/Form/EditGeneralForm";

export function Edit() {
  const { urbit } = usePortal();
  const { groups } = useGroupState();
  const { listkey } = useParams();
  const defaultCurators = useStore(getDefaultCurators);

  const [list, setList] = useState(null);
  const [editListPoke, setEditListPoke] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [pokeListItems, setPokeListItems] = useState([]);
  const [listType, setListType] = useState(null);
  const [pokeListType, setPokeListType] = useState(null);
  const [error, setError] = useState(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  useEffect(() => {
    let mapkey = listkey.slice(1);
    mapkey = mapkey.slice(0, mapkey.indexOf("/"));
    let _list = defaultCurators[mapkey]?.map[listkey] || defaultCurators[mapkey];
    setList(unsanitiseTextFieldsRecursive(_list));
  }, [listkey, defaultCurators]);

  useEffect(() => {
    if (!list) return;
    const {
      item: {
        data: {
          bespoke: { payload },
        },
      },
      map,
    } = unsanitiseTextFieldsRecursive(list);
    setListType(getType(list.item));
    // create the list of items
    let items = [];
    for (let k of payload) {
      items.push(map[k?.keyStr]);
    }
    setListItems(items);
  }, [list]);

  const typesOfBespokeInput = {
    "list-list": "list-key-list",
    "list-nonitem-group": "group-key-list",
    "list-app": "app-key-list",
    "list-enditem-other": "other-key-list",
    "list-nonitem-ship": "ship-key-list",
  };

  useEffect(() => {
    if (!list) return;
    const {
      item: {
        data: {
          general,
          bespoke: { keyObj },
        },
      },
    } = list;
    let _pokeListItems = listItems.map(i => {
      let keyObj = { key: i.keyObj || i.item?.keyObj, text: i.keyStr || i.item?.keyStr };
      return keyObj;
    });
    setPokeListItems(_pokeListItems);

    let pokeBespokeKeyString = keyObj?.type?.slice(1).replace(/\//g, "-");
    setPokeListType(pokeBespokeKeyString);

    setEditListPoke({
      edit: {
        key: { ...keyObj },
        general: { ...general, properties: {} },
        "bespoke-input": {
          [pokeBespokeKeyString]: {
            [typesOfBespokeInput[pokeBespokeKeyString]]: _pokeListItems,
          },
        },
      },
    });
  }, [listItems]);

  if (!list || !editListPoke) return <></>;

  // too much duplicated code here but i'm in a bit of a rush
  const removeItem = i => {
    const temp = listItems.filter(
      li =>
        (li.keyStr && li.keyStr !== i.keyStr) ||
        (li.item?.keyStr && li.item?.keyStr !== i.item?.keyStr)
    );
    const {
      item: {
        data: {
          bespoke: { keyObj },
        },
      },
    } = list;
    let _pokeListItems = temp.map(i => {
      let keyObj = { key: i.keyObj || i.item?.keyObj, text: i.keyStr || i.item?.keyStr };
      return keyObj;
    });
    let pokeBespokeKeyString = keyObj?.type?.slice(1).replace(/\//g, "-");
    const poke = {
      edit: {
        key: { ...editListPoke.edit.key },
        general: { ...editListPoke.edit.general },
        "bespoke-input": {
          [pokeBespokeKeyString]: {
            [typesOfBespokeInput[pokeBespokeKeyString]]: _pokeListItems,
          },
        },
      },
    };
    doPoke(poke);
  };

  const editItem = i => {
    if (i?.item?.keyStr?.includes("list")) {
      return (window.location = `/apps/portal/list/${encodeURIComponent(
        i?.item?.keyStr
      )}/edit`);
    }
    // making an item edit page here is pretty annoying, because the data is
    // nested within our own list that we're editing
    window.location = `/apps/portal/item/${encodeURIComponent(
      list?.item?.keyStr
    )}/${encodeURIComponent(i.keyStr)}/edit`;
  };

  const addList = () => {
    return (window.location = `/apps/portal/list/add`);
  };

  const imgContainer = createRef();

  // also need to print each entry as a separate item, and allow deleting and
  // adding more items
  const renderListItems = () => {
    const getChangedPos = (currentPos, newPos) => {
      const x = listItems?.map(i => i);
      const _buf = x[newPos];
      x[newPos] = x[currentPos];
      x[currentPos] = _buf;
      setListItems(x);
    };
    return (
      <Draggable onPosChange={getChangedPos}>
        {listItems.map((i, k) => {
          const canEdit = getType(i) === "other" || getType(i) === "list";
          return (
            <div
              className="flex flex-row w-full justify-between items-center sm:p-2"
              key={k}
            >
              <div className="flex flex-row w-full items-center justify-start">
                <div className="w-10 pr-2">
                  <Bars3Icon />
                </div>
                <div
                  className="w-24 h-24 md:h-44 md:w-44 flex items-center"
                  ref={imgContainer}
                >
                  <ItemImage
                    src={getImage(i, groups) || null}
                    patp={getType(i) === "ship" ? getShortTitle(i, getType(i)) : null}
                    type={getType(i)}
                    name={getShortTitle(i, getType(i))}
                    container={imgContainer}
                  />
                </div>
                <div className="pl-4 w-3/4">
                  <div className="text-xl">{getShortTitle(i, getType(i))}</div>
                  <div className="text-sm pt-2">{getDescription(i, getType(i))}</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {canEdit ? (
                  <button
                    className="p-2 hover:bg-blue-500 rounded-lg right-0"
                    onClick={() => editItem(i)}
                  >
                    <div className="w-5 md:w-10">
                      <PencilIcon />
                    </div>
                  </button>
                ) : null}
                <button
                  className="p-2 hover:bg-red-500 rounded-lg"
                  onClick={() => removeItem(i)}
                >
                  <div className="w-5 md:w-10">
                    <TrashIcon />
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </Draggable>
    );
  };

  const validateItem = ({ target: { value } }) => {
    if (!validateItemPath(value)) return setError("Should have the form ~ship/path");
    return setError(null);
  };

  const addItem = ({ current: { value } }) => {
    if (error) return;
    let patp = value;
    let path = "";
    if (value.indexOf("/") !== -1) {
      patp = value.slice(0, value.indexOf("/"));
      path = value.slice(value.indexOf("/") + 1);
    }
    let newItem = {
      key: {
        ship: patp,
        cord: path,
        type: `/nonitem/${listType}`,
      },
      text: `${patp}/${path}`,
    };
    let x = pokeListItems.map(i => i);
    x.push(newItem);
    setPokeListItems(x);
    let poke = {
      // edit: { ...editListPoke.edit, "bespoke-input": { [pokeListType]: x } },
      edit: {
        ...editListPoke.edit,
        "bespoke-input": { [pokeListType]: { [typesOfBespokeInput[pokeListType]]: x } },
      },
    };
    doPoke(poke);
  };

  const doPoke = poke => {
    console.log(poke);
    urbit.poke({
      app: "portal-manager",
      mark: "portal-action",
      json: poke,
      onSuccess: () => {
        window.location.reload();
      },
      onError: () => {
        toast.error(`Couldn't add item, check it's ~path and try again`);
        // window.location.reload()
      },
    });
  };

  const renderAddItem = () => {
    let newItem = createRef();
    return (
      <div className="flex flex-col p-4 border border-slate-500 h-44 justify-center">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder={`~${listType}`}
              ref={newItem}
              onChange={validateItem}
              value={editListPoke?.general?.title}
            ></input>
            <p>{error}</p>
          </div>
          <button
            className="p-2 hover:bg-blue-500 rounded-lg"
            onClick={() => addItem(newItem)}
          >
            <div className="w-10">
              <CheckIcon />
            </div>
          </button>
        </div>
      </div>
    );
  };

  const toggleAddItemForm = () => {
    if (listType === "list") return;
    // if we are adding an /enditem/other we should be taken to the add item
    // page. otherwise we should just show the ~path/form.
    if (listType === "other") {
      return (window.location = `/apps/portal/item/${encodeURIComponent(
        list?.item?.keyStr
      )}/add`);
    }
    setShowAddItemForm(!showAddItemForm);
  };

  return (
    <div className="pt-12 w-full h-full">
      <div className="pb-12">
        <div className="text-2xl">Editing list: {getLongTitle(list, "list")}</div>
      </div>
      <EditGeneralForm poke={editListPoke} setPoke={setEditListPoke} action="edit" />
      <div className="flex flex-row justify-between items-center pt-4">
        <div className="text-2xl">Items</div>
        {listType !== "list" ? (
          showAddItemForm ? (
            <button className="p-2" onClick={toggleAddItemForm}>
              <div className="flex flex-row items-center">
                Hide
                <div className="w-10">
                  <MinusIcon />
                </div>
              </div>
            </button>
          ) : (
            <button className="p-2" onClick={toggleAddItemForm}>
              <div className="flex flex-row items-center bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                <div className="w-5 pr-2">
                  <PlusIcon />
                </div>
                New Post
              </div>
            </button>
          )
        ) : null}
        {listType === "list" ? (
          <button className="p2" onClick={addList}>
            <div className="flex flex-row items-center bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              <div className="w-5 pr-2">
                <PlusIcon />
              </div>
              New List
            </div>
          </button>
        ) : null}
      </div>
      {showAddItemForm && renderAddItem()}
      <div className="grid gap-4 pt-4">{renderListItems()}</div>
    </div>
  );
}
