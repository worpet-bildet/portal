import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { IconImage } from "../../components/IconImage";
import { Input } from "../../components/Input";
import { Sidebar } from "../../components/Sidebar";
import { TextAreaInput } from "../../components/TextAreaInput";
import { getUrbitApi } from "../../utils/urbitApi";

const api = getUrbitApi();

export function CuratorMe(props) {
  const [isEditMode, setEditMode] = useState(false);
  const [curator, setCuratorInfo] = useState({name: '', image: '', description: ''});
  
  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "cur-server",
        path: "/render",
        event: handleUpdate,
        err: () => setErrorMsg("Subscription rejected"),
        quit: () => setErrorMsg("Kicked from subscription"),
        cancel: () => setErrorMsg("Subscription cancelled"),
      });
    } catch {
      setErrorMsg("Subscription failed");
    }
  };

  const handleUpdate = (data) => {
    const curatorInfo = data['cur-info'];
    const curator = {
      name: curatorInfo['cur-title'],
      image: curatorInfo['cur-image'],
      description: curatorInfo['cur-intro']
    }
    const curatorNoInfo = () => Object.keys(curator).every(property => curator[property] === '')
    setEditMode(curatorNoInfo);
    setCuratorInfo(curator);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); }

  return(
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="ml-32 basis-3/4 w-full min-h-screen">
        <div className="w-4/5 space-y-6 py-14">
          { isEditMode ?
            <Editable curator={curator} onClick={() => setEditMode(false)} />
            : (
              <div className="flex flex-row gap-24">
                <Info {...curator} onClick={() => setEditMode(true)} />
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
}

function Info({name, description, onClick}) {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-3xl font-bold">{name}</h1>
      <div>
        <h3 className="text-lg font-bold">Description</h3>
        <p className="text-sm">{description}</p>
      </div>
      <button
        type="submit"
        className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
        onClick={onClick}
      >Edit</button>
    </div>
  );
}

function Editable({ curator, onClick }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if(curator) {
      setValue('cur-info.cur-title', curator.name);
      setValue('cur-info.cur-image', curator.image);
      setValue('cur-info.cur-intro', curator.description);
    }
  }, [curator]);

  const submitNew = (curatorInfo) => {
    console.log(curatorInfo);
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: { 'cur-info': curatorInfo },
      onSuccess: () => console.log('Successfully done'),
      onError: () => setErrorMsg("Va a ser que no"),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const onSubmit = (data) => {
    submitNew(data);
    onClick();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input name="curator_name" label="Curator name" {...register('cur-info.cur-title')} />
      <Input name="curator_image" label="Curator image" {...register('cur-info.cur-image')} />
      <TextAreaInput name="description" rows="5" label="Description" {...register('cur-info.cur-intro')} />
      <div className="flex justify-end">
        <button
          className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => onClick()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
          onClick={handleSubmit(onSubmit)}
        >Save</button>
      </div>
    </div>
  );
}