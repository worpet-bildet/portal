import React, { useEffect, useState } from 'react';
import mockApi from "../../../mocks/dev-view.json";
import { AppTile } from '../../components/AppTile';
import { SearchBar } from '../../components/SearchBar';
import { Sidebar } from '../../components/Sidebar';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function User(props) {
  const [applications, setApplications] = useState([]);

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

  const handleUpdate = (curators) => {
    const apps = getApplications(curators);
    console.log(apps);
    setApplications(apps);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const getApplications = (curators) => {
    let apps = [];
    curators.map((curator) => {
      const curatorApps = curator['cur-page']['cur-data']['cur-map'];
      apps = apps.concat(curatorApps);
    });
    return apps;
  }

  return (
      <div className='flex flex-row'>
        <Sidebar />
        <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="w-4/5 space-y-6 py-14">
            <h1 className="text-3xl font-bold">My applications</h1>
            <SearchBar />
            { applications.length ? (
              <ul className="space-y-4">
                { applications.map((app) =>
                    <AppTile key={app.id} appName={app.key['app-name']} {...app} />
                  ) }
              </ul>
              ): null }
          </div>
      </main>
      </div>
  );
}