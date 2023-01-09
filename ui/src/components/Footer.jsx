import React from "react";

export function Footer({disclaimer}) {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-auto">
      <div className="grid justify-items-start pt-3 px-4 bg-gray-100 dark:bg-gray-700">
        { disclaimer ?
          <span className="border border-2 text-lg text-gray-500 p-2 mb-4">
          <i className={`fa fa-exclamation-triangle fa-x mr-4`}></i>
             Disclaimer: Applications may not be audited for security and might contain malicious code or vulnerabilities that could lead to unwanted interaction with your ship. Explore at your own risk.
          </span>
          : null
        }
        <div className="flex flex-row justify-between w-full">
          <h3 className="mt-4">Tell us what you think in the Galleria group at ~dilryd-mopreg</h3>
          <a
          className='flex justify-center justify-items-center hover:underline my-3'
          href='https://github.com/dilryd-mopreg/app-store/tree/development'
          target='_blank'
          >
            <div>
            <i className='fa fa-github fa-2x mr-2'></i>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
