import React from 'react';

export function Tabs(props) {
  return (
    <div>
      <ul className='flex border border-gray-900 w-full'>
        { props.tabs.map((tab) => <Tab key={tab.name} name={tab.name} selectButton={props.selectButton}/>) }
      </ul>
    </div>
  );
}

function Tab(props) {
  return (
    <li className='w-full'>
      <button className='w-full block m-auto py-0.5 font-bold focus:border focus:border-gray-900 focus:bg-gray-300' onClick={props.selectButton}>{props.name}</button>
    </li>
  );
}