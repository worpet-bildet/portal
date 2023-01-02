import React, { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { getUrbitApi } from "../utils/urbitApi";
import { Input } from "./Input";

const api = getUrbitApi();

// We need to send the dev name and app name to the component. Also the hash.
export function AddReviewModal({appKey, hash, notification}) {
  const methods = useForm({
    defaultValues: {
      key: appKey,
      hash,
      text: "",
      "is-safe": true
    }
  });
  const { register, handleSubmit } = methods;

  const [showModal, setShowModal] = useState(false);
  const isSafeRadio = {
    name: "Is it Safe?",
    inputs: [
      { inputName: "Yes", value: true },
      { inputName: "No", value: false }
    ]
  };
  
  const onSubmit = (review) => {
    submitNew(review);
    setShowModal(false);
  };

  const submitNew = (review) => {
    api.poke({
      app: "usr-server",
      mark: "app-store-visit-dev-action",
      json: { "put-rev": review },
      onSuccess: () => notification.success('Your review has been processed succesfully, please refresh the page'),
      onError: (err) => notification.error(err),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <FormProvider {...methods}>
      <button
        className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add a review
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
                    Add Review
                  </h3>
                  <Input
                    name="review"
                    label="Write a review"
                    placeholder="Write here"
                    {...register('text')}
                  />
                  <RadioButton {...isSafeRadio} {...register('is-safe')} />
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
    </FormProvider>
  );
}

const RadioButton = React.forwardRef(({name, inputs, ...rest}, ref) => {
  const { setValue } = useFormContext();
  return (
    <div className="flex flex-col space-y-2"ref={ref} >
    <h3 className="text-lg font-semibold">{name}</h3>
      <ul className="flex gap-4">
        {inputs.length
          ? inputs.map(({ inputName, value }) => (
            <li key={inputName}>
              <label>
              <input
                  {...rest}
                  type="radio"
                  value={value}
                  className="mr-2"
                  onClick={() => setValue('is-safe', value)}
              />
              {inputName}
            </label>
            </li>
          ))
          : null
        }
      </ul>
    </div>
  );
});