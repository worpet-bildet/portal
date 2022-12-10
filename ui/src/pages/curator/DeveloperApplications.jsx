import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mockApi from "../../../mocks/dev-view.json";
import { AppTile } from '../../components/AppTile';
import { GoBack } from '../../components/GoBack';
import { Sidebar } from '../../components/Sidebar';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function DeveloperApplications(props) {
  const [apps, setApps] = useState([]);
  const {developer} = useParams();

  useEffect(() => {
    setApps(getApplications());
  }, []);

  // This will be an async function to make the calls to urbit ship.
  const getApplications = () => {
    return Object.keys(mockApi);
  }

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
          <div className="absolute top-0 w-4/5 space-y-6 py-14">
            <GoBack titlePreviousPage="My Curated Apps" />
            <h1 className="text-3xl font-bold">{developer}</h1>
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