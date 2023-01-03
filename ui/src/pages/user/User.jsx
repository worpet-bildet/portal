import React, { useEffect, useState } from 'react';
import { AppTile } from '../../components/AppTile';
import { Footer } from '../../components/Footer';
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
    console.log(curators)
    setApplications(getApplications(curators));
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };


  const getApplications = (curators) => {
    let apps = [];
    //select a subset from cur-map which is defined with key-list
    curators.map((curator) => {
      const curatorApps = curator['cur-page']['cur-data']['cur-map'];
      const keyList = curator['cur-page']['cur-data']['cur-choice']['key-list']
      let curatorChoice=[];
      keyList.forEach((key) => {
      let appPage = curatorApps.find((app) => (app.key['app-name'] === key['app-name'] &&  app.key['dev-name'] === key['dev-name']));
        if(!appPage) {
          return;
        } curatorChoice.push(appPage);
      });
      apps = apps.concat(curatorChoice);
    });
    return apps;
  }

  return (
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col w-full min-h-screen'>
          <main className="ml-32 basis-3/4 h-full">
            <div className="w-4/5 space-y-6 py-14">
              <h1 className="text-3xl font-bold">Discover Apps</h1>
              { applications.length ? (
                <ul className="space-y-4">
                  { applications.map((app) =>
                      {
                      console.log(app);
                      return <AppTile key={app.id} appName={app.key['app-name']} {...app} />}
                    ) }
                </ul>
                ): null }
            </div>
          </main>
          <Footer />
        </div>
      </div>
  );
}
