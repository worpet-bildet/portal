import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUrbitApi } from '../utils/urbitApi';

const api = getUrbitApi();

export function CuratorTile ({curator, image}) {
  const [imageError, setImageError] = useState(false);

  const unsubscribe = () => {
    api.poke({
      app: "usr-server",
      mark: "app-store-usr-action",
      json: { unsub: { "cur-name": curator.id } },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  }

  return (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <Link to={`/apps/app-store/usr/curs/${curator.name}`} className="w-full p-4 rounded border border-black hover:bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-row'>
            <div
            className="flex-none relative w-16 h-16 mr-4 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: 'blueviolet' }}
            >
            {!imageError &&
              <img
              className="h-full w-full object-cover"
              src={image}
              alt=""
              onError={() => setImageError(true)}
              />
            }
            </div>
            <div className='flex flex-col space-y-1'>
              <p className='text-lg font-bold'>
                {curator.name}
              </p>
              <p className='text-xs font-medium'>
                {curator.cur_name}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className='relative'>
        <button
          type="button"
          className="absolute right-6 top-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-2 px-5"
          onClick={() => unsubscribe()}
        >
          unsub
        </button>
      </div>
    </li>
  );
}
