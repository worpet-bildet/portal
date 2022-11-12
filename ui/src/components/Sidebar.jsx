import { Button } from 'flowbite-react';
import React from 'react';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <aside className="flex flex-col justify-between w-80 h-screen sticky top-0 bg-gray-100" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-100 rounded dark:bg-gray-800">
            <ul className="space-y-2 py-10">
              {this.props.buttons && this.props.buttons.map((buttonName, index) =>
                <SidebarItem
                  key={`${buttonName}-${index}`}
                  buttonName={buttonName}
                />
              )}
            </ul>
        </div>
        <div>
          <SwitchAccounts />
          <div className='py-5'></div>
        </div>
      </aside>
    );
  }
}

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="ml-3">{this.props.buttonName}</span>
        </a>
      </li>
    );
  }
}

class SwitchAccounts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flex flex-col gap-y-2'>
        <p className='self-center'>Switch account</p>
        <div className="flex justify-center gap-2 w-2/4 self-center">
          <a href='#'>
            <div className="rounded-full border-2 flex p-7 relative">
              <div className="absolute top-4 left-6">
                  C
              </div>
            </div>
          </a>
          <a href='#'>
            <div className="rounded-full border-2 flex p-7 relative">
              <div className="absolute top-4 left-6">
                  U
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}