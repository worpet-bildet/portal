import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Options } from './Options';
import { Tag } from './Tag';

function normalizeUrbitColor(color) {
  if (color.startsWith('#')) {
    return color;
  }
  return `#${color.slice(2).replace('.', '').toUpperCase()}`;
}

export function AppTile ({ appName, keywords }) {
  const [imageError, setImageError] = useState(false);
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
              src=""
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
          <Options />
        </div>
      </Link>
    </li>
  );
}