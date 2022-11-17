import React, { useState } from 'react';
import { Options } from './Options';
import { Tag } from './Tag';

function normalizeUrbitColor(color) {
  if (color.startsWith('#')) {
    return color;
  }
  return `#${color.slice(2).replace('.', '').toUpperCase()}`;
}

export function AppTile (props) {
  const [imageError, setImageError] = useState(false);

  return (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <div className="w-full p-4 rounded border border-black hover:bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-row'>
            <div
            className="flex-none relative w-20 h-20 mr-10 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: normalizeUrbitColor(props.color) }}
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
            <div className='flex flex-col space-y-3'>
              <p className='text-2xl font-bold'>
                {props.title}
              </p>
              {
                props.keywords &&
                  <ul className="flex flex-wrap gap-2">
                    { props.keywords.map((tag, i) =>
                      <Tag key={`${props.title}_${tag}_${i}`} name={tag}/>
                    ) }
                  </ul>
              }
            </div>
          </div>
          <Options />
        </div>
      </div>
    </li>
  );
}