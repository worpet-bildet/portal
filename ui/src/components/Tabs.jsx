import React, { useState } from 'react';

export function Tabs({tabs, selectButton, selectedButton}) {
  return (
    <div>
      <ul className='flex border border-gray-900 w-full'>
        { tabs.map((tab) => <Tab key={tab.name} name={tab.name} selectButton={selectButton} selectedButton={selectedButton}/>) }
      </ul>
    </div>
  );
}

function Tab({selectButton, name, selectedButton}) {
  const isThisSelected = () => {
    if (name === selectedButton) {
      return true;
    }
    return false
  }
  return (
    <li className='w-full'>
      <button className={`w-full block m-auto py-0.5 font-bold ${ isThisSelected() ? 'border border-gray-900 bg-gray-300' : ''}`} onClick={selectButton}>{name}</button>
    </li>
  );
}