import React from 'react';
import { IconImageInput } from '../../components/IconImageInput';
import { Sidebar } from '../../components/Sidebar';

export function UploadApplication(props) {
  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="w-4/5 space-y-6 py-14">
          <h1 className="text-3xl font-bold">Upload an application</h1>
          <div className="border border-grey-200 rounded p-8">
            <Form />
          </div>
        </div>
    </main>
    </div>
);
}

function Form(props) {
  return (
    <form>
      <AppPageInformation />
      <Signature />
      <Docket />
      <button type="submit" className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5" href="">save</button>
    </form>
  );
}

function AppPageInformation(props) {
  return (
    <div>
      <div className='mb-6'>
        <AppInformation />
      </div>
      <div className='flex flex-row gap-3 mb-6'>
        <ImageInput className="basis-1/3" />
        <ImageInput className="basis-1/3" />
        <ImageInput className="basis-1/3" />
      </div>
      <Input label="Distributor desk" />
    </div>
  );
}

function AppInformation(props) {
  return (
    <div className='flex flex-row gap-14'>
      <IconImageInput />
      <div>
        <div className="flex flex-row gap-10">
              <div className="mb-3 basis-1/2">
                <Input label="Distributor desk" placeholder="~sampel/desk?" />
              </div>
              <div className="mb-3 basis-1/2">
                <Input label="Keywords" />
              </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-800 dark:text-white">Description</label>
          <input type="text" id="description" className="border border-gray-800 text-gray-800 text-sm  focus:ring-gray-900 focus:border-gray-900 block w-full py-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>
    </div>
  );
}

function Signature(props) {
  return (
    <div className='mb-3'>
      <h2 className='text-xl font-semibold mb-4 mt-10'>Signature</h2>
      <div className="flex flex-row gap-10">
        <div className="mb-3 basis-1/2">
          <Input label="Ship" placeholder="sampel-palnet" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Life" />
        </div>
      </div>
      <Input label="Sig" />
    </div>
  );
}

function Docket(props) {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-semibold mb-4 mt-10'>Docket</h2>
      <div className="grid grid-cols-2 gap-x-8">
        <div className="mb-3 basis-1/2">
          <Input label="Title" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Info" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Color" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Href" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Image" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Version" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Website" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="License" />
        </div>
      </div>
    </div>
  );
}

function Input(props) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800 dark:text-white">{props.label}</label>
      <input type="text" className="border border-gray-800 text-gray-800 text-sm  focus:ring-gray-900 focus:border-gray-900 w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.placeholder} />
    </div>
  );
}

function ImageInput(props) {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border border-black rounded cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center">
            <svg aria-hidden="true" className="w-12 h-12 mb-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Screenshot</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
}