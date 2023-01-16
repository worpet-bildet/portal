import React, { useEffect, useState } from 'react';
import { AddButtonTile } from '../../components/AddButtonTile';
import { AppTile } from '../../components/AppTile';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

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
        <div className='flex flex-col w-full min-h-screen'>
          <main className="ml-32 basis-3/4 h-full">
            <div className="w-4/5 space-y-6 py-14">
              <h1 className="text-3xl font-bold">My Apps</h1>
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
          <Footer />
        </div>
      </div>
  );
}
