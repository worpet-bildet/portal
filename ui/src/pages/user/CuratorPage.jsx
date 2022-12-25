import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";
import { Sidebar } from "../../components/Sidebar";
import { Tag } from '../../components/Tag';
import { getUrbitApi } from "../../utils/urbitApi";
import { Link, useLocation } from 'react-router-dom';

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
    setCuratorInfo(getCuratorInfo(upd));
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const getCuratorInfo = (curatorsList) => {
    const currentCurator = getCurator(curatorsList);
    const curatorInfo = currentCurator['cur-page']['cur-info'];
    const curatorData = currentCurator['cur-page']['cur-data'];
    return {
      curator: { name: curator, description: curatorInfo['cur-intro'] },
      categories: curatorData['cur-choice']['cat-set'],
      applications: curatorData['cur-choice']['cat-map']
    }
  }

  const getCurator = (curatorList) => {
    return curatorList.find((curatorInfo) => curatorInfo['cur-page']['cur-info']['cur-title'] === curator);
  }

  return(
    <div className='flex flex-row'>
      <Sidebar />
      <main className="ml-32 basis-3/4 w-full min-h-screen">
        <div className="w-4/5 space-y-14 py-14">
          <GoBack titlePreviousPage="Curators" />
          <div className="flex flex-col space-y-10">
          { info && <CuratorIntroduction curator={info.curator} image='' /> }
            <ul className="flex flex-wrap gap-4">
              { info && info.categories.map((tag) => <Tag key={tag} name={tag}/>) }
            </ul>
            <ul className="grid grid-cols-6 place-items-center gap-y-6">
              { info && info.applications.map((app) =>
                  <SmallApplicationTile key={app.id} name={app.key['app-name']} /> ) }
            </ul>
          </div>
        </div>
      </main>
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
  <Link to={`/apps/app-store/usr/apps/${name}`}>
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
