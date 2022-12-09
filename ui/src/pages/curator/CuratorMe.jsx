import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { IconImageInput } from "../../components/IconImageInput";
import { Input } from "../../components/Input";
import { Sidebar } from "../../components/Sidebar";
import { TextAreaInput } from "../../components/TextAreaInput";

export function CuratorMe(props) {
  const [isEditMode, setEditMode] = useState(false);
  const curator = {
    name: 'Curator name',
    image: "http//:something",
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus neque consequuntur ullam officia, architecto voluptate aperiam reiciendis obcaecati delectus necessitatibus. Inventore pariatur odio amet debitis nesciunt ratione libero voluptatem iure?'
  };
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
                <InputEditable {...curator} onClick={() => setEditMode(true)} />
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
}

function InputEditable({name, description, onClick}) {

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

  const onSubmit = (data) => {
    console.log(data);
    onClick();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input name="curator_name" label="Curator name" value={name} {...register('cur-info.cur-title')} />
      <Input name="curator_image" label="Curator image" value={image} {...register('cur-info.cur-image')} />
      <TextAreaInput name="description" rows="5" label="Description" value={description} {...register('cur-info.cur-intro')} />
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