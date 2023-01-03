import React, { useEffect, useState } from 'react';
import { AddCuratorModal } from '../../components/AddCuratorModal';
import { CuratorTile } from '../../components/CuratorTile';
import { Disclaimer } from '../../components/Disclaimer';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { Notify } from '../../utils/notifications';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

export function UserCurators(props) {
  const [curators, setCurators] = useState([]);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    api.subscribe({
      app: "usr-server",
      path: "/render",
      event: handleUpdate,
      err: () => setErrorMsg("Subscription rejected"),
      quit: () => setErrorMsg("Kicked from subscription"),
      cancel: () => setErrorMsg("Subscription cancelled"),
    });
  };

  const handleUpdate = (upd) => {
    const curatorsInfo = getCuratorsInfo(upd);
    setCurators(curatorsInfo);
  }

  const getCuratorsInfo = (curatorsList) => {
    return curatorsList.map((curator) => {
      const curatorInfo = { name: '', description: '', id: '', cur_name: '' };
      curatorInfo.id = curator.id;
      curatorInfo.name = curator['cur-page']['cur-info']['cur-title'];
      curatorInfo.description = curator['cur-page']['cur-info']['cur-intro'];
      curatorInfo.cur_name = curator['cur-name'];
      return curatorInfo;
    });
  }

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <div className='flex flex-col w-full min-h-screen'>
          <main className="ml-32 basis-3/4 h-full">
            <div className="w-4/5 space-y-6 py-14">
              <h1 className="text-3xl font-bold">Curators</h1>
              <Disclaimer
                color='blue'
                message={'Curators create collections of apps. Users who subscribe to curator(s) will see their collection(s) upon opening Galleria.'}
              />
              <ul className="grid grid-cols-3 gap-2 space-y-4">
                <AddCuratorModal notification={Notify}/>
                { curators.length
                    ? curators.map((curator) =>
                      <CuratorTile key={curator.id} curator={curator} notification={Notify}/>
                    )
                    : null
                }
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
  );
}
