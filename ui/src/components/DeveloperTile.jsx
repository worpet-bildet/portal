import React from 'react';
import { Link } from 'react-router-dom';
import { getUrbitApi } from '../utils/urbitApi';

const api = getUrbitApi();

export function DeveloperTile({ name }) {
  const unsubscribe = () => {
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: { unsub: { "dev-name": name } },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  }

  return (
    <li className='flex flex-row justify-items-center'>
      <Link to={`/apps/app-store/cur/devs/${name}`} className='w-full border border-gray-900 flex justify-between py-3'>
        <div className='pl-3 font-bold'>{name}</div>
      </Link>
      <div className='relative'>
        <button
          type="button"
          className="absolute h-full right-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white px-3"
          onClick={() => unsubscribe()}
        >
          unsub
        </button>
      </div>
    </li>
  );
}