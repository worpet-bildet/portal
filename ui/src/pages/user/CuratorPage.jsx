import React from "react";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";
import { Sidebar } from "../../components/Sidebar";
import { Tag } from '../../components/Tag';

export function CuratorPage(props) {
  const {curator} = useParams();

  const info = [{
    curator: {
      name: curator,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus sapiente suscipit quae tempora laudantium, maiores nesciunt. Amet eaque deleniti odit dolor pariatur omnis. Ab perferendis ullam debitis asperiores. Esse, ullam.'
    },
    categories: ['this', 'that', 'other'],
    applications: [
      { image: '', name: 'App name' },
      { image: '', name: 'App name' },
      { image: '', name: 'App name' },
      { image: '', name: 'App name' },
      { image: '', name: 'App name' },
      { image: '', name: 'App name' },
      { image: '', name: 'App name' }
    ]
  }];


  return(
    <div className='flex flex-row'>
      <Sidebar />
      <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="absolute top-0 w-4/5 space-y-14 py-14">
          <GoBack titlePreviousPage="Curators" />
          <div className="flex flex-col space-y-10">
            <CuratorIntroduction curator={info[0].curator} image='' />
            <ul className="flex flex-wrap gap-4">
              { info[0].categories.map((tag, i) =>
                <Tag key={`${props.title}_${tag}_${i}`} name={tag}/>
              ) }
            </ul>
            <ul className="grid grid-cols-6 place-items-center gap-y-6">
              { info[0].applications.map((app, i) => <SmallApplicationTile key={app + i} {...app} />) }
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function CuratorIntroduction(props) {
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
              src={props.image}
              alt=""
              />
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-2xl font-bold'>
                {props.curator.name}
              </p>
              <p className="text-base">{props.curator.description}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

function SmallApplicationTile(props) {
  return(
    <div className="flex flex-col gap-1 justify-content-center">
      <div
        className="block w-32 h-32 rounded-lg bg-gray-200 overflow-hidden"
        style={{ backgroundColor: 'coral' }}
      >
        <img
        className="h-full w-full object-cover"
        src={props.image}
        alt=""
        />
      </div>
      <p className="text-xl text-center font-bold">{props.name}</p>
    </div>
  );
}