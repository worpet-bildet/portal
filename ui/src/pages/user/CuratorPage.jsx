import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { GoBack } from "../../components/GoBack";
import { Sidebar } from "../../components/Sidebar";
import { Tag } from '../../components/Tag';
import { getUrbitApi } from "../../utils/urbitApi";

const api = getUrbitApi();

export function CuratorPage(props) {
  const [info, setCuratorInfo] = useState();
  const {curator} = useParams();

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

  const handleUpdate = (upd) => {
    console.log(upd)
    setCuratorInfo(getCuratorInfo(upd));
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const getCuratorInfo = (curatorsList) => {
    const currentCurator = getCurator(curatorsList);
    const curatorInfo = currentCurator['cur-page']['cur-info'];
    const curatorData = currentCurator['cur-page']['cur-data'];
    const curatorTitle = currentCurator['cur-page']['cur-info']['cur-title'];
    const curatorKeys = curatorData['cur-choice']['key-list'];
    const curatorSelectedApplications = curatorData['cur-map'].filter((application) => {
      const hasSelectedApplication = curatorKeys.find(curatorKey => {
        return application.key['app-name'] === curatorKey['app-name'] &&
          application.key['dev-name'] === curatorKey['dev-name'];
      });
      return hasSelectedApplication
    });
    return {
      curator: { name: curatorTitle || curator, description: curatorInfo['cur-intro'], image: curatorInfo['cur-image'] },
      categories: curatorData['cur-choice']['cat-set'],
      applications: curatorSelectedApplications
    }
  }

  const getCurator = (curatorList) => {
    return curatorList.find((curatorInfo) => curatorInfo.id === curator);
  }

  return(
    <div className='flex flex-row'>
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen">
        <main className="ml-32 basis-3/4 h-full">
          <div className="w-4/5 space-y-14 py-14">
            <GoBack titlePreviousPage="Curators" />
            <div className="flex flex-col space-y-10">
            { info && <CuratorIntroduction curator={info.curator} /> }
              <ul className="flex flex-wrap gap-4">
                { info && info.applications.length ?
                    info.categories.map((tag) => <Tag key={tag} name={tag}/>)
                    : null
                }
              </ul>
              <ul className="grid grid-cols-6 place-items-center gap-y-6">
                { info ? info.applications.map((app) =>
                    <SmallApplicationTile key={app.id} name={app.key['app-name']} image={app.docket.image} /> )
                    : null
                }
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function CuratorIntroduction({curator}) {
  return(
    <div className="w-full p-8 rounded border border-black">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-row justify-items-center'>
            <div
            className="flex-none relative w-40 h-40 mr-10 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: 'burlywood' }}
            >
              <img
              className="h-full w-full object-cover"
              src={curator.image}
              alt=""
              />
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-2xl font-bold'>
                {curator.name}
              </p>
              <p className="text-base">{curator.description}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

function SmallApplicationTile({name, image}) {
  return(
  <Link to={`/apps/galleria/usr/apps/${name}`}>
    <div className="flex flex-col gap-1 justify-content-center">
      <div
        className="block w-32 h-32 rounded-lg bg-gray-200 overflow-hidden"
        style={{ backgroundColor: 'coral' }}
      >
        <img
        className="h-full w-full object-cover"
        src={image}
        alt=""
        />
      </div>
      <p className="text-xl text-center font-bold">{name}</p>
    </div>
  </Link>
  );
}
