import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function AddDeveloperModal(props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      "dev-name": ""
    }
  });
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setShowModal(false);
  };
  return (
    <>
      <button
        className="flex justify-items-center pl-3 font-bold bg-secondary rounded hover:bg-gray-300"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <div
          className="w-8 h-8 mr-5 border border-black"
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        Add developer
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
                    Add a new developer
                  </h3>
                  <Input
                    name="developer"
                    label="Developer name"
                    placeholder="~zod"
                    {...register('dev-name')}
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