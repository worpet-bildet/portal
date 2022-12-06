import { scryCharges } from '@urbit/api';
import Urbit from '@urbit/http-api';
import React, { useEffect, useState } from 'react';
import mockApi from "../../../mocks/dev-view.json";
import { AddButtonTile } from '../../components/AddButtonTile';
import { AppTile } from '../../components/AppTile';
import { Sidebar } from '../../components/Sidebar';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// TODO(adrian): Add api call from ship to get applications
export function Developer(props) {
  const [apps, setApps] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    subscribe();
    setApps(getApplications());
    setButtons(sidebarButtons);
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "dev-server",
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

  const mockAppPage = {
    "app-name": "app-store",
    "dev-input": {
      description: "blahblah",
      screenshots: ["link1", "link2"],
      keywords: ["kyw1", "kyw2"],
      "dst-desk": "~zod/app-store"
    }
  }

  const submitNew = () => {
    api.poke({
      app: "dev-server",
      mark: "app-store-dev-action",
      json: { add: mockAppPage },
      onSuccess: () => console.log('Successfully done'),
      onError: () => this.setErrorMsg("Va a ser que no"),
    });
  };

  const handleUpdate = (upd) => {
    console.log(upd);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const sidebarButtons = [{
      buttonName: "Application",
      link: '/apps/app-store/dev'
    }, {
      buttonName: "Upload an App",
      link: '/apps/app-store/dev/upload-app'
    }
  ];

  // This will be an async function to make the calls to urbit ship.
  const getApplications = () => {
    return Object.keys(mockApi);
  }

  return (
      <div className='flex flex-row'>
        <Sidebar buttons={buttons} />
        <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="w-4/5 space-y-6 py-14">
            <h1 className="text-3xl font-bold">My applications</h1>
            {apps.length && (
              <ul className="space-y-4">
                <button onClick={() => submitNew()} >Add Mock Page</button>
                <AddButtonTile buttonName="Add App page"/>
                { Object.entries(apps).map((applicationName) =>
                    <AppTile key={applicationName[1]} {...mockApi[applicationName[1]]} />
                  ) }
              </ul>
            )}
          </div>
      </main>
      </div>
  );
}