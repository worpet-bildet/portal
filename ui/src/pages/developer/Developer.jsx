import { scryCharges } from '@urbit/api';
import React, { useEffect, useState } from 'react';
import { AddButtonTile } from '../../components/AddButtonTile';
import { AppTile } from '../../components/AppTile';
import { Sidebar } from '../../components/Sidebar';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function Developer(props) {
  const [applicationNames, setApplicationNames] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "dev-server",
        path: "/render",
        event: handleUpdate,
        err: (err) => setErrorMsg(err),
        quit: (err) => setErrorMsg(err),
        cancel: (err) => setErrorMsg(err),
      });
    } catch (err) {
      setErrorMsg(err);
    }
  };

  const handleUpdate = (data) => {
    setApplicationNames(data["app-set"]);
    setApplications(data["dev-map"]);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const findApplication = (name) => (applications.find((app) => app.key['app-name'] === name));

  const getAppId = (name) => findApplication(name).id;

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="w-4/5 space-y-6 py-14">
            <h1 className="text-3xl font-bold">My applications</h1>
            {applications.length
              ? (
                <ul className="space-y-4">
                  <AddButtonTile buttonName="Add App page"/>
                  { applicationNames.map((appName) =>
                      <AppTile key={getAppId(appName)} appName={appName} {...findApplication(appName)}/>
                    )
                  }
                </ul>
              ): null }
          </div>
      </main>
      </div>
  );
}