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
        <div className="flex items-center justify-end w-full">
          <button className="p-4 bg-green-500 rounded-lg" onClick={() => doPoke(poke)}>
            Save
          </button>
        </div>
        <div>title</div>
        <input
          className="w-full bg-transparent text-white border-white text-2xl"
          type="text"
          autoFocus={true}
          placeholder="wow guys look at this"
          value={title}
          onChange={e => setGeneralProp("title", e.target.value)}
        ></input>
      </div>
      <div>
        <div>description</div>
        <textarea
          className="w-full bg-transparent text-white border-white"
          onChange={e => setGeneralProp("description", e.target.value)}
          value={description}
        ></textarea>
      </div>
      <div>
        <div>image link</div>
        <input
          className="w-full bg-transparent text-white border-white"
          type="text"
          placeholder="https://some.url/image.png"
          value={image}
          onChange={e => setGeneralProp("image", e.target.value)}
        ></input>
      </div>
      <div>
        <div>web link</div>
        <input
          className="w-full bg-transparent text-white border-white"
          type="text"
          placeholder="https://some.url/"
          value={link}
          onChange={e => setGeneralProp("link", e.target.value)}
        ></input>
      </div>
    </div>
  );
}
