import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CuratorAppTile } from '../../components/CuratorAppTile';
import { GoBack } from '../../components/GoBack';
import { Sidebar } from '../../components/Sidebar';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function DeveloperApplications(props) {
  const [curatorApps, setCuratorApps] = useState([]);
  const [categorySet, setCategorySet] = useState([]);
  const [catMapApps, setCatMapApps] = useState([]);
  const [keyAppList, setKeyAppList] = useState([]);
  const {developer} = useParams();

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
    setCuratorApps(getApplications(curator));
  }

  const getApplications = (curator) => {
    const developerApps = curator['cur-data']['aux-map'][developer];
    const curatorApps = curator['cur-data']['cur-map'];
    const catMap = curator['cur-data']['cur-choice']['cat-map'];
    setCatMapApps(catMap);
    const keyList = curator['cur-data']['cur-choice']['key-list'];
    setKeyAppList(keyList);
    const categorySet = curator['cur-data']['cur-choice']['cat-set'];
    setCategorySet(categorySet);
    return developerApps.map((appName) => {
      // Change to check developer too
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

  const setErrorMsg = (msg) => { throw new Error(msg); }

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <main className="ml-32 basis-3/4 w-full min-h-screen">
          <div className="w-4/5 space-y-6 py-14">
            <GoBack titlePreviousPage="My Curated Apps" />
            <h1 className="text-3xl font-bold">{developer}</h1>
            {curatorApps.length ? (
              <ul className="space-y-4">
                { curatorApps.map((curatorApp) =>
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
            ) : null }
          </div>
      </main>
      </div>
  );
}
