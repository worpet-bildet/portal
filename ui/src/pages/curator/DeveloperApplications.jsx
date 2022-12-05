import Urbit from '@urbit/http-api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mockApi from "../../../mocks/dev-view.json";
import { AppTile } from '../../components/AppTile';
import { Sidebar } from '../../components/Sidebar';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// TODO(adrian): Add api call from ship to get applications
export function DeveloperApplications(props) {
  const [apps, setApps] = useState([]);
  const [buttons, setButtons] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setApps(getApplications());
    setButtons(sidebarButtons);
  }, []);

  const sidebarButtons = [{
      buttonName: "My Profile",
      link: '/apps/app-store/cur/me'
    }, {
      buttonName: "My Curated Apps",
      link: '/apps/app-store/cur/my-apps'
    }
  ];

  // This will be an async function to make the calls to urbit ship.
  const getApplications = () => {
    return Object.keys(mockApi);
  }

  const goBack = () => {
    navigate(-1);
  }

  return (
      <div className='flex flex-row'>
        <Sidebar buttons={buttons} />
        <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="absolute top-0 w-4/5 space-y-6 py-14">
            <button onClick={goBack} className="flex gap-2 text-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              My Curated Apps
            </button>
            <h1 className="text-3xl font-bold">{id}</h1>
            {apps.length && (
              <ul className="space-y-4">
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