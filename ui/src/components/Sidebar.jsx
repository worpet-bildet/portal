import { Button } from 'flowbite-react';
import React from 'react';

export function Sidebar(props) {
  return (
    <aside className="flex flex-col justify-between w-56 h-screen sticky top-0 bg-primary border-r border-black" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3">
          <div className="flex flex-col items-center space-y-2 py-10">
            {props.buttons && props.buttons.map((buttonName, index) =>
              <SidebarItem
                key={`${buttonName}-${index}`}
                buttonName={buttonName}
              />
            )}
          </div>
      </div>
      <div>
        <SwitchAccounts />
        <div className='py-5'></div>
      </div>
    </aside>
  );
}

function SidebarItem(props) {
  return (
      <a
        href="#"
        className="w-48 p-1 border border-black text-gray-900 bg-white dark:text-white hover:border-2 hover:font-semibold dark:hover:bg-gray-700"
      >
        <span className="ml-3 font-md">{props.buttonName}</span>
      </a>
  );
}

function SwitchAccounts(props) {
  return (
    <div className='flex flex-col gap-y-4'>
      <p className='self-center'>Switch account</p>
      <div className="flex justify-center gap-6 w-2/4 self-center">
        <a href='#'>
          <div className="rounded-full border border-black bg-white flex p-7 relative hover:border-2">
            <span className="absolute top-4 left-5 font-bold text-3xl">
                C
            </span>
          </div>
        </a>
        <a href='#'>
          <div className="rounded-full border border-black bg-white flex p-7 relative hover:border-2">
            <span className="absolute top-4 left-5 font-bold text-3xl">
                U
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}