import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUrbitApi } from '../utils/urbitApi';
import { Tag } from './Tag';

const api = getUrbitApi();

export function AppTile ({ appName, keywords, docket }) {
  const [imageError, setImageError] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isShipUser = location.pathname.split('/')[3] === 'usr';
    setIsUser(isShipUser);
  }, [location.pathname])

  const deleteApp = () => {
    api.poke({
      app: "dev-server",
      mark: "app-store-dev-action",
      json: { del: { "app-name": appName } },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  }

  return (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <Link to={`/apps/app-store/usr/apps/${appName}`} className="w-full p-4 rounded border border-black hover:bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-row'>
            <div
            className="flex-none relative w-20 h-20 mr-10 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: 'aliceblue' }}
            >
            {!imageError &&
              <img
              className="h-full w-full object-cover"
              src={docket.image}
              alt=""
              onError={() => setImageError(true)}
              />
            }
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-2xl font-bold'>
                {appName}
              </p>
              {
                keywords &&
                  <ul className="flex flex-wrap gap-2">
                    { keywords.map((tag, i) =>
                      <Tag key={`${appName}_${tag}_${i}`} name={tag}/>
                    ) }
                  </ul>
              }
            </div>
          </div>
        </div>
      </Link>
      { !isUser ?
        <div className='flex'>
          <div className='relative'>
            <Link
              to={`/apps/app-store/dev/edit-app/${appName}`}
              className="absolute right-32 top-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-2 px-5"
            >
              edit
            </Link>
          </div>
          <div className='relative'>
            <button
              type="button"
              className="absolute right-6 top-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-2 px-5"
              onClick={() => deleteApp()}
            >
              delete
            </button>
          </div>
        </div>
        : null
      }
    </li>
  );
}