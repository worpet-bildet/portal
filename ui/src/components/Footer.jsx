import React from "react";

export function Footer({disclaimer}) {
  return (
    <footer class="bg-white dark:bg-gray-900 mt-auto">
      <div class="grid justify-items-start pt-6 px-4 bg-gray-100 dark:bg-gray-700">
        { disclaimer ?
          <span class="border border-2 text-lg text-gray-500 p-2 mb-4">
          <i className={`fa fa-exclamation-triangle fa-x mr-4`}></i>
            We will not be liable for any issues related to malicious or insecure software distributed via Galleria.
            By clicking the "Copy to clipboard" button you agree on this.
          </span>
          : null
        }
        <h3 className="border-b-4 w-full">Tell us what you think at ~dilryd-mopreg/galleria</h3>
        <a
        className='flex justify-center w-full hover:underline my-3'
        href='https://github.com/dilryd-mopreg/app-store/tree/development/app-store'
        target='_blank'
        >
          <div>
          <i className='fa fa-github mr-2'></i>See our development
          </div>
        </a>
      </div>
    </footer>
  );
}
