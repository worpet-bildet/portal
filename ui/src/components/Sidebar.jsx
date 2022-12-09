import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CuratorPageButtons, DeveloperPageButtons, UserPageButtons } from '../constants/sidebarButtons';

export function Sidebar(props) {
  const [currentLocation, setCurrentLocation] = useState('');
  const [buttons, setButtons] = useState([]);
  let location = useLocation();

  useEffect(() => {
    setCurrentLocation(location.pathname);
    setButtons(getButtons(currentLocation));
  });
  
  return (
    <aside className="flex flex-col justify-between w-72 h-screen sticky top-0 bg-primary border-r border-black" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3">
          <ul className="flex flex-col items-center space-y-2 py-10">
            { buttons.sidebar && buttons.sidebar.map(({button, link}) =>
              <SidebarItem
                key={button}
                button={button}
                link={link}
              />
            )}
          </ul>
      </div>
      <div>
        { buttons.accounts && <SwitchAccounts accounts={buttons.accounts} /> }
        <div className='py-5'></div>
      </div>
    </aside>
  );
}

function getButtons(location) {
  if(!location) {
    return [];
  }
  const whichPage = location.split('/')[3];
  if(whichPage === 'usr') {
    return UserPageButtons;
  }
  if(whichPage === 'cur') {
    return CuratorPageButtons;
  }
  return DeveloperPageButtons;
}

function SidebarItem(props) {
  return (
    <Link
      to={props.link}
      className="w-48 p-1 border border-black text-gray-900 bg-white dark:text-white hover:border-2 hover:font-semibold dark:hover:bg-gray-700"
    >
      <span className="w-full ml-3 font-basis">{props.button}</span>
    </Link>
  );
}

function SwitchAccounts({accounts}) {
  return (
    <div className='flex flex-col gap-y-4'>
      <p className='self-center'>Switch role</p>
      <ul className="flex justify-center gap-6 w-2/4 self-center">
        { accounts.map((account) => <Account key={account.name} {...account} />) }
      </ul>
    </div>
  );
}

function Account({link, name}) {
  return (
    <li>
      <Link to={link}>
        <div className="rounded-full border border-black bg-white flex p-7 relative hover:border-2">
          <span className="absolute top-4 left-5 font-bold text-3xl">
              {name}
          </span>
        </div>
      </Link>
    </li>
  );
}