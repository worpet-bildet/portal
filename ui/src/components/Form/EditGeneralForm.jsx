import React from "react";
import { usePortal } from "../../state/usePortal";

export function EditGeneralForm({ poke, setPoke, action, onSave }) {
  const { urbit } = usePortal();
  let {
    [action]: {
      general: { title, description, image, link },
    },
  } = poke;

  const setGeneralProp = (prop, value) => {
    let newPoke = { ...poke }; // clone so we can edit
    newPoke[action]["general"][prop] = value;
    setPoke(newPoke);
  };

  const doPoke = poke => {
    console.log(poke);
    urbit.poke({
      app: "portal-manager",
      mark: "portal-action",
      json: poke,
      // onSuccess: () => window.location.reload(),
      onSuccess: e => {
        console.log(e);
        if (onSave) onSave(e);
      },
      // onError: () => window.location.reload(),
      onError: e => {
        console.error(e);
      },
    });
  };

  return (
    <div className="grid gap-4">
      <div className="w-full">
        <div className="flex items-center justify-end w-full pr-2">
          <button className="bg-[#0284c7] rounded-lg px-3 py-2 text-sm font-medium"
          onClick={() => {
            doPoke(poke);
            window.history.back(); // TODO: rethink this, probably better to navigate 1 level up this heirarchy: profile page <- profile page (edit mode) <- edit list <- edit item
          }}>
            Save
          </button>
        </div>
        <div>Title</div>
        <input
          className="w-full bg-transparent text-white rounded-md"
          type="text"
          autoFocus={true}
          placeholder="Portal"
          value={title}
          onChange={e => setGeneralProp("title", e.target.value)}
        ></input>
      </div>
      <div>
        <div>Description</div>
        <textarea
          className="w-full bg-transparent text-white rounded-md"
          onChange={e => setGeneralProp("description", e.target.value)}
          value={description}
          placeholder="A tool for decentralized curation and discovery on Urbit"
        ></textarea>
      </div>
      <div>
        <div>Image link</div>
        <input
          className="w-full bg-transparent text-white rounded-md"
          type="text"
          placeholder="https://nyc3.digitaloceanspaces.com/image.svg"
          value={image}
          onChange={e => setGeneralProp("image", e.target.value)}
        ></input>
      </div>
      <div>
        <div>Web link</div>
        <input
          className="w-full bg-transparent text-white rounded-md"
          type="text"
          placeholder="https://some.url/"
          value={link}
          onChange={e => setGeneralProp("link", e.target.value)}
        ></input>
      </div>
    </div>
  );
}
