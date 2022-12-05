import { scryCharges } from '@urbit/api';
import Urbit from '@urbit/http-api';
import React, { useEffect, useState } from 'react';
import mockApi from "../../../mocks/dev-view.json";
import { AddButtonTile } from '../../components/AddButtonTile';
import { AppTile } from '../../components/AppTile';
import { DeveloperTile } from '../../components/DeveloperTile';
import { SearchBar } from '../../components/SearchBar';
import { Sidebar } from '../../components/Sidebar';
import { Tabs } from '../../components/Tabs';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// TODO(adrian): Add api call from ship to get applications
export function Curator(props) {
  const [apps, setApps] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState('Apps');

  useEffect(() => {
    subscribe();
    setApps(getApplications());
    setButtons(sidebarButtons);
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "cur-server",
        path: "/render",
        event: handleUpdate,
        err: () => setErrorMsg("Subscription rejected"),
        quit: () => setErrorMsg("Kicked from subscription"),
        cancel: () => setErrorMsg("Subscription cancelled"),
      });
    } catch {
      setErrorMsg("Subscription failed");
    }
  };

  const handleUpdate = (upd) => {
    console.log(upd);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); }

  const sidebarButtons = [{
      buttonName: "My Profile",
      link: '/apps/app-store/cur/me'
    }, {
      buttonName: "My Curated Apps",
      link: '/apps/app-store/cur/my-apps'
    }
  ];

  const getApplications = () => {
    return Object.keys(mockApi);
  }

  const developers = [
    { name: 'John' },
    { name: 'John Smith' },
    { name: 'John' },
    { name: 'John' },
    { name: 'John' }
  ]

  const tabs = [{name: 'Developer'}, {name: 'Apps'}];

  const selectButton = (event) => {
    setSelectedButton(event.target.textContent);
  }

  return (
    <div className='flex flex-row'>
      <Sidebar buttons={buttons} />
      <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="absolute top-0 w-4/5 space-y-6 py-14">
          <h1 className="text-3xl font-bold">My Curated Apps</h1>
          <Tabs selectButton={selectButton} tabs={tabs} />
          <SearchBar />
          {apps.length && selectedButton === 'Apps' && (
            <ul className="space-y-4">
              <button onClick={() => submitNew()} >Add Mock Page</button>
              <AddButtonTile buttonName="Add App page"/>
              { Object.entries(apps).map((applicationName) =>
                  <AppTile key={applicationName[1]} {...mockApi[applicationName[1]]} />
                ) }
            </ul>
          )}
          { selectedButton === 'Developer' && (
            <ul className='grid grid-cols-3 gap-2'>
              { developers.map((developer, i) =>
                // Change key to just name. It shouldn't be duplicated
                <DeveloperTile key={developer.name + i} name={developer.name} />
              )}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
