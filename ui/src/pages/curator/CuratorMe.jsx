import React from "react";
import { IconImageInput } from "../../components/IconImageInput";
import { Sidebar } from "../../components/Sidebar";

export function CuratorMe(props) {
  return(
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="absolute flex flex-row gap-20 top-0 w-4/5 space-y-6 py-14">
          <IconImageInput />
          <InputEditable />
        </div>
      </main>
    </div>
  );
}

function InputEditable(props) {
  return (
    <div className="flex flex-col basis-2/3 gap-4">
      <h1 className="text-3xl font-bold">Curator name</h1>
      <div>
        <h3 className="text-lg font-bold">Description</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus neque consequuntur ullam officia, architecto voluptate aperiam reiciendis obcaecati delectus necessitatibus. Inventore pariatur odio amet debitis nesciunt ratione libero voluptatem iure?</p>
      </div>
      <button type="submit" className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5" href="">Edit</button>
    </div>
  );
}