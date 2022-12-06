import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Options } from './Options';

function normalizeUrbitColor(color) {
  if (color.startsWith('#')) {
    return color;
  }
  return `#${color.slice(2).replace('.', '').toUpperCase()}`;
}

export function CuratorTile (props) {
  const [imageError, setImageError] = useState(false);

  return (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <Link to={`/apps/app-store/usr/curs/${props.curator.name}`} className="w-full p-4 rounded border border-black hover:bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-row'>
            <div
            className="flex-none relative w-16 h-16 mr-4 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: 'blueviolet' }}
            >
            {!imageError &&
              <img
              className="h-full w-full object-cover"
              src={props.image}
              alt=""
              onError={() => setImageError(true)}
              />
            }
            </div>
            <div className='flex flex-col space-y-1'>
              <p className='text-lg font-bold'>
                {props.curator.name}
              </p>
              <p className='text-xs font-medium'>
                {props.curator.description}
              </p>
            </div>
          </div>
          <Options />
        </div>
      </Link>
    </li>
  );
}