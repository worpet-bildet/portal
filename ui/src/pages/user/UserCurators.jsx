import React, { useEffect, useState } from 'react';
import { AddCuratorModal } from '../../components/AddCuratorModal';
import { CuratorTile } from '../../components/CuratorTile';
import { SearchBar } from '../../components/SearchBar';
import { Sidebar } from '../../components/Sidebar';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function UserCurators(props) {
  const [curators, setCurators] = useState([]);

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
    const curatorsInfo = getCuratorsInfo(upd);
    setCurators(curatorsInfo);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const getCuratorsInfo = (curatorsList) => {
    return curatorsList.map((curator) => {
      const curatorInfo = { name: '', description: '', id: '' };
      curatorInfo.id = curator.id;
      curatorInfo.name = curator['cur-page']['cur-info']['cur-title'];
      curatorInfo.description = curator['cur-page']['cur-info']['cur-intro'];
      return curatorInfo;
    });
  }

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="w-4/5 space-y-6 py-14">
            <h1 className="text-3xl font-bold">Curators</h1>
            <SearchBar />
              <ul className="grid grid-cols-3 gap-2 space-y-4">
                <AddCuratorModal />
                { curators.length
                    ? curators.map((curator) =>
                      <CuratorTile key={curator.id} curator={curator} />
                    )
                    : null
                }
              </ul>
          </div>
        </main>
      </div>
  );
}