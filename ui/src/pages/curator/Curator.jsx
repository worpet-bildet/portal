import React, { useEffect, useState } from 'react';
import { AddDeveloperModal } from '../../components/AddDeveloperModal';
import { AppTile } from '../../components/AppTile';
import { CuratorAppTile } from '../../components/CuratorAppTile';
import { DeveloperTile } from '../../components/DeveloperTile';
import { SearchBar } from '../../components/SearchBar';
import { Sidebar } from '../../components/Sidebar';
import { Tabs } from '../../components/Tabs';
import { Notify } from '../../utils/notifications';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function Curator(props) {
  const [apps, setApps] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedButton, setSelectedButton] = useState('Developer');
  const [categorySet, setCategorySet] = useState([]);
  const [catMapApps, setCatMapApps] = useState([]);
  const [keyAppList, setKeyAppList] = useState([]);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "cur-server",
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

  const handleUpdate = (curator) => {
    setDevelopers(getDevelopers(curator));
    setApps(getApplications(curator));
  }

  const getApplications = (curator) => {
    const curatorData = curator['cur-data'];
    const curatorApps = curatorData['cur-map'];
    const curatorChoice = curatorData['cur-choice']['key-list'];
    const catMap = curator['cur-data']['cur-choice']['cat-map'];
    setCatMapApps(catMap);
    const keyList = curator['cur-data']['cur-choice']['key-list'];
    setKeyAppList(keyList);
    const categorySet = curator['cur-data']['cur-choice']['cat-set'];
    setCategorySet(categorySet);
    return curatorChoice.map((key) => {
      const appName = key['app-name'];
      const application = curatorApps.find((app) => app.key['app-name'] === appName);
      const category = catMap.find((category) => {
        return category.key['app-name'] === application.key['app-name'];
      });
      let curatorApplication = { application };
      if (category) {
        curatorApplication.category = category.category;
      }
      return curatorApplication;
    });
  }

  const getDevelopers = (curator) => {
    const developers = Object.keys(curator['cur-data']['aux-map']);
    return developers;
  }

  const setErrorMsg = (msg) => { throw new Error(msg); }

  const tabs = [{name: 'Developer'}, {name: 'Apps'}];

  const selectButton = (event) => {
    setSelectedButton(event.target.textContent);
  }

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <main className="ml-32 basis-3/4 w-full min-h-screen">
        <div className="w-4/5 space-y-6 py-14">
          <h1 className="text-3xl font-bold">My Curated Apps</h1>
          <Tabs selectButton={selectButton} selectedButton={selectedButton} tabs={tabs} />
          {apps.length && selectedButton === 'Apps' ? (
            <ul className="space-y-4">
              { apps.map((curatorApp) =>
                  <CuratorAppTile
                  key={curatorApp.application.id}
                  appKey={curatorApp.application.key}
                  category={curatorApp.category}
                  categorySet={categorySet}
                  keyList={keyAppList}
                  catMap={catMapApps}
                  {...curatorApp.application}
                />
                ) }
            </ul>
          ) : null}
          { selectedButton === 'Developer' && (
            <ul className='grid grid-cols-4 gap-2'>
              <AddDeveloperModal notification={Notify}/>
              { developers.map((developer) =>
                <DeveloperTile key={developer} name={developer} notification={Notify}/>
              )}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
