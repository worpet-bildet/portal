import { scryCharges } from '@urbit/api';
import Urbit from '@urbit/http-api';
import React, { useEffect, useState } from 'react';
import mockApi from "../mocks/dev-view.json";
import { AddButtonTile } from './components/AddButtonTile';
import { AppTile } from './components/AppTile';
import { Sidebar } from './components/Sidebar';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// TODO(adrian): Add api call from ship to get applications
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      buttons: []
    };
  }

  async componentDidMount() {
    this.setState({
      apps: this.getApplications(),
      buttons: ["Application", "Upload an App"]
    });
  }

  // This will be an async function to make the calls to urbit ship.
  getApplications() {
    return Object.keys(mockApi);
  }

  render() {
    return (
        <div className='flex flex-row'>
          <Sidebar buttons={this.state.buttons} />
          <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
            <div className="w-4/5 space-y-6 py-20">
              <h1 className="text-3xl font-bold">My applications</h1>
              {this.state.apps.length && (
                <ul className="space-y-4">
                  <li>
                    <AddButtonTile buttonName="Add App Page"/>
                  </li>
                  {Object.entries(this.state.apps).map((applicationName) => (
                    <li key={applicationName[1]} className="flex items-center space-x-3 text-sm leading-tight">
                      <AppTile {...mockApi[applicationName[1]]} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </main>
        </div>
    );
  }
}

// Example function call api
// async function init() {
//   return (await api.scry(scryCharges)).initial;
// }