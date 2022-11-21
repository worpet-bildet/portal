import React from 'react';
import { Link } from 'react-router-dom';

export function AddButtonTile (props) {
  
  return (
    <li>
      <Link
        to='/apps/app-store/dev/upload-app'
      >
        <div className='w-full p-4 bg-secondary rounded hover:bg-gray-300'>
          <div className="flex flex-auto flex-row">
            <div
              className="w-20 h-20 mr-10 border border-black"
            >
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className='self-center font-bold text-2xl'>
              {props.buttonName}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}