import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUrbitApi } from '../utils/urbitApi';
import { Tag } from './Tag';

const api = getUrbitApi();

export function CuratorAppTile ({ category, categorySet, appKey, catMap, keyList, refresh }) {
  const [imageError, setImageError] = useState(false);
  const getCatMap = catMap.map((app) => {
    delete app.id;
    return app;
  }).filter((app) => app.key['app-name'] !== appKey['app-name'])

  const { handleSubmit } = useForm({
    defaultValues: {
      select: {
        "key-list": keyList.filter((key) => key['app-name'] !== appKey['app-name']),
        "cat-map": getCatMap
      }
    }
  });

  const onSubmit = (app) => {
    deselectThis(app)
  };

  const deselectThis = (app) => {
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: app,
      onSuccess: () => refresh(),
      onError: (err) => setErrorMsg(err),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <div className="w-full p-4 rounded border border-black hover:bg-gray-200">
      <div className="flex flex-row flex-auto justify-between">
        <div className='flex flex-row justify-between'>
          <div
            className="flex-none relative w-20 h-20 mr-10 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: 'aliceblue' }}
          >
            {!imageError &&
              <img
              className="h-full w-full object-cover"
              src=""
              alt=""
              onError={() => setImageError(true)}
              />
            }
          </div>
          <div className='flex flex-col space-y-3'>
            <p className='text-2xl font-bold'>
              {appKey['app-name']}
            </p>
            { category ?
              <Tag name={category}/>
              : <AddCategory categorySet={categorySet} appKey={appKey} catMap={catMap} keyList={keyList} refresh={refresh} />
            }
          </div>
        </div>
        { category ?
              <div className='mt-auto'>
                <button
                  type="submit"
                  className="font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
                  onClick={handleSubmit(onSubmit)}
                >Deselect</button>
              </div>
            : null
          }
      </div>
    </div>
  );
}

function AddCategory({categorySet, appKey, catMap, keyList, refresh}) {
  const [startsWithNumber, setStartsWithNumber] = useState(false);
  const { handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      cats: {
        "cat-set": categorySet
      }
    }
  });

  const onSubmit = (data) => {
    submitNew(data);
    const categories = getValues('cats.cat-set');
    const newCategory = categories[categories.length - 1];
    selectThis(newCategory);
  };

  const onChange = (name) => {
    isStartingWithNumber(name);
    if (startsWithNumber) {
      return;
    }
    const array = [name];
    const newArray = categorySet.concat(array);
    setValue('cats.cat-set', newArray);
  };

  const isStartingWithNumber = (category) => {
    const startsWithNumber = !!category.match(/^[0-9]/);
    setStartsWithNumber(startsWithNumber);
  }

  const submitNew = (categories) => {
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: categories,
      onSuccess: () => refresh(),
      onError: (err) => setErrorMsg(err),
    });
  };

  const getCatMap = (category) => catMap.map((app) => {
    delete app.id;
    return app;
  }).concat([{ key: appKey, category }])

  const selectThis = (category) => {
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: {
        select: {
          "key-list": keyList.concat([appKey]),
          "cat-map": getCatMap(category)
        }
      },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <div className='flex'>
      <div className='relative'>
      <input
        type="text"
        className="border border-gray-800 text-gray-800 text-sm focus:ring-gray-900 focus:border-gray-900 w-full p-1.5"
        onChange={(e) => onChange(e.target.value)}
      />
      { !startsWithNumber ? <button
        className='absolute right-2 top-0 font-bold text-4xl hover:bg-gray-200'
        onClick={handleSubmit(onSubmit)}
      >
        +
      </button> : null
      }
    </div>
      { startsWithNumber ? <div
          className='text-red-600 text-lg mt-1.5'
        >
          <i className={`fa fa-exclamation-triangle ml-2 mr-2`}></i>
          A category cannot start with a number
        </div> : null

      }
    </div>
  );
}
