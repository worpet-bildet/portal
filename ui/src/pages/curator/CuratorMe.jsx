import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { IconImageInput } from "../../components/IconImageInput";
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
    console.log(data);
    const curatorInfo = data['cur-info'];
    const curator = {
      name: curatorInfo['cur-title'],
      image: curatorInfo['cur-image'],
      description: curatorInfo['cur-intro']
    }
    const curatorNoInfo = () => Object.keys(curator).every(property => {
      console.log(curator[property] === '')
      return curator[property] === '';
    })
    setEditMode(curatorNoInfo);
    setCuratorInfo(curator);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); }

  return(
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="absolute flex flex-row gap-20 top-0 w-4/5 space-y-6 py-14">
          {/** Here goes curator image or maybe inside the else*/}
          { isEditMode ?
            <Editable {...curator} onClick={() => setEditMode(false)} />
            : (
              <div className="flex flex-row gap-24">
                <IconImageInput />
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
    <div className="flex flex-col basis-2/3 gap-4">
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

function Editable({ name, description, image, onClick }) {
  const { register, handleSubmit } = useForm();

  const submitNew = (curatorInfo) => {
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
      <Input name="curator_name" label="Curator name" placeholder={name} {...register('cur-info.cur-title')} />
      <Input name="curator_image" label="Curator image" placeholder={image} {...register('cur-info.cur-image')} />
      <TextAreaInput name="description" rows="5" label="Description" placeholder={description} {...register('cur-info.cur-intro')} />
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

const CuratorImageInput = React.forwardRef(({name, label, value, ...rest}, ref) => {
  return (
    <div className='flex flex-col w-full'>
      <label className="text-sm font-semibold text-gray-800" htmlFor={name}>{label}</label>
        <input
          type="text"
          name={name}
          className="w-full text-xs text-gray-900 border border-gray-900 focus:ring-gray-900 focus:border-gray-900"
          placeholder={placeholder}
          value={value}
          {...rest}
          ref={ref}
        />
    </div>
  );
});