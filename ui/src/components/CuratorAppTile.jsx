import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUrbitApi } from '../utils/urbitApi';

const api = getUrbitApi();

export function CuratorAppTile ({ category, categorySet, appKey, catMap, keyList }) {
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
      onSuccess: () => console.log('Successfully done'),
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
              <Category name={category} categorySet={categorySet} />
              : <AddCategory categorySet={categorySet} appKey={appKey} catMap={catMap} keyList={keyList} />
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

function Category({name, categorySet}) {
  const deleteCategory = (targetCategory) => categorySet.filter((category) => category !== targetCategory)
  const { handleSubmit } = useForm({
    defaultValues: {
      cats: {
        "cat-set": deleteCategory(name)
      }
    }
  });

  const onSubmit = (data) => {
    submitNew(data)
  };

  const submitNew = (categories) => {
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: categories,
      onSuccess: () => console.log('Successfully done'),
      onError: () => setErrorMsg("Va a ser que no"),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <li>
      <div className='flex flex-row justify-between border border-black font-semibold hover:bg-gray-400 gap-2 p-2'>
        <span className='flex items-center capitalize'><p>{name}</p></span>
        <button
        className='text-xl hover:bg-gray-200 pl-1 pr-1'
          onClick={handleSubmit(onSubmit)}
        >
          x
        </button>
      </div>
    </li>
  );
}

function AddCategory({categorySet, appKey, catMap, keyList}) {
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
    const array = [name];
    const newArray = categorySet.concat(array);
    setValue('cats.cat-set', newArray);
  };

  const submitNew = (categories) => {
    api.poke({
      app: "cur-server",
      mark: "app-store-cur-action",
      json: categories,
      onSuccess: () => console.log('Successfully done'),
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
    <div className='relative'>
      <input
        type="text"
        className="border border-gray-800 text-gray-800 text-sm focus:ring-gray-900 focus:border-gray-900 w-full p-1.5"
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className='absolute right-2 top-0 font-bold text-4xl hover:bg-gray-200'
        onClick={handleSubmit(onSubmit)}
      >
        +
      </button>
    </div>
  );
}
