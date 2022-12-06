import Urbit from '@urbit/http-api';
import React, { useEffect } from 'react';
import { AddButtonTile } from '../../components/AddButtonTile';
import { CuratorTile } from '../../components/CuratorTile';
import { SearchBar } from '../../components/SearchBar';
import { Sidebar } from '../../components/Sidebar';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// TODO(adrian): Add api call from ship to get applications
export function UserCurators(props) {

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "usr-server",
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

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const curators = [
    {name: 'Curator', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    {name: 'Curator', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    {name: 'Curator', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    {name: 'Curator', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    {name: 'Curator', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    {name: 'Curator', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  ];

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="w-4/5 space-y-6 py-14">
            <h1 className="text-3xl font-bold">Curators</h1>
            <SearchBar />
              <ul className="grid grid-cols-3 gap-2 space-y-4">
                <AddButtonTile buttonName="Add a curator" />
                { curators.map((curator, i) =>
                    <CuratorTile key={curator.name + i} curator={curator} />
                  ) }
              </ul>
          </div>
      </main>
      </div>
  );
}