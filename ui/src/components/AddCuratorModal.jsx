import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getUrbitApi } from "../utils/urbitApi";
import { Input } from "./Input";

const api = getUrbitApi();

export function AddCuratorModal(props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      "cur-name": ""
    }
  });
  const [showModal, setShowModal] = useState(false);

  const subscribeToNewCur = (curator) => {
    try {
      api.poke({
        app: "usr-server",
        mark: "app-store-usr-action",
        json: { sub: curator },
        onSuccess: (success) => console.log(success),
        onError: (err) => setErrorMsg(err),
        onCancel: (err) => setErrorMsg(err)
      });
    }
    catch(err) {
      setErrorMsg(err);
    }
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const onSubmit = (data) => {
    subscribeToNewCur(data);
    setShowModal(false);
  };
  return (
    <>
      <button
        className='w-full p-4 bg-secondary rounded hover:bg-gray-300'
        onClick={() => setShowModal(true)}
      >
          <div className="flex flex-auto flex-row">
            <div
              className="w-20 h-20 mr-10 border border-black"
            >
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className='self-center font-bold text-2xl'>
              Add curator
            </span>
          </div>
        </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="flex flex-col p-14 flex-auto space-y-10">
                  <h3 className="text-2xl font-semibold">
                    Add a new curator
                  </h3>
                  <Input
                    name="developer"
                    label="Curator name"
                    placeholder="~zod"
                    {...register('cur-name')}
                  />
                  <div className="flex items-center justify-end">
                    <button
                      className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
                      onClick={handleSubmit(onSubmit)}
                    >save</button>
                  </div>
                </div>
                {/*footer*/}
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}